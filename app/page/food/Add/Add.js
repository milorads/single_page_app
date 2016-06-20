define([
    'can',
    'page/Page/Page',
    'model/Food/Food',
    'stache!/app/page/food/Add/add.stache',
    'validate'
], function (can, Page, Food, foodsTpl, validate) {
    return Page.extend(
        {
            defaults: {
                template: foodsTpl
            }
        },
        {
            init: function (element, options) {
                this.modelView = new can.Map(
                    {
                        menu: new Food(),
                        errors: null,
                        isSaving: false
                    }
                );

                element.html(options.template(this.modelView));

                this.autoFocus();
            },

            '[data-form="add-food"] submit': function (form) {
                var data, errors;

                if(this.isSaving()) {
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

                if(errors) {
                    this.setErrors(errors).isSaving(false);
                } else {
                    new Food(data).save().then(
                        function () {
                            this.isSaving(false);
                            can.route.attr({route: 'foods'}, true);
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