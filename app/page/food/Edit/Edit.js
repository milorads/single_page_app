define([
	'can',
	'page/Page/Page',
	'model/Food/Food',
	'stache!/app/page/food/Edit/edit.stache',
	'validate'
], function (can, Page, Food, foodTpl, validate) {
	/**
	 * @class Edit
	 */
	return Page.extend(
		{
			defaults: {

				template: foodTpl
			}
		},
		{
			init: function (element, options) {

				this.modelView = new can.Map(
					{
						food: null,
						errors: null,
						isLoading: true,
						isRemoving: false,
						isSaving: false
					}
				);

				element.html(options.template(this.modelView));



				Food.findOne({
					id: can.route.attr('id')
				}).then(
					function (food) {
						this.setFood(food).isLoading(false).autoFocus();
					}.bind(this)
				);
			},


			removeModel: function (link, event) {
				event.preventDefault();

				if (this.isSaving() || this.isRemoving()) {
					return;
				}

				this.isRemoving(true);

				this.getFood().destroy().then(
					function () {
						this.isRemoving(false).goToList();
					}.bind(this)
				);
			},


			saveChanges: function (form, event) {
				var data, errors;

				event.preventDefault();

				if (this.isSaving() || this.isRemoving()) {
					return;
				}

				this.isSaving(true);

				data = validate.collectFormValues(form);


				errors = validate(data, {
					name: {
						presence: true,
						length: {
							minimum: 2,
							message: "must be at least 2 characters"
						}
					},
					description: {
						presence: true,
						length: {
							minimum: 5,
							message: "must be at least 5 characters"
						}
					}
				});


				if (errors) {
					this.setErrors(errors).isSaving(false);
				} else {

					this.getFood().attr(data).save().then(
						function () {
							this.isSaving(false).goToList();
						}.bind(this)
					);
				}
			},

			setFood: function (food) {
				this.modelView.attr('food', food);
				return this;
			},

			getFood: function () {
				return this.modelView.attr('food');
			},

			setErrors: function (errors) {
				this.modelView.attr('errors', errors);

				return this;
			},

			goToList: function () {
				can.route.attr({route: 'foods'}, true);

				return this;
			},

			isSaving: function (flag) {
				if (typeof flag === 'boolean') {
					this.modelView.attr('isSaving', flag);
					return this;
				}

				return this.modelView.attr('isSaving');
			},


			isRemoving: function (flag) {
				if (typeof flag === 'boolean') {
					this.modelView.attr('isRemoving', flag);
					return this;
				}

				return this.modelView.attr('isRemoving');
			},


			isLoading: function (flag) {
				if (typeof flag === 'boolean') {
					this.modelView.attr('isLoading', flag);
					return this;
				}

				return this.modelView.attr('isLoading');
			},


			'[data-form="edit-food"] submit': 'saveChanges',

			'[data-action="remove-food"] click': 'removeModel'
		}
	);
});