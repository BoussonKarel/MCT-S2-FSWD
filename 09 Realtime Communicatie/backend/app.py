from flask import Flask, jsonify, request
from flask_socketio import SocketIO, send, emit
from flask_cors import CORS
from repositories.DataRepository import DataRepository
from datetime import datetime, date

# Start app
app = Flask(__name__)
app.config['SECRET_KEY'] = 'FSWD!321lOpç'

socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)

# Custom endpoint
endpoint = '/api/v1'

# ROUTES
@app.route('/')
def info():
    return jsonify(info='Please go to the endpoint ' + endpoint)

@app.route(endpoint + '/progress', methods= ["GET"])
def progress():
    if request.method == 'GET':
        return jsonify(DataRepository.read_logging())

@app.route(endpoint + '/progress/today', methods= ["DELETE"])
def progress_today():
    if request.method == 'DELETE':
        data = DataRepository.delete_total_progress(date.today())
        if data > 0:
            emit("B2F_clear", {'amount': 0}, broadcast = True)
            return jsonify(status="success", row_count=data), 201
        else:
            return jsonify(status="no delete", row_count=data), 201


# # SOCKET.IO EVENTS
@socketio.on("connect")
def initial_connection():
    print("A new client connected")

    # emit("B2F_connected", {'currentProgress': 0})

    data = DataRepository.read_total_progress(date.today())
    if data['amount']:
        previous_progress = data['amount']
    else:
        previous_progress = 0
    emit("B2F_connected", { 'currentProgress': previous_progress})

@socketio.on("F2B_new_logging")
def new_logging(value):
    addAmount = value["amount"]

    new_log = DataRepository.create_log(datetime.now(), addAmount)
    if (new_log is not None):
        emit("B2F_add_progress", {'amount': addAmount}, broadcast=True)


# START THE APP
if __name__ == '__main__':
    socketio.run(app, debug=True, host="0.0.0.0")
