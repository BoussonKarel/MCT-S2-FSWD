'use strict';

//#region ***  DOM references ***

//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showData = function(data) {
    console.log(data);
    let converted_labels = [];
    let converted_data = [];
    for (const iphone of data) {
        converted_labels.push(iphone.unit);
        converted_data.push(iphone.price);
    }
    drawChart(converted_labels, converted_data);
}

const drawChart = function(labels, data) {
    let ctx = document.querySelector('.js-chart').getContext('2d');

    let config = {
        type: 'line', // Soort grafiek
        data: {
            labels: labels, // Alle labels onderaan de grafiek
            datasets: [
                {
                    label: 'iPhone', // Label bovenaan
                    backgroundColor: 'white', // Achtergrondkleur
                    borderColor: 'red', // Styling
                    data: data, // Data die je aan de grafiek linkt
                    fill: false // Styling
                }
            ]
        },
        options: { // Opties om de stijl en het gedrag vd grafiek aan te passen
            responsive: true,
            title: {
                display: true,
                text: 'Chart.js Line Chart'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            },
            hover: {
                mode: 'interact',
                intersect: true
            },
            scales: {
                xAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Model'
                        }
                    }
                ],
                yAxes: [
                    {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Prijs'
                        }
                    }
                ]
            }
        }
    };

    let myChart = new Chart(ctx, config);
}
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***

//#endregion

//#region ***  Data Access - get___ ***
const getIPhoneData = function() {
    handleData('./iphone.json', showData);
}

//#endregion

//#region ***  Event Listeners - listenTo___ ***

//#endregion

//#region ***  INIT / DOMContentLoaded  ***
const init = function() {
    console.info('init geladen');
    getIPhoneData();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM ingeladen');
    init();
});
//#endregion
