"use strict";

const backend_IP = "http://localhost:5000";
const backend = backend_IP + "/api/v1";

//#region ***  DOM references ***
let html_mendeljev;
let html_info;
let html_filter;
//#endregion

//#region ***  Callback-Visualisation - show___ ***
const showFilters = function(jsonObject) {
    console.log(jsonObject);
    let filter_list = "";
    for (let filter of jsonObject) {
        filter_list += `<div data-typeid="${filter.typeID}" class="js-filter-type c-filter--type c-filter--type-${filter.typeCode}">${filter.type}</div>`;
    }
    html_filter.innerHTML = filter_list;

    listenToFilters();
}

const showElements = function(jsonObject) {
    console.log(jsonObject);
    let element_list = "";
    for (let e of jsonObject) {
        element_list +=
        `<div data-atomic="${e.atomicNumber}" class="c-mendelelement o-gridrow-${e.displayRow} o-gridcol-${e.displayColumn} c-mendelelement--${e.typeCode}">
            <div class="c-mendelelement__atomicnumber">${e.atomicNumber}</div>
            <div class="c-mendelelement__symbol">${e.symbol}</div>
        </div>`;
    }
    html_mendeljev.innerHTML = element_list;

    listenToElementInfo();
}

const showElementInfo = function(jsonObject) {
    console.log(jsonObject);
    html_info.innerHTML = `Symbol: ${jsonObject.symbol} - ${jsonObject.name}: ${jsonObject.discoverer}`
}
//#endregion

//#region ***  Callback-No Visualisation - callback___  ***
//#endregion

//#region ***  Data Access - get___ ***
const getFilters = function() {
    handleData("http://127.0.0.1:5000/api/v1/types", showFilters);
}

const getAllElements = function() {
    handleData("http://127.0.0.1:5000/api/v1/elementen", showElements);
}

const getElementsByType = function(typeid) {
    handleData(`http://127.0.0.1:5000/api/v1/elementen/types/${typeid}`, showElements);
}

const getElementInfo = function(atomic) {
    handleData(`http://127.0.0.1:5000/api/v1/elementen/${atomic}`, showElementInfo);
}
//#endregion

//#region ***  Event Listeners - listenTo___ ***
const listenToFilters = function() {
    const filters = document.querySelectorAll(".js-filter-type");
    for (const filter of filters) {
        filter.addEventListener("click", function() {
            getElementsByType(filter.dataset.typeid);
        });
    }
}

const listenToElementInfo = function() {
    const elements = document.querySelectorAll(".c-mendelelement");
    for (const e of elements) {
        e.addEventListener("mouseover", function() {
            // Get info
            console.log("HALLO");
            getElementInfo(e.dataset.atomic);
        });
    }
}
//#endregion

//#region ***  INIT / DOMContentLoaded  ***
const init = function () {
    html_filter = document.querySelector(".js-filter");
    html_mendeljev = document.querySelector(".js-mendeljev");
    html_info = document.querySelector(".js-info");

    getFilters();
    getAllElements();
};
//#endregion

document.addEventListener("DOMContentLoaded", init);
