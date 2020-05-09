// 'use strict' >> Developer dwingen om variabelen te gaan declareren
'use strict';

const zodiac = [
	'boogschutter',
	'kreeft',
	'leeuw',
	'maagd',
	'ram',
	'schorpioen',
	'steenbok',
	'stier',
	'tweelingen',
	'vissen',
	'waterman',
	'weegschaal'
];

const showWinningNumbers = function(joker) {
	let html = '';
	for (let dink of joker) {
		if (isNaN(dink)) {
			html += `<div><img src="images/zodiac/${dink}.png" alt="${dink}"></div>`
		}
		else {
			html += `<div>${dink}</div>`
		}
	}
	return html;
}

const randomNumber = function(min=0, max=9) {
	// const random = parseInt(Math.random() * (max+1));
	// const random = Math.floor(Math.random() * (max+1));

	const random = parseInt(Math.random() * (max-min+1) + min)

	return random;
}

const generateJoker = function(cijfers, dieren) {
	let arrJoker = [];
	for (let i = 0; i < cijfers; i++) {
		arrJoker.push(randomNumber());
	}

	for (let i = 0; i < dieren; i++) {
		arrJoker.push(zodiac[randomNumber(0, zodiac.length-1)]);
	}
	return arrJoker;
}

const init = function() {
	const joker = generateJoker(6,2);
	console.log('init function');
	document.querySelector('.js-result').innerHTML = showWinningNumbers(joker);
}

init();