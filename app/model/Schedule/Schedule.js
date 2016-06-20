define([
	'../Model/Model',
	'moment'
], function (Model, moment) {
	window.moment = moment;

	return Model.extend(
		{
			resource: 'schedules'
		},
		{
			/**
			 * https://canjs.com/docs/can.Map.prototype.define.html
			 */
			define: {
				/**
				 * Prilikom instanciranja datum u formatu DD/MM/YYYY konvertujemo u moment,
				 * a prilikom slanja na server vrednost vracamo u string
				 *
				 * http://momentjs.com/
				 */
				date: {
					type: moment,
					serialize : function (value) {
						return value.format('DD/MM/YYYY');
					}
				},

				/**
				 * Prilikom slanja na server menu parametar treba obrisati
				 */
				menu : {
					serialize : function () {
						return undefined;
					}
				}
			}
		}
	);
});