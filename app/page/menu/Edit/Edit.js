/**
 * Created by ivan on 3/23/16.
 */

define([
	'can',
	'page/Page/Page',
	'model/Menu/Menu',
	'stache!/app/page/menu/Edit/edit.stache',
	'validate'
], function (can, Page, Menu, menusTpl, validate) {
	/**
	 * @class Edit
	 */
	return Page.extend(
		{
			defaults: {
				/**
				 * Ukoliko ne prosledimo neki drugi templejt prilikom instanciranja
				 * menusTpl ce biti koriscen.
				 */
				template: menusTpl
			}
		},
		{
			init: function (element, options) {
				/**
				 * Objekat koji predstavlja vezu izmedju templejta i kontrolera
				 * Preko njega templejtu dajemo informaciju o tome da li trenutno ucitavamo sadrzaj (isLoading),
				 * cuvamo promene (isSaving) ili brisemo trenutno prikazani entitet (isRemoving).
				 *
				 * Pored toga prosledjujemo i sam objekat koji treba prikazati (menu) kao i grekse koje nastaju
				 * prilikom unosa (errors)
				 */
				this.modelView = new can.Map(
					{
						menu: null,
						errors: null,
						isLoading: true,
						isRemoving: false,
						isSaving: false
					}
				);

				element.html(options.template(this.modelView));


				/**
				 * Saljemo zahtev na server, nakon povratka informacija sa servera, prosledjujemo
				 * templejtu dohvaceni objekat i cuvamo referencu na njega, kako bismo ga kasnije mogli
				 * sacuvati ili obrisati
				 *
				 * takodje fokusiramo prvi element koji ima atribut autofucus cime omogucavamo korisniku da
				 * odmah zapocne unos, bez potrebe za dodatnim klikom kojim ce selektovati (fokusirati) polje za unos.
				 */
				Menu.findOne({
					id: can.route.attr('id')
				}).then(
					function (menu) {
						this.setMenu(menu).isLoading(false).autoFocus();
					}.bind(this)
				);
			},

			/**
			 * Brisanje menija
			 *
			 * @param link na koji se kliknulo
			 * @param event koji je registrovan prilikom klika na link
			 */
			removeModel: function (link, event) {
				event.preventDefault();

				if (this.isSaving() || this.isRemoving()) {
					return;
				}

				this.isRemoving(true);

				this.getMenu().destroy().then(
					function () {
						this.isRemoving(false).goToList();
					}.bind(this)
				);
			},

			/**
			 * Ova funkcija salje ajax poziv na server kojim se serveru prosledjuju nove vrednosti
			 *
			 * Trajanje funkcije
			 *
			 * @param form forma koju treba sacuvati
			 * @param event koji je registrovan prilikom klika na dugme
			 */
			saveChanges: function (form, event) {
				var data, errors;

				event.preventDefault();

				/**
				 * Ukoliko vec vrsimo cuvanje sadrzaja ili brisanje odbijamo ovaj zahtev
				 */
				if (this.isSaving() || this.isRemoving()) {
					return;
				}

				this.isSaving(true);

				/**
				 * Dohvatanje sadrzaja forme
				 */
				data = validate.collectFormValues(form);


				/**
				 * Validacija vrednosti
				 * https://validatejs.org/
				 */
				errors = validate(data, {
					name: {
						presence: true,
						length: {
							minimum: 2,
							message: "must be at least 2 characters"
						}
					}
				});


				if (errors) {
					/**
					 * Ukoliko postoje greske prosledjujemo ih u templejt (gde ce se prikazati korisniku)
					 * i zavrsavamo obradu
					 */
					this.setErrors(errors).isSaving(false);
				} else {
					/**
					 * Ukoliko su podaci validni saljemo ih na server
					 *
					 * Posto dobijemo odgovor oznacavamo process cuvanja zavrsenim i prelazimo na stranicu sa listom
					 * entiteta
					 */
					this.getMenu().attr(data).save().then(
						function () {
							this.isSaving(false).goToList();
						}.bind(this)
					);
				}
			},

			/**
			 * Postavlja "menu" parametar u menuView objekat kako bi bio vidljiv templejtu, kao i dostupan kasnije
			 * u metodama za cuvanje promena i brisanje (saveChanges, removeModel)
			 */
			setMenu: function (menu) {
				/**
				 * Postavaljamo novu vrednost
				 */
				this.modelView.attr('menu', menu);

				/**
				 * Omogucavamo uvezivanje metoda
				 */
				return this;
			},

			/**
			 * Dohvata objekat menija
			 */
			getMenu: function () {
				return this.modelView.attr('menu');
			},

			/**
			 * Postavlja objekat sa greskama koje mogu nastati prilikom provere sadrzaja forme
			 */
			setErrors: function (errors) {
				this.modelView.attr('errors', errors);

				return this;
			},

			/**
			 * Povratak na listu menija
			 */
			goToList: function () {
				can.route.attr({route: 'menus'}, true);

				return this;
			},

			/**
			 * true - kada je slanje podataka na server u toku
			 */
			isSaving: function (flag) {
				/**
				 * Ukoliko je prosledjena vrednost postavljamo novo stanje
				 */
				if (typeof flag === 'boolean') {
					this.modelView.attr('isSaving', flag);

					/**
					 * Vracamo referencu na trenutni objekat kako bismo omogucili uvezivanje metoda
					 */
					return this;
				}

				/**
				 * Vracamo vrednost flega
				 */
				return this.modelView.attr('isSaving');
			},

			/**
			 * true - kada je slanje zahteva za brisanje u toku
			 */
			isRemoving: function (flag) {
				if (typeof flag === 'boolean') {
					this.modelView.attr('isRemoving', flag);
					return this;
				}

				return this.modelView.attr('isRemoving');
			},

			/**
			 * true - kada je dohvatanje modela u toku kojim se inicijalno popunjava forma
			 */
			isLoading: function (flag) {
				if (typeof flag === 'boolean') {
					this.modelView.attr('isLoading', flag);
					return this;
				}

				return this.modelView.attr('isLoading');
			},

			/**
			 * Veza izmedju templejta i kontrolera
			 * Sve akcije koje korisnik napravi mozemo mapirati u pozive funkcija kontrolera
			 * format je
			 * < selektor elementa > < akcija > : < naziv funkcije >
			 *
			 * Korisceni su atributi za selektovanje kako se ne bi mesali selektori stilova i akcija
			 *
			 * Sve nacine na koje mozete selektovati elemente mozete naci ovde
			 *
			 * http://www.w3schools.com/cssref/css_selectors.asp
			 *
			 * ili ovde
			 *
			 * https://css-tricks.com/almanac/selectors/
			 */

			'[data-form="edit-menu"] submit': 'saveChanges',

			'[data-action="remove-menu"] click': 'removeModel'
		}
	);
});