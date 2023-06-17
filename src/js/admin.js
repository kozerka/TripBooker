import './../css/reset.css';
import './../css/global.css';
import './../css/variables.css';
import './../css/media.css';

// import ExcursionsAPI from './ExcursionsAPI';
import {
	loadExcursions,
	addExcursions,
	removeExcursions,
	updateExcursions,
} from './modules/mainFunctions.js';
import { displayDate } from './modules/date.js';
// console.log('admin');

document.addEventListener('DOMContentLoaded', init);

function init() {
	loadExcursions();
	addExcursions();
	removeExcursions();
	updateExcursions();
}

async function fetchOrders() {
	try {
		const response = await fetch('./../data/excursions.json');
		if (!response.ok) {
			throw new Error('Wystąpił problem podczas pobierania zamówień.');
		}
		const data = await response.json();
		const orders = data.orders;
		const ordersList = document.querySelector('.orders__list');

		orders.forEach((order) => {
			const orderItem = document.createElement('li');

			let itemsTitles = '';
			order.items.forEach((item) => {
				itemsTitles += `<li>${item.title}</li>`;
			});

			orderItem.innerHTML = `<strong>Zamówienie nr: ${order.id} </strong> <br>z dnia ${order.date}, na łączną kwotę: ${order.totalPrice} PLN, <br>
				Destynacje: <ul>${itemsTitles}</ul> Zamawiający: <span class="highlighted">${order.name}</span>: <br> Adres email zamawiającego: <span class="highlighted">${order.email}</span>`;

			orderItem.classList.add('orders__list-item');
			ordersList.appendChild(orderItem);
		});
	} catch (error) {
		console.error(error);
	}
}

fetchOrders();
displayDate();
setInterval(displayDate, 1000);
