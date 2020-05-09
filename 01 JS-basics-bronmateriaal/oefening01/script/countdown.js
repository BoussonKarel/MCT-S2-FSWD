const setSpaces = function(getal) {
    let spaces = '';
    for (let i = 0; i < getal; i++) {
        spaces += '&nbsp;';
    }
    return spaces;
};

const getCCSClass = function(getal) {
    if (getal % 2 == 0) {
        return 'u-even';
    } else {
        return 'u-odd';
    }
};

const createCountDown = function() {
    // let counter;
    // let size = 10;
    let counter = '', size = 10;
    // Doen we geen ='', dan komt er 'undefined' en dan de spans

    for (size; size > 0; size--) {
        counter += `<span style="font-size: ${size}em" class="${getCCSClass(size)}">${size}</span>${setSpaces(size)}`;
    }

    return counter;
};

const init = function() {
    document.querySelector('.js-holder').innerHTML = createCountDown();
};

init();