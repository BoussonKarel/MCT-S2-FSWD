'use strict';

// STAP 3
const toonWeer = function(jsonObject) {
    console.log(jsonObject);
    // Stad als titel instellen
    const stad = jsonObject.city.name;
    document.querySelector(".js-city-placeholder").innerHTML = stad;

    // 5-daags weerbericht voor vandaag + 4 dagen
    const arrVoorspellingen = jsonObject.list;

    let html = '';
    // for(let element of arrVoorspellingen)
    // Het verspringt per 3 uur, maar wij willen per dag:
    for(let i = 0; i < arrVoorspellingen.length - 1; i+=8) {
        const element = arrVoorspellingen[i];
        const datumUTC = element.dt;
        const dag = new Date(datumUTC * 1000);
        const weekdag = day2nl(dag.getDay());
        console.log(weekdag);
        const weertype = element.weather[0].description;
        const tempMax = Math.round(element.main.temp_max);
        const tempMin = Math.round(element.main.temp_min);

        const degrees = element.wind.deg;
        let windrichting;
        if (degrees >= 315 && degrees < 45) {
            windrichting = 'n';
        }
        else if (degrees >= 45 && degrees <135) {
            windrichting = 'o';
        }
        else if (degrees >= 135 && degrees < 225) {
            windrichting = 'z';
        }
        else if (degrees >=225 && degrees < 315) {
            windrichting = 'w';
        }

        html += `
        <div class="c-forecast">
            <div class="c-forecast__datum">${weekdag}</div>
            <div class="c-forecast__symbol">
                <img src="images/weather/${weatherCodeToImage(element.weather[0].id)}" alt="${weertype}" />
            </div>
            <div class="c-forecast__uitleg">
                ${weertype}
            </div>
            <div class="c-forecast__max">${tempMax}°C</div>
            <div class="c-forecast__min">${tempMin}°C</div>
            <!-- uitbreiding -->
            <div class="c-forecast__wind">
                <img src="images/weather/wi-wind-deg-${windrichting}.svg" alt="richting" class="c-forecast__wind-symbol">
                <img src="images/weather/wi-wind-beaufort-${Math.round(element.wind.speed)}.svg" alt="beaufort" class="c-forecast__wind-symbol">
            </div>
            <!-- end uitbreiding -->
        </div>
        `;
    }

    document.querySelector('.js-weather-placeholder').innerHTML = html;
}

const day2nl = function(dagnummer) {
    if (dagnummer >= 0 && dagnummer <= 6) {
        // Amerikanen beginnen de week op Zondag!
        const arrWeekdagen = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
        return arrWeekdagen[dagnummer];
    }
    else {
        throw Error('Dagnummer moet tussen 0 en 6 liggen.');
    }
}

const weatherCodeToImage = function(weercode) {
    let codestring = weercode.toString();
    let eersteDigit = codestring.substring(0, 1);
    if (eersteDigit === '2') {
        return 'wi-thunderstorm.svg';
    }
    else if (eersteDigit === '3') {
        return 'wi-sprinkle.svg';
    }
    else if (eersteDigit === '4') {
        return 'wi-sprinkle.svg';
    }
    else if (eersteDigit === '5') {
        return 'wi-rain.svg';
    }
    else if (eersteDigit === '6') {
        return 'wi-snow.svg';
    }
    else if (eersteDigit === '7') {
        return 'wi-fog.svg';
    }
    else if (eersteDigit === '8') {
        if (codestring === '800') {
            return 'wi-day-sunny.svg';
        }
        else if (codestring === '801') {
            return 'wi-day-sunny-overcast.svg';
        }
        else {
            return 'wi-cloud.svg';
        }
    } else if (eersteDigit === '9') {
        return 'wi-sprinkle.svg';
    }
};

// STAP 2
const laadInfo = function() {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=kortrijk,BE&appid=0d83dff417d181fcf3def092e000cdf6&units=metric&lang=nl')
    .then(function(response) {
        if (!response.ok) {
            throw Error(`Er is een fout opgetreden: ${response.status}`);
        }
        else {
            return response.json();
        }
    })
    .then(function(jsonObject) {
        toonWeer(jsonObject);
    })
    .catch(function(error) {
        console.log(`Fout bij het verwerken van json: ${error}`);
    })
};

// STAP 1
const init = function() {
    console.log("Hallo wereld!");
    laadInfo();
}

document.addEventListener("DOMContentLoaded", init);