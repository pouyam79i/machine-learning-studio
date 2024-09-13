import threading, json
from core import core
from flask import Flask, jsonify, request

app = Flask(__name__)

def process(raw_data):
    interpreter = core()
    try: 
        data = json.loads(raw_data)
        ready_code = interpreter(data)
        print(ready_code)
        # TODO: inform server code is created
        # TODO: send the ready code to ml engine
    except:
        print("failed to interpret!")

@app.route('/interpret', methods=['POST'])
def interpret():
 
    raw_data = request.get_data().decode('utf-8')
    
    print(raw_data)
    
    processing_thread = threading.Thread(target=process, args=(raw_data,))
    processing_thread.start()
    
    # Return a response to the client
    return jsonify({'message': 'successfully uploaded'})

if __name__ == '__main__':
    app.run(host='localhost', port='4000', debug=True)