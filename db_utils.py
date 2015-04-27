from pymongo import MongoClient
import pprint
from random import choice
import numpy as np

pp = pprint.PrettyPrinter(indent=4)

client = MongoClient()
db = client.repos
collection = db.repos

def get_popular_repos():
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

  #sort_by = [('stargazers_count', -1)]

  repo_array = []
  all_popular_repos = db.repos.find({'is_popular': True}, options)

  for repo in all_popular_repos:
    features = []
    features.append(repo['stargazers_count'])
    features.append(1 if repo['has_issues'] else 0)
    features.append(1 if repo['has_downloads'] else 0)
    features.append(1 if repo['has_wiki'] else 0)
    features.append(1 if repo['has_pages'] else 0)
    features.append(repo['open_issues'])
    features.append(repo['forks_count'])
    features.append(repo['size'])
    features.append(repo['num_popular_by_owner'])
    repo_array.append(features)

  return np.array(repo_array), [choice(repo_array), choice(repo_array), choice(repo_array), choice(repo_array), choice(repo_array), choice(repo_array)]

def get_all_repos():
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


  repo_array = []
  all_popular_repos = db.repos.find({'is_popular': True}, options)

  for repo in all_popular_repos:
    features = []
    features.append(repo['stargazers_count'])
    features.append(1 if repo['has_issues'] else 0)
    features.append(1 if repo['has_downloads'] else 0)
    features.append(1 if repo['has_wiki'] else 0)
    features.append(1 if repo['has_pages'] else 0)
    features.append(repo['open_issues'])
    features.append(repo['forks_count'])
    features.append(repo['size'])
    features.append(repo['num_popular_by_owner'])
    features.append(1)
    repo_array.append(features)

  unpopular_repos = db.repos.find({ 'stargazers_count': {'$lt': 1 } }, options).limit(limit)

  for repo in all_popular_repos:
    features = []
    features.append(repo['stargazers_count'])
    features.append(1 if repo['has_issues'] else 0)
    features.append(1 if repo['has_downloads'] else 0)
    features.append(1 if repo['has_wiki'] else 0)
    features.append(1 if repo['has_pages'] else 0)
    features.append(repo['open_issues'])
    features.append(repo['forks_count'])
    features.append(repo['size'])
    features.append(0)
    features.append(0)
    repo_array.append(features)

  return repo_array
  #for repo in all_repos_without_owner:
  #    query = {'is_popular': True, 'owner.login': repo['owner']['login']}
  #    other_repos_by_owner = db.repos.find(query)
  #    db.repos.update({'_id': repo['_id']}, {'$set': { 'num_popular_by_owner': other_repos_by_owner.count()}})
