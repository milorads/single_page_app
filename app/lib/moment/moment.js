/**
 * Biblioteka koju koristimo za manipulaciju datumima
 *
 * http://momentjs.com/
 */

define([
	'moment-lib'
], function (moment) {

	/**
	 * Dodajemo funkciju na moment bioblioteku koju cemo koristiti za formatiranje datuma
	 *
	 * Na ovaj nacin jednom funkcijom kontrolisemo ispis datuma na aplikaciji i mozemo lako menjati sam format
	 * @returns {String}
	 */
	moment.fn.formatDate = function () {
		return this.format("ddd DD/MM/Y");
	};

	return moment;
});