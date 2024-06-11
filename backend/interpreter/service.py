import threading, json
from core import core
from flask import Flask, jsonify, request

app = Flask(__name__)

def process(raw_data):
    interpreter = core()
    # try:
    data = json.loads(raw_data)
    ready_code = interpreter(data)
    print(ready_code)
        # todo: send this code to ml engine
    # except:
    #     print("Failed to interpret")

@app.route('/interpret', methods=['POST'])
def interpret():
 
    raw_data = request.get_data().decode('utf-8')
    
    processing_thread = threading.Thread(target=process, args=(raw_data,))
    processing_thread.start()
    
    # Return a response to the client
    return jsonify({'message': 'successfully uploaded'})

if __name__ == '__main__':
    app.run(debug=True)