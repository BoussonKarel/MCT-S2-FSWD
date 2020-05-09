"use strict";

const lanIP = `${window.location.hostname}:5000`;
const socketio = io(lanIP);

let html_message;

const init = function () {
  loadUIEventListeners();
  loadSocketListeners();

  document.querySelector(".js-message").value;
};

const sendMessage = function (msg, special = false) {
  if (special) {
    msg = `<em>${msg}</em>`; //schuine variant
  } else {
    msg = `${msg}`; //gewoon
  }
  socketio.send(msg);
  document.querySelector(".js-message").value = "";
};

const loadUIEventListeners = function () {
  document.querySelector(".js-button").addEventListener("click", function () {
    const html_message = document.querySelector(".js-message").value;
    sendMessage(html_message);
  });

  document.querySelector(".js-standardmsg").addEventListener("change", function () {
    const html_message = document.querySelector(".js-standardmsg").options[document.querySelector(".js-standardmsg").selectedIndex].innerHTML;
    sendMessage(html_message);
    document.querySelector(".js-standardmsg").selectedIndex = 0;
  });

  document.querySelector(".js-button__special").addEventListener("click", function () {
    const html_message = document.querySelector(".js-message").value;
    sendMessage(html_message, true)
  });

  document.querySelector(".js-button__smiley").addEventListener("click", function () {
    socketio.emit("F2B_like");
  });
};

const loadSocketListeners = function () {
  socketio.on("message", function(msg) {
    console.log("Printing message from backend");
    document.querySelector(".js-messages").innerHTML += `${msg}<br>`;
  });

  socketio.on("B2F_client_connected", function(msg) {
    console.log(`Server responded: ${msg}`)
  });
};

document.addEventListener("DOMContentLoaded", function () {
  console.log("document geladen");
  init();
});
