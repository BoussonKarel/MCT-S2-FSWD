"use strict";

let currentDestinationID;

//#region ***  DOM references ***
let html_destinationHolder, html_routeHolder, html_selectedCity, html_destinationSelect, html_adaptTrain;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showBestemmingen = function(bestemmingen) {
  let destinationsHTML = '', optionsHTML = '';
  for (const bestemming of bestemmingen) {
    destinationsHTML += '<li class="c-sidebar-item">';
    destinationsHTML += `<button class="c-sidebar-button js-station" data-destination-id="${bestemming.idbestemming}">${bestemming.stad}</button>`
    destinationsHTML += '</li>';

    optionsHTML += `<option value="${bestemming.idbestemming}">${bestemming.stad}</option>`;
  }

  html_destinationHolder.innerHTML = destinationsHTML;
  html_destinationSelect.innerHTML = '<option value="" disabled="" selected="">Kies een bestemming</option>' + optionsHTML;

  listenToClickDestination();
}

const showTrainsWithDestination = function(treinen) {
  let trajectenHolder = '';
  for (let trein of treinen) {
    // General info: destination, train number, departure time, track
    let trajectHTML = `<div class="c-traject">`;
    trajectHTML += `<div class="c-traject__info"><h2 class="c-traject__name">${html_selectedCity.innerHTML}</h2><p class="c-traject__train-id">Trein ${trein.idtrein}</p></div>`;
    trajectHTML += `<div class="c-traject__departure">${trein.vertrek}</div>`;
    trajectHTML += `<div class="c-traject__track">${trein.spoor}</div>`;

    // Delay
    let delay;
    if (trein.vertraging == null) {
      delay = "-";
    }
    else {
      delay = trein.vertraging
    }
    trajectHTML += `<div class="c-traject__delay">${delay}</div>`;

    // Canceled
    let afgeschaft = '';
    if (trein.afgeschaft) {
      afgeschaft = '<span class="c-traject__cancelled-label">afgeschaft</span>';
    }
    trajectHTML += `<div class="c-traject__cancelled">${afgeschaft}</div>`;

    // BUTTON: Update delay
    trajectHTML += `
    <div class="c-traject__updatevertraging">
      <a href="vertraging.html?TreinID=${trein.idtrein}">
        <svg
          class="c-traject__updatevertraging-symbol"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#222222"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="arcs"
        >
          <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
        </svg>
      </a>
    </div>`;

    // BUTTON: Update train
    trajectHTML += `
    <div class="c-traject__update">
      <a href="aanpassen.html?TreinID=${trein.idtrein}">
        <svg
          class="c-traject__update-symbol"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#222222"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="arcs"
        >
          <polygon points="16 3 21 8 8 21 3 21 3 16 16 3"></polygon>
        </svg>
      </a>
    </div>
    `;

    // BUTTON: Delete train
    trajectHTML += `
    <div class="c-traject__delete">
      <svg
        class="c-traject__delete-symbol"
        data-train-id="${trein.idtrein}"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#222222"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="arcs"
      >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
      </svg>
    </div>`;
    trajectHTML += '</div>';

    // Traject bij de rest vd lijst voegen
    trajectenHolder += trajectHTML;
  }
  html_routeHolder.innerHTML = trajectenHolder;

  listenToClickRemoveTrain();
}
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
const callbackRemovedTrain = function(data) {
  if (data == 1) {
    console.log('Trein verwijderd');
    getTrainsWithDestination(currentDestinationID);
  }
}

const callbackAddTrain = function(data) {
  if (data.treinid > 0) {
    console.log('Trein toegevoegd');
    getTrainsWithDestination(currentDestinationID);
  }
};
//#endregion

//#region ***  Data Access - get___ ***
const getDestinations = function() {
  handleData('http://127.0.0.1:5000/api/v1/bestemmingen', showBestemmingen)
}

const getTrainsWithDestination = function(destinationID) {
  handleData(`http://127.0.0.1:5000/api/v1/treinen/bestemming/${destinationID}`, showTrainsWithDestination)
}
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToClickDestination = function() {
  const buttons = document.querySelectorAll('.js-station');
  for (const btn of buttons) {
    btn.addEventListener('click', function() {
      currentDestinationID = this.getAttribute('data-destination-id');
      html_selectedCity.innerHTML = this.innerHTML;

      getTrainsWithDestination(currentDestinationID);
    });
  }
}

const listenToClickRemoveTrain = function() {
  const buttons = document.querySelectorAll('.c-traject__delete-symbol');
  for (const btn of buttons) {
    btn.addEventListener('click', function() {
      const selectedTrain = this.getAttribute('data-train-id');

      handleData(`http://127.0.0.1:5000/api/v1/treinen/${selectedTrain}`, callbackRemovedTrain, null, 'DELETE');
    });
  }
}

const listenToClickAddTrain = function() {
  const button = document.querySelector('.js-add-train');
  button.addEventListener('click', function() {
    console.log("Clicked");
    const jsonObject = {
      afgeschaft: document.querySelector("#add_afgeschaft").checked,
      bestemmingID: document.querySelector("#add_bestemming").value,
      spoor: document.querySelector("#add_spoor").value,
      vertraging: document.querySelector("#add_vertraging").value,
      vertrek: document.querySelector("#add_vertrek").value
    };

    currentDestinationID = jsonObject.bestemmingID;
    handleData('http://127.0.0.1:5000/api/v1/treinen', callbackAddTrain, null, 'POST', JSON.stringify(jsonObject));
  });
}
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
const init = function() {
  console.log("🚂", "https://www.youtube.com/watch?v=8oVTXSntnA0");

  html_destinationHolder = document.querySelector(".js-destinations");
  html_routeHolder = document.querySelector(".js-trajects");
  html_selectedCity = document.querySelector(".js-departure");
  html_destinationSelect = document.querySelector(".js-destination");
  html_adaptTrain = document.querySelector(".js-adapttrain");

  if (html_destinationHolder) {
    getDestinations();
  }

  listenToClickAddTrain();
};

document.addEventListener("DOMContentLoaded", init);
//#endregion
