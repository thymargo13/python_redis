import json
import threading
import redis
import requests

f = open('station.json',)
data = json.load(f)
f.close()
counter = 0
# host = localhost  # redis address
# port = port  # redis port
# pwd = pwd  # if there is auth needed
# redisPool = redis.ConnectionPool(host=host, port=port, password=pwd)
# client = redis.Redis(connection_pool=redisPool)
url = 'http://localhost:8000/api/bus/1/'
headers = {
    'Content-Type': 'application/json'
}
def schedTask(counter, bus):
    print(data.get('bus')[counter])
    data_to_redis = json.dumps(data.get('bus')[counter])
    # client.set('car', data_to_redis)  # setting key:value pair to redis
    resp = requests.put(url=url, headers=headers, data= data_to_redis)
    counter += 1
    if counter < len(data.get('bus')):
        threading.Timer(5.0, schedTask, args=(counter, ), kwargs=data).start()
    else:
        counter = 0
        threading.Timer(5.0, schedTask, args=(counter, ), kwargs=data).start()



schedTask(counter, data)
