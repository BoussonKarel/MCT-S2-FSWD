'use strict';

/* STAP 2: Schrijf een loadData functie die - via FETCH - communiseert met de API */

/* STAP 3: Als fetch gelukt is, wordt deze functie uitgevoerd om de data via INNERHTML te tonen */

/* STAP 1: Voeg DOMContentLoaded Event Listener toe  */

const zeroToStreep = function(waarde) {
    // === test zowel op waarde als type object
    if (waarde === 0) {
        return "---";
    }
    else{
        return waarde;
    }
}

const toonInfo = function(jsonObject) {
    // console.log(jsonObject);

    let html = '';
    let afvalbakken = jsonObject.features;
    for(let element of afvalbakken) {
        const straat = element.properties.STRAATNAAM;
        const gft = zeroToStreep(element.properties.AANTAL_CNTR_GFT);
        const glas = zeroToStreep(element.properties.AANTAL_CNTR_GLAS);
        const pmd = zeroToStreep(element.properties.AANTAL_CNTR_PMD);
        const rest = zeroToStreep(element.properties.AANTAL_CNTR_REST);
        const papier = zeroToStreep(element.properties.AANTAL_CNTR_PK);

        html += `
            <article class="c-locatie">
                <div class="c-locatie__adres">${straat}</div>
                <div class="c-locatie__info">
                    <div class="c-locatie__type">
                        GFT
                        <div class="c-locatie__aantal">${gft}</div>
                    </div>
                    <div class="c-locatie__type">
                        GLAS
                        <div class="c-locatie__aantal">${glas}</div>
                    </div>
                    <div class="c-locatie__type">
                        PMD
                        <div class="c-locatie__aantal">${pmd}</div>
                    </div>
                    <div class="c-locatie__type">
                        REST
                        <div class="c-locatie__aantal">${rest}</div>
                    </div>
                    <div class="c-locatie__type">
                        PAPIER
                        <div class="c-locatie__aantal">${papier}</div>
                    </div>
                
                    </div>
            </article>`;
    }

    document.querySelector('.js-placeholder').innerHTML = html;
}

const verwerkAfvalbakken = function() {
    fetch('https://opendata.arcgis.com/datasets/413c00cfda8743fbb94ce7e7e67d67c7_49.geojson')
    .then(function(response) {
        if (!response.ok) {
            throw Error(`Er is een fout opgetreden: ${response.status}`);
        }
        else {
            return response.json();
        }
    })
    .then(function(jsonObject) {
        toonInfo(jsonObject);
    })
    .catch(function(error) {
        console.log(`Fout bij het verwerken van json: ${error}`);
    })
};

const init = function() {
    console.log("Hallo wereld");
    console.log("CORS ERRORS? Activeer de extensie Moesif CORS.")
    verwerkAfvalbakken();
}
document.addEventListener("DOMContentLoaded", init);