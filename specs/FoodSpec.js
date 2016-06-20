define(['app/model/Food/Food'], function(Food){
	describe('Koje je jelo dana', function(){
		var food = new Food();
		it('vrednost jelo dana', function(){
			expect(food.getJeloDana()).toBe('Burgeri');
		});

		it('food instance Food modela', function(){
			expect(food instanceof Food).toBeTruthy();
		})
	})
});
