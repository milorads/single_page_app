
define([
	'validate-lib'
], function (validate) {

	validate.validators.length.options = {
		tokenizer: function (value) {
			return value.trim();
		}
	};

	return validate;
});