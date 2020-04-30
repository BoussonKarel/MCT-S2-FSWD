'use strict'

const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

const clearClassList = function (el) {
  el.classList.remove('c-room--wait');
  el.classList.remove('c-room--on');
};

const listenToUI = function () {
  const buttons = document.querySelectorAll('.js-power-btn');
  for (const btn of buttons) {
    btn.addEventListener('click', function() {
      const id = btn.dataset.idlamp;
      const status = btn.dataset.statuslamp;

      // Nieuwe status is UIT
      let nieuwestatus = 0;
      // Als hij al uit was, is de nieuwe status AAN
      if (status == 0) {
        nieuwestatus = 1;
      }
      // else { nieuwestatus = 0 }

      const room = document.querySelector(`.js-room[data-idlamp='${id}']`);
      room.classList.remove('c-room--on');
      room.classList.remove('c-room--wait');
      room.classList.add('c-room--wait');
      
      socket.emit('F2B_switch_light', {'lampid': id, 'new_status': nieuwestatus});
    });
  }
};

const listenToSocket = function () {
  socket.on('connect', function() {
    console.log('Verbonden met webserver');
  });

  socket.on('B2F_status_lampen', function(jsonObject) {
    console.log('Dit is de status van de lampen');
    console.log(jsonObject);
    for (const lamp of jsonObject.lampen) {
      const room = document.querySelector(`.js-room[data-idlamp="${lamp.id}"]`);
      if (room) {
        const knop = room.querySelector('.js-power-btn');
        knop.setAttribute('data-statuslamp', lamp.status);

        room.classList.remove('c-room--on');
        room.classList.remove('c-room--wait');
        if (lamp.status == 1) {
          room.classList.add('c-room--on');
        }
      }
    }
  });

  socket.on('B2F_verandering_lamp', function(jsonObject) {
    console.log('Dit is de status van de lampen');
    console.log(jsonObject);
    const lamp = jsonObject.lamp

    const room = document.querySelector(`.js-room[data-idlamp="${lamp.id}"]`);
    if (room) {
      const knop = room.querySelector('.js-power-btn');
      knop.setAttribute('data-statuslamp', lamp.status);

      room.classList.remove('c-room--on');
      room.classList.remove('c-room--wait');
      if (lamp.status == 1) {
        room.classList.add('c-room--on');
      }
    }
  });

  socket.on('B2F_alles_uit', function(payload) {
    console.log('Alle lampen zijn automatisch uitgezet');
  })
};

document.addEventListener('DOMContentLoaded', function () {
  console.info('DOM geladen');
  listenToUI();
  listenToSocket();
});
