/**
 * Created by ivan on 3/23/16.
 */

define([
	'can',
	'page/Page/Page',
	'model/Menu/Menu',
	'stache!/app/page/menu/Add/add.stache',
	'validate'
], function (can, Page, Menu, menusTpl, validate) {
	return Page.extend(
		{
			defaults: {
				template: menusTpl
			}
		},
		{
			init: function (element, options) {
				this.modelView = new can.Map(
					{
						menu: new Menu(),
						errors: null,
						isSaving: false
					}
				);

				element.html(options.template(this.modelView));

				this.autoFocus();
			},

			'[data-form="add-menu"] submit': function (form) {
				var data, errors;
				
				if(this.isSaving() || this.isRemoving()) {
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
					}	
				});
				
				if(errors) {
					this.setErrors(errors).isSaving(false);
				} else {
					new Menu(data).save().then(
						function () {
							this.isSaving(false);
							can.route.attr({route: 'menus'}, true);
						}.bind(this)
					);
				}

				return false;
			},
			
			setErrors: function (errors) {
				this.modelView.attr('errors', errors);

				return this;
			},
			
			isSaving: function (flag) {
				if (typeof flag === 'boolean') {
					this.modelView.attr('isSaving', flag);
					return this;
				}
				
				return this.modelView.attr('isSaving');
			}
		}
	);
});