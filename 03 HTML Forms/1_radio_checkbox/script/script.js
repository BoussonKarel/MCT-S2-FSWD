'use strict';



const init = function() {
    // const range = document.querySelector("input[type=range]");
    const range = document.querySelector('#score');
    range.addEventListener('input', function() {
        document.querySelector(".js-output").innerHTML = `${range.value} / 10`
    });
}

document.addEventListener('DOMContentLoaded', init);