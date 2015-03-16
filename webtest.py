import time
import urllib.request
import pymongo
baseurl="http://api.openweathermap.org/data/2.5/weather?id="
con = pymongo.Connection()
db = con.tt
ur = db.ur
posts = ur.find()
file = open("citylist.txt")
cityarr =[]
while 1:
    line = file.readline()
    if not line:
        break
    elif line=="0000000":
        break
    else:
        cityarr.append(line)
i = -1
for items in cityarr:
        url = baseurl+items
        i=i+1
        if i == 13300:
            break
        else:
            try:
                weather = urllib.request.urlopen(url).read()
                j = str(weather)
                j = j[:-3]
                j = j[2:]
                dic=eval(j)
                print(dic)
                names=dic.get('name')
                ur.update({'name':names},dic,True,True)
                print(i)
                time.sleep(0.5)
            except:print("failure")



