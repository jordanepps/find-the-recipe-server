const testBurgerImage = `https://clarifai.com/cms-assets/20180320212159/food-003.jpg`;

function makeTestBurgerIngredients() {
	return [
		{
			name: 'bacon',
			value: 97
		},
		{
			name: 'cheese',
			value: 93
		},
		{
			name: 'bun',
			value: 86
		},
		{
			name: 'cheddar',
			value: 86
		},
		{
			name: 'onion',
			value: 83
		},
		{
			name: 'beef',
			value: 83
		}
	];
}

module.exports = {
	testBurgerImage,
	makeTestBurgerIngredients
};
