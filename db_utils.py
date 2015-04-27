from pymongo import MongoClient
import pprint

pp = pprint.PrettyPrinter(indent=4)

client = MongoClient()
db = client.repos
collection = db.repos

limit = int(db.repos.count() * 0.00035)
options = { 'full_name': 1,
            'stargazers_count': 1,
            'owner.login': 1,
            '_id':1,
            'language': 1,
            'has_issues': 1,
            'has_downloads': 1,
            'has_wiki': 1,
            'has_pages': 1,
            'open_issues': 1,
            'forks_count': 1,
            'has_issues': 1,
            'size': 1,
            'num_popular_by_owner': 1,
            'created_at': 1,
            'pushed_at': 1
}

sort_by = [('stargazers_count', -1)]

all_repos_without_owner = db.repos.find({}, options).limit(limit).sort(sort_by)

for repo in all_repos_without_owner:
    query = {'is_popular': True, 'owner.login': repo['owner']['login']}
    other_repos_by_owner = db.repos.find(query)
    db.repos.update({'_id': repo['_id']}, {'$set': { 'num_popular_by_owner': other_repos_by_owner.count()}})
