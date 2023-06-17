import ExcursionsAPI from '../ExcursionsAPI.js';

import {
	clearUl,
	clearFormFields,
	findUl,
	findLi,
	findId,
	isItemEditable,
} from './common.js';

import {
	validateExcursionsForm,
	validateOrderForm,
	showErrors,
	clearErrorsMessages,
	validateForm,
} from './validation.js';
const api = new ExcursionsAPI();

export function loadExcursions() {
	api
		.loadExcursions()
		.then((data) => {
			showExcursions(data);
		})
		.catch((err) => console.error(err));
}

export function addExcursions() {
	const formEl = document.querySelector('.form');
	formEl.addEventListener('submit', (e) => {
		e.preventDefault();

		const targetEl = e.target;
		const data = createExcursionData(targetEl);

		api
			.addExcursions(data)
			.catch((err) => console.error(err))
			.finally(loadExcursions);
	});
}

function showExcursions(excursionsList) {
	const ulEl = findUl('.panel__excursions');
	const liPrototype = ulEl.querySelector('.excursions__item--prototype');

	clearUl(ulEl);

	excursionsList.forEach((item) => {
		const liEl = createExcursionLi(item, liPrototype);
		ulEl.appendChild(liEl);

		const formEl = document.querySelector('.form');
		if (formEl) {
			const formFields = formEl.querySelectorAll('.form__field');
			clearFormFields(formFields);
		}
	});
}

export function removeExcursions() {
	const ulEl = findUl('.panel__excursions');
	ulEl.addEventListener('click', (e) => {
		e.preventDefault();
		const targetEl = e.target;

		if (targetEl.value === 'usuń') {
			const liEl = findLi(targetEl);
			const id = findId(liEl);

			api
				.removeExcursions(id)
				.catch((err) => console.error(err))
				.finally(loadExcursions);
		}
	});
}

export function updateExcursions() {
	const ulEl = findUl('.panel__excursions');
	ulEl.addEventListener('click', (e) => {
		e.preventDefault();
		const targetEl = e.target;
		const liEl = findLi(targetEl);

		if (targetEl.classList.contains('excursions__field-input--update')) {
			const editableList = liEl.querySelectorAll('.excursions--editable');
			const isEditable = isItemEditable(editableList);

			if (isEditable) {
				const id = findId(liEl);
				const data = editExcursionData(editableList);

				editableList.forEach((item) => item.classList.remove('editable'));

				api
					.updateExcursions(id, data)
					.catch((err) => console.error(err))
					.finally(() => {
						targetEl.dataset.state = 'edit';
						targetEl.value = 'edytuj';
						editableList.forEach((item) => (item.contentEditable = false));
					});
			} else {
				targetEl.dataset.state = 'save';
				targetEl.value = 'zapisz';
				editableList.forEach((item) => {
					item.contentEditable = true;
					item.classList.add('editable');
				});
			}
		}
	});
}

function createExcursionLi(item, liPrototype) {
	const liEl = liPrototype.cloneNode(true);
	liEl.classList.remove('excursions__item--prototype');

	const liTitle = liEl.querySelector('.excursions__title');
	const liDescription = liEl.querySelector('.excursions__description');
	const liPrice = liEl.querySelectorAll('.excursions__price');
	const [liAdultPrice, liChildPrice] = liPrice;

	const { title, description, adultPrice, childPrice, id } = item;
	liTitle.innerText = title;
	liDescription.innerText = description;
	liAdultPrice.innerText = adultPrice;
	liChildPrice.innerText = childPrice;
	liEl.dataset.id = id;

	return liEl;
}
function createExcursionData(targetEl) {
	const { title, description, adultPrice, childPrice } = targetEl.elements;

	const fields = [
		{
			name: 'title',
			label: 'Nazwa',
			required: true,
		},
		{
			name: 'description',
			label: 'Opis',
			required: true,
		},
		{
			name: 'adultPrice',
			label: 'Cena dorosły',
			type: 'number',
			pattern: '^[0-9]+$',
			required: true,
		},
		{
			name: 'childPrice',
			label: 'Cena dziecko',
			type: 'number',
			pattern: '^[0-9]+$',
			required: true,
		},
	];

	clearErrorsMessages();
	const errors = validateForm(targetEl, fields, []);

	if (adultPrice.value.trim() === '') {
		errors.push(
			new Error(adultPrice, 'Pole "Cena dorosły" nie może być puste.')
		);
	}

	if (childPrice.value.trim() === '') {
		errors.push(
			new Error(childPrice, 'Pole "Cena dziecko" nie może być puste.')
		);
	}

	if (errors.length > 0) {
		showErrors(errors);
		return null;
	}

	const excursionData = {
		title: title.value,
		description: description.value,
		adultPrice: Number(adultPrice.value),
		childPrice: Number(childPrice.value),
	};

	return excursionData;
}

function editExcursionData(list) {
	const [title, description, adultPrice, childPrice] = list;

	const parsedAdultPrice = Number(adultPrice.innerText);
	const parsedChildPrice = Number(childPrice.innerText);

	if (!Number.isInteger(parsedAdultPrice) || parsedAdultPrice <= 0) {
		alert(
			'Wprowadź poprawną liczbę  dodatnią całkowitą w polu "Cena dorosły".'
		);
		return null;
	}

	if (!Number.isInteger(parsedChildPrice) || parsedChildPrice <= 0) {
		alert(
			'Wprowadź poprawną liczbę  dodatnią całkowitą w polu "Cena dziecko".'
		);
		return null;
	}

	return {
		title: title.innerText,
		description: description.innerText,
		adultPrice: parsedAdultPrice,
		childPrice: parsedChildPrice,
	};
}
