/**
 * Created by ivan on 3/26/16.
 */

define([
	'page/Page/Page',
	'can',
	'stache!/app/page/menu/List/list.stache',
	'model/Menu/Menu'
], function (Page, can, content, Menu) {
	return Page.extend(
		{},
		{
			template: content,

			init: function (element) {
				var isLoading = can.compute(true);

				var promise = Menu.findAll();

				promise.always(
					function () {
						isLoading(false);
					}
				);

				element.html(
					this.template({
						menus: new Menu.List(promise),
						isLoading: isLoading
					})
				);
			}
		}
	);
});