"use strict";

const provider = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
const copyright =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>';
let map, layergroup;

const init = function() {
  console.log("init initiated!");

  map = L.map('mapid').setView([51.041028, 3.398512], 10);
  L.tileLayer(provider, { attribution: copyright }).addTo(map);
};

document.addEventListener("DOMContentLoaded", init);
