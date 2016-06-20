define([
	'can/model'
], function (Model) {
	return Model.extend(
		{
			/**
			 * Podesava url koji ce biti koriscen na nivou svih modela uz dodatak resurs parametra
			 */
			serverUrl: 'http://api-klopa.rhcloud.com',

			setup: function () {
				this.resource = this.serverUrl + '/' + this.resource;
				return Model.setup.apply(this, arguments);
			}
		},
		{}
	);
});