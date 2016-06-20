/**
 * Created by ivan on 3/26/16.
 */

define([
	'can',
	'stache!/app/page/Page/default.stache'
], function (can, content) {
	return can.Control.extend(
		{
			/**
			 * Handles triggering of the route change
			 * @returns {Page}
			 */
			handleRoute: function handleRoute(element, options) {
				return new this(element, options);
			}
		},
		{
			init : function (element, options) {
				element.html(this.template(options));
			},

			autoFocus: function () {
				this.element.find('[autofocus]').first().focus();
			},

			template : content
		}
	);
});