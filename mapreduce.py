__author__ = 'BenOuyang'
import pymongo
from bson.code import Code
from bson.son import SON
con = pymongo.Connection()
db = con.tt
ur = db.ur
map = Code("function() { "
            "var key = this.sys;"
            "var key2 = key.country;"
           "emit(key2,{count:1,temp:this.main.temp});"
           "}"
           )
reduce = Code("function(key,values) {"
                " var result = {count:0,temp:0} ; "
                " var v; "
                "for(v = 0; v< values.length; v++){"
                "   result.count  = result.count + values[v].count;"
                "   result.temp = result.temp+values[v].temp;}"
                "   return result;             "
                "}"
                )
result = db.ur.map_reduce(map,reduce,"Canada")
for t in result.find():
    print(t)
    print (t.get('value').get('temp')/t.get('value').get('count')-273.15)

