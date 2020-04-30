from repositories.DataRepository import DataRepository
from flask import Flask, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS


app = Flask(__name__)
app.config['SECRET_KEY'] = 'FSWD!321lOpç'

socketio = SocketIO(app, cors_allowed_origins="*")
CORS(app)


# THREAD


# API ENDPOINTS
@app.route('/')
def hallo():
    return "Server is running, er zijn momenteel geen API endpoints beschikbaar."


# SOCKET IO
@socketio.on("connect")
def on_connect():
    print("A new client connected")
    status = DataRepository.read_status_lampen()
    socketio.emit("B2F_status_lampen", { 'lampen': status })

@socketio.on("F2B_switch_light")
def switch_light(payload):
    id = payload["lampid"]
    new_status = payload["new_status"]

    print("Licht gaat aan/uit")

    DataRepository.update_status_lamp(id, new_status)
    # Hardware LED

    status = DataRepository.read_status_lamp_by_id(id)

    socketio.emit("B2F_verandering_lamp", {"lamp": status})
    

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')
