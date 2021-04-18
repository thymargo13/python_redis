import json
import threading
import redis

f = open('car.json',)
data = json.load(f)
f.close()
counter = 0
host = localhost  # redis address
port = port  # redis port
pwd = pwd  # if there is auth needed
redisPool = redis.ConnectionPool(host=host, port=port, password=pwd)
client = redis.Redis(connection_pool=redisPool)


def schedTask(counter, car):
    print(data.get('car')[counter])
    data_to_redis = json.dumps(data.get('car')[counter])
    client.set('car', data_to_redis)  # setting key:value pair to redis
    counter += 1
    if counter < len(data.get('car')):
        threading.Timer(5.0, schedTask, args=(counter, ), kwargs=data).start()


schedTask(counter, data)
