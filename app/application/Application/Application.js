/**
 * Created by ivan on 3/26/16.
 */

define([
	'stache!content.stache'
], function (contentTpl) {
	return can.Control.extend(
		{
			defaults: {
				pages: []
			}
		},
		{
			init: function (element, options) {
				this.pages = {};

				options.pages.forEach(this.addPage.bind(this));

				element.html(contentTpl({
					name: options.name
				}));

				this.on(can.route, 'change', 'onRouteChangeHandler');

				can.route.ready();
			},

			addPage: function (pageConfig) {
				this.pages[pageConfig.route] = pageConfig.controller;
				can.route(pageConfig.route);
			},
			
			onRouteChangeHandler: function (routeData, event) {
				var Page;

				if (this.batchNum !== event.batchNum) {
					this.batchNum = event.batchNum;

					Page = this.pages[routeData.route];

					if (this.currentPage !== null) {
						this.currentPage.destroy();
					}

					if (typeof Page === 'function') {
						this.currentPage = Page.handleRoute(this.getPageContainer(), routeData.attr());
					}
				}
			},

			getPageContainer: function () {
				return this.element.find('main');
			},

			currentPage : null
		}
	);
});