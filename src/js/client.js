import './../css/reset.css';
import './../css/global.css';
import './../css/variables.css';
import './../css/media.css';

import { loadExcursions } from './modules/mainFunctions.js';
import {
	addItemToBasket,
	removeItemFromBasket,
	submitOrder,
} from './modules/basket.js';
document.addEventListener('DOMContentLoaded', init);

function init() {
	console.log('DOM');

	loadExcursions();

	const basket = [];
	addItemToBasket(basket);
	removeItemFromBasket(basket);

	submitOrder(basket);
}
