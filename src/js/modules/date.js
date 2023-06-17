export function displayDate() {
	const now = new Date();
	let day = now.getDate();
	let month = now.getMonth() + 1; // Miesiące są indeksowane od 0
	const year = now.getFullYear();

	let hours = now.getHours();
	let minutes = now.getMinutes();

	// dodaje zera na początku jeśli liczba jest jednocyfrowa
	day = (day < 10 ? '0' : '') + day;
	month = (month < 10 ? '0' : '') + month;
	hours = (hours < 10 ? '0' : '') + hours;
	minutes = (minutes < 10 ? '0' : '') + minutes;

	const dateStr = ` na dzień: ${day}-${month}-${year} ${hours}:${minutes}`;

	document.getElementById('date').innerHTML = dateStr;
}
