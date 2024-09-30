# import general libs
import json
import requests

FEEDBACK_SERVER = 'http://localhost:6000/feedback'
DB_ADDR = './db/'

# data transfer dict
# set: target_hash <- data
# get: source_hash -> data
transfer = dict()

# props dict
# node_hash <- data
props = dict()

# function interfaces to communicate with user
def feedback(json_data={}):
    try:
        r = requests.post(FEEDBACK_SERVER, json=json_data)
        print('feedback res: ', r.status_code)
    except:
        print('feedback failed!')

# displays a popup in ui
def send_popup(data, user_hash=USER_HASH):
    feedback({
            'status':200,
            'user_hash': user_hash,
            'data': {
                'type':'popup',
                'data':  json.dumps(data)
            }
        })

# updates user status in ui
def send_status(data, user_hash=USER_HASH):
    feedback({
            'status':200,
            'user_hash': user_hash,
            'data': {
                'type':'status',
                'data':  data
            }
        })
    
# updates a node status in ui
def send_node_status(data, user_hash=USER_HASH):
    feedback({
            'status':200,
            'user_hash': user_hash,
            'data': {
                'type':'node_status',
                'data':  json.dumps(data)
            }
        })

# set data in transfer
def setTransfer(hash, data):
    if hash == None or hash == '':
        raise Exception('Method: Set(), Cannot Transfer Data')
    transfer[hash] = data
    
# get data from transfer
def getTransfer(hash):
    if hash == None or hash == '':
        raise Exception('Method: Get(), Cannot Transfer Data')
    return transfer[hash]

