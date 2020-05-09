'use strict';

let arrGames = [];

const toonSpellen = function(jsonObject) {
    let opties = '';
    for (let spel of jsonObject) {
        add2Select(spel.gameId, spel.name);
        arrGames[spel.gameId] = spel.image;
    }
}

const add2Select = function(id, name) {
    document.querySelector('.js-select').innerHTML += `<option value="${id}" label="${name}"></option>`;
}

// STAP 2
const laadSpellen = function() {
    fetch('https://www.diero.be/MCT/JSON/spellen.json')
    .then(function(response) {
        if (!response.ok) {
            throw Error(`Er is een fout opgetreden: ${response.status}`);
        }
        else {
            return response.json();
        }
    })
    .then(function(jsonObject) {
        toonSpellen(jsonObject);
    })
    .catch(function(error) {
        console.log(`Fout bij het verwerken van json: ${error}`);
    })
};

const init = function() {
    laadSpellen();

    const select = document.querySelector('.js-select');
    select.addEventListener('input', function() {
        const selectedGameId = select.options[select.selectedIndex].value;
        toonImage(selectedGameId);
    });

    const html_naam = document.querySelector('#naam');
    html_naam.addEventListener('input', function(e) {
        setValidity(e, '');
    });

    html_naam.addEventListener('invalid', function(e) {
        setValidity(e, 'Naam is niet correct: minimum 2 karakters...');
    });

    const html_voornaam = document.querySelector('#voornaam');
    html_voornaam.addEventListener('input', function(e) {
        setValidity(e, '');
    });

    html_voornaam.addEventListener('invalid', function(e) {
        setValidity(e, 'Voornaam is niet correct: minimum 2 karakters...');
    });

    const html_email = document.querySelector('#email');
    html_email.addEventListener('input', function(e) {
        setValidity(e, '');
    });

    html_email.addEventListener('invalid', function(e) {
        setValidity(e, 'Email is niet correct.');
    });

    const html_spel = document.querySelector('#spel');
    html_spel.addEventListener('invalid', function(e) {
        setValidity(e, 'Kies een spel.');
    });
}

const setValidity = function(e, tekst) {
    // console.log(e);
    e.target.setCustomValidity('');

    if (e.target.validity.valid) {
        e.target.classList.remove('is-invalid');
    }
    else {
        e.target.setCustomValidity(tekst);
        e.target.classList.add('is-invalid');
    }
}

const toonImage = function(gameId) {
    document.querySelector('.js-spel').innerHTML =
    `<img src="${arrGames[gameId]}" class="prentje" alt="Prentje van het spel" id="flag" />`;
}

document.addEventListener('DOMContentLoaded', init);