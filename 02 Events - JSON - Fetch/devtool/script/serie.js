'use strict';

// Info over serie tonen in console
const toonSerie = function(jsonObject) {
    //console.log(jsonObject);
    const naam = jsonObject.name;
    console.log(`De naam van de serie is ${naam}`)
    console.log(`Het uur waarop het wordt uitgezonden is ${jsonObject.schedule.time}`)
    console.log(`${name} behoort tot de volgende genres:`)
    for (let genre of jsonObject.genres) {
        console.log(`- ${genre}`)
    }
    console.log('Overzicht episodes')
    for (let episode of jsonObject._embedded.episodes) {
        console.log(`s ${episode.season} e ${episode.number} - ${episode.name}`)
    }
}

// API Ophalen
const verwerkSerie = function() {
    fetch('http://api.tvmaze.com/singlesearch/shows?q=The+Office&embed=episodes')
    .then(function(response) {
        if (!response.ok) {
            throw Error(`Er is een fout opgetreden: ${response.status}`);
        }
        else {
            return response.json();
        }
    })
    .then(function(jsonObject) {
        toonSerie(jsonObject);
    })
    .catch(function(error) {
        console.log(`Fout bij het verwerken van json: ${error}`);
    })
};

const init = function() {
    console.log('Hallo wereld');
    verwerkSerie();
};

// Als alle html & css is ingeladen > dan pas de init doen
document.addEventListener('DOMContentLoaded', init);
