import threading, json
import requests
from core import core
from flask import Flask, jsonify, request

FEEDBACK_SERVER = 'http://localhost:6000/feedback'

app = Flask(__name__)

def feedback(json_data={}):
    try:
        r = requests.post(FEEDBACK_SERVER, json=json_data)
        print('feedback res: ', r.status_code)
    except:
        print('feedback failed!')

def process(raw_data):
    ml_engine = core()
    try:
        data = json.loads(raw_data)
        print('executing for user: ', data['user_hash'])
        ml_engine(data['code'])    
        feedback({
            'status':200,
            'user_hash': data['user_hash'],
            'data': {
                'type':'status',
                'data': 'execution is done.'
            }
        })
    except:
        print("failed to execute")
        feedback({
            'status':400,
            'user_hash': data['user_hash'],
            'data': {
                'type':'status',
                'data': 'failed to execute diagram!'
            }
        })

@app.route('/exec', methods=['POST'])
def execute():
 
    raw_data = request.get_data().decode('utf-8')
    
    processing_thread = threading.Thread(target=process, args=(raw_data,))
    processing_thread.start()
    
    # Return a response to the client
    return jsonify({'message': 'code received successfully'})

if __name__ == '__main__':
    app.run(host='localhost', port='5000', debug=True)
