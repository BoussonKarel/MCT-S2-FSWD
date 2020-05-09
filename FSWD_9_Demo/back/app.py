from flask import Flask, render_template, json, request
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on("connect")
def connect_message():
    print("Client connected")
    clientid = request.sid
    emit("B2F_client_connected", clientid, broadcast=False)

@socketio.on("message")
def handle_message(msg):
    print(f"Message: {msg}")
    send(msg, broadcast=True)

@socketio.on("F2B_like")
def like():
    print(f"Er wordt een like aangevraagd")
    send("👍", broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)