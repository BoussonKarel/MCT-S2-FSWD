"use strict";

let html_addButton, html_wave, html_percentage;
const dailyGoal = 1500;
let currentProgress = 0; // in milliliter

const lanIP = `${window.location.hostname}:5000`;
const socket = io(lanIP);

const updateView = function(progressInPercentage) {
    html_percentage.innerHTML = progressInPercentage;
    let remainingPercentage = 100 - progressInPercentage;
    if (remainingPercentage < 0) {
        remainingPercentage = 0;
    }
    html_wave.style.transform = `translateY(${remainingPercentage}%)`;
}

const listenToUI = function() {
    const radiobuttons = document.querySelectorAll(".js-water-amount");
    for (let rdb of radiobuttons) {
        rdb.addEventListener("change", function() {
            // Tekst in button js log water naar 100 250 of 500ml
            if (rdb.checked) {
                // Amount uit radiobutton halen
                let amount = rdb.getAttribute("data-amount");
                // Amount in knop steken
                html_addButton.setAttribute("data-amount", amount);
                // Amount op knop aanpassen
                html_addButton.querySelector(".js-log").innerHTML = amount;
            }
        });
    }

    html_addButton.addEventListener("click", function() {
        let newAmount = this.dataset.amount;

        console.log(`Er wordt ${newAmount} ml gedronken.`);

        socket.emit("F2B_new_logging", {'amount': newAmount})
    });
}

const listenToSocket = function() {
    socket.on("connect", function(msg) {
        console.log("Verbonden met socket webserver");
    });

    socket.on("B2F_connected", function(value) {
        currentProgress = value.currentProgress;
        console.log(`Eerste boodchap server: huidig aantal ml gedronken in DB ${currentProgress} ml`);
        let progressInPercentage = Math.ceil(currentProgress / 1500 * 100);
        updateView(progressInPercentage);
    });

    socket.on("B2F_add_progress", function(value) {
        let addAmount = parseInt(value.amount);
        currentProgress += addAmount;
        let progressInPercentage = Math.ceil(currentProgress / 1500 * 100);
        updateView(progressInPercentage);
    });

    socket.on("B2F_clear", function(value) {
        currentProgress = 0;
        console.log(`Teller gereset`);
        updateView(0);
    });
}

document.addEventListener("DOMContentLoaded", function() {
    html_addButton = document.querySelector(".js-log-water");
    html_wave = document.querySelector(".js-waves");
    html_percentage = document.querySelector(".js-percentage");

    listenToUI();
    listenToSocket();
});