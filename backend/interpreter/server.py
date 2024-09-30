import threading, json
import requests
from core import core
from flask import Flask, jsonify, request

FEEDBACK_SERVER = 'http://localhost:6000/feedback'
ML_ENGINE_SERVICE = 'http://localhost:5000/exec'

def feedback(json_data={}):
    try:
        r = requests.post(FEEDBACK_SERVER, json=json_data)
        print('feedback res: ', r.status_code)
    except:
        print('feedback failed!')

app = Flask(__name__)

def process(raw_data):
    interpreter = core()
    try: 
        data = json.loads(raw_data)
        ready_code = interpreter(data)
        feedback({
            'status':200,
            'user_hash': data['user_hash'],
            'data': {
                'type':'status',
                'data':'sending code for execution...'
            }
        })
        # TODO: send the ready code to ml engine
        try:   
            r = requests.post(ML_ENGINE_SERVICE,  data=json.dumps({
                'user_hash': data['user_hash'],
                'code': ready_code
            }).encode('utf-8'), headers={'Content-Type': 'application/json'})
            print('exec res: ', r.status_code)
        except:
            print('cannot send for execution')
            feedback({
            'status':503,
            'user_hash': data['user_hash'],
            'data': {
                'type':'status',
                'data':'failed to send for execution!'
            }
        })
        with open("./out/Output.py", "w") as text_file:
            text_file.write(ready_code)
        
    except:
        print("failed to interpret!")
        feedback({
            'status':400,
            'user_hash': data['user_hash'],
            'data': {
                'type':'status',
                'data':'failed to analyse diagram data.'
            }
        })

@app.route('/interpret', methods=['POST'])
def interpret():
    raw_data = request.get_data().decode('utf-8')
    
    processing_thread = threading.Thread(target=process, args=(raw_data,))
    processing_thread.start()
    
    # Return a response to the client
    return jsonify({'message': 'successfully uploaded'})

if __name__ == '__main__':
    app.run(host='localhost', port='4000', debug=True)