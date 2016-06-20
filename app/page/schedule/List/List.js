/**
 * Created by ivan on 3/26/16.
 */

define([
	'page/Page/Page',
	'can',
	'stache!/app/page/schedule/List/list.stache',
	'model/Schedule/Schedule'
], function (Page, can, content, Schedule) {
	return Page.extend(
		{
			defaults: {
				
				template: content
			}
		},
		{

			init: function (element, options) {

				this.modelView = new can.Map(
					{
						schedule:null,
						isLoading: true,
						isRemoving: false
					}
				);

				element.html(options.template(this.modelView));

				this.setSchedules();

            },

            setSchedules: function () {

            	var promise = Schedule.findAll({
	                /**
	                 * Saljemo na server _expand parametar kako bismo dobili i objekat menija u samom schedule objektu
	                 */
	                '_expand' : 'menu'
                }); 

            	this.modelView.attr('isLoading', true);

				promise.always(
                    function () {
                        this.modelView.attr('isLoading', false);
                    }.bind(this)
                );

				this.modelView.attr('schedule', new Schedule.List(promise));

				/**
				 * Omogucavamo uvezivanje metoda
				 */
				return this;
			},

            removeSchedule: function(link, event){
     
            	event.preventDefault();

            	this.modelView.attr('isRemoving', true);

            	Schedule.destroy(link.data('id')).then(
            		function (){
            			this.modelView.attr('isRemoving', false);
            			this.setSchedules();        			
            		}.bind(this));
            },

            '[data-action="remove-schedule"] click': 'removeSchedule'

		}
	);
});