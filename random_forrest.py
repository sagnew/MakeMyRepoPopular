from pymongo import MongoClient
import numpy as np
from sklearn.ensemble import RandomForestClassifier

query = {'is_popular': True}
popular_repos = db.repos.find(query)
