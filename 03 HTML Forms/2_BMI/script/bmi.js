'use strict';

let html_button;

const checkValues = function(gewicht, lengte) {
    html_button.disabled = 'disabled';

    // if (150 <= lengte <= 200)
    if (lengte >= 150 && lengte <= 200) {
        if (gewicht >= 35 && gewicht <= 200) {
            // html_button.removeAttribute('disabled');
            html_button.disabled = '';
        }
    }
}

const berekenBMI = function(gewicht, lengte) {
    lengte = lengte/100;
    return gewicht / (lengte * lengte);
}

const addEventHandlers = function() {
    let html_gewicht, html_lengte;

    html_gewicht = document.querySelector('.js-gewicht');
    html_lengte = document.querySelector('.js-lengte');

    html_gewicht.addEventListener('input', function() {
        checkValues(html_gewicht.value, html_lengte.value);
    });

    html_lengte.addEventListener('input', function() {
        checkValues(html_gewicht.value, html_lengte.value);
    });

    html_button.addEventListener('click', function() {
        console.log(berekenBMI(html_gewicht.value, html_lengte.value));
    });
}

const init = function() {
    console.log('Script ingeladen.')
    html_button = document.querySelector('input[type=button]');
    // html_button.setAttribute('disabled', 'disabled');
    html_button.disabled = 'disabled';

    addEventHandlers();
}

document.addEventListener('DOMContentLoaded', init);