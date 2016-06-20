/**
 * Created by ivan on 3/25/16.
 */

define([
	'./Edit/Edit',
	'./Add/Add',
	'./List/List'
], function (Edit, Add, List) {

	return {
		Edit: Edit,
		Add: Add,
		List: List
	};
});