# import general libs
import json
import requests

FEEDBACK_SERVER = 'http://localhost:8080/feedback'

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

