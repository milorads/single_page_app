/**
 * Created by ivan on 3/26/16.
 */

define([
	'page/Page/Page',
	'can',
	'stache!/app/page/user/Signup/signup.stache'
], function (Page, can, content) {
	return Page.extend(
		{

		},
		{
			template : content
		}
	);
});