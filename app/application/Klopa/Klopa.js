define([
	'../Application/Application',

	'page/Home/Home',
	'page/Index/Index',

	'page/menu/menu',
	'page/food/food',
	'page/user/user',
	'page/schedule/schedule'
], function (Application, Home, Index, menu, food, user, schedule) {

	return Application.extend(
		{
			defaults: {
				pages: [
					{
						controller: Home,
						route: 'home'
					},

					{
						controller: Index,
						route: ''
					},

					/**
					 * Food
					 */
					{
						controller: food.Add,
						route: 'foods/add'
					},
					{
						controller: food.List,
						route: 'foods'
					},
					{
						controller: food.Edit,
						route: 'foods/:id'
					},

					/**
					 * Menu
					 */
					{
						controller: menu.Add,
						route: 'menus/add'
					},
					{
						controller: menu.Edit,
						route: 'menus/:id'
					},
					{
						controller: menu.List,
						route: 'menus'
					},

					/**
					 * User
					 */
					{
						controller: user.Signup,
						route: 'signup'
					},
					{
						controller: user.Login,
						route: 'login'
					},

					/**
					 * Schedule
					 */
					{
						controller: schedule.List,
						route: 'schedule'
					},
					{
						controller: schedule.Add,
						route: 'schedule/add'
					}
				],

				name: 'Klopa'
			}
		},
		{}
	);
});