import threading, json
from core import core
from flask import Flask, jsonify, request

app = Flask(__name__)

def process(raw_data):
    ml_engine = core()
    try:
        data = json.loads(raw_data)
        print('executing for user: ', data['user_hash'])
        ml_engine(data['code'])    
    except:
        print("failed to execute")

@app.route('/exec', methods=['POST'])
def execute():
 
    raw_data = request.get_data().decode('utf-8')
    
    processing_thread = threading.Thread(target=process, args=(raw_data,))
    processing_thread.start()
    
    # Return a response to the client
    return jsonify({'message': 'code received successfully'})

if __name__ == '__main__':
    app.run(host='localhost', port='5000', debug=True)