define([
	'../Model/Model'
], function (Model) {
	return Model.extend(
		{
			resource : 'foods',
			defaults:{
				jeloDana:'Burgeri'
			}
		},
		{
			getJeloDana : function(){
				return this.jeloDana;
			}
		}
	);
});