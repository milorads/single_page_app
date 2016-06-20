define([
	'./Login/Login',
	'./Signup/Signup'
], function (Login, Signup) {

	return {
		Signup: Signup,
		Login: Login
	};
});