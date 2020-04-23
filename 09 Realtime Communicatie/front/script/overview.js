'use strict';

const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

let html_table, html_clearButton;

const showOverview = function(data) {
    let table_content = "";
    for (let log_item of data) {
        table_content += `<tr class="c-row">
        <td class="c-cell">${log_item.date}</div>
        <td class="c-cell">${log_item.amount}ml</div></tr>`;
    }

    html_table.innerHTML = table_content
};

const getOverview = function() {
    handleData("http://127.0.0.1:5000/api/v1/progress", showOverview);
}

const callbackDeleted = function(data) {
    console.log(data);
}

const init = function() {
    html_table = document.querySelector(".js-table");
    getOverview();

    html_clearButton = document.querySelector(".js-clear-amount-today");
    html_clearButton.addEventListener("click", function() {
        handleData("http://127.0.0.1:5000/api/v1/progress/today", callbackDeleted, null, "DELETE");
    });
}

document.addEventListener("DOMContentLoaded", init);