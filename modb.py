__author__ = 'BenOuyang'
import pymongo

con = pymongo.Connection()
db = con.tt
ur = db.ur
cursor = ur.find()
max = 0
min = 500
for doc in cursor:
    if max < doc.get('main').get('temp'):
        max = doc.get('main').get('temp')
        id1 = doc.get('id')
    if min > doc.get('main').get('temp'):
       min = doc.get('main').get('temp')
       id2 = doc.get('id')
for doc2 in ur.find({'id' :id1}):
    print(doc2)
for doc2 in ur.find({'id' :id2}):
    print(doc2)





