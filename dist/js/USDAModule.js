'use strict';

var USDAModule = function () {

	//the individual queries may not be necessary. I have them
	//here for safe measure, for now.
	var meats = document.querySelector('#meats');
	var vegetables = document.querySelector('#vegetables');
	var grains = document.querySelector('#grains');
	var dairy = document.querySelector('#dairy');

	//this is the most important query. I'm going to check
	//if any of these have been checked off
	var checkboxes = document.querySelectorAll('.checkbox');

	//search button
	var search = document.querySelector('#search');

	//array to hold all the suggested foods
	// let foodsArray = [];

	//on click of the search button, we loop through the
	//checkboxes to see if there are any checked. If there
	//are, we'll call the api to make a query search for each check
	search.addEventListener('click', function (e) {
		checkboxes.forEach(function (foodGroup) {
			if (foodGroup.checked === true) {
				EdamamModule.searchEdamam(foodGroup);
				BattutaModule.searchBattuta(foodGroup);
				// searchUSDA(foodGroup);
			}
		});
	});

	//we search the api, state the food group we're searching thru
	var searchUSDA = function searchUSDA(checkedFoodGroup) {
		console.log('searchUSDAFoodList()', checkedFoodGroup);

		var API_KEY = 'r2bvhj9kL6I2OWmgp13rWCJ4NYD0FGaf7YckDNE5';
		var url = 'https://api.nal.usda.gov/ndb/search?format=json';

		//we're going to search using a query term, which is the
		//value of the checked food group. we also need to get pretty
		//specific in our search.
		axios.get(url, {
			params: {
				'q': checkedFoodGroup.value,
				'ds': 'Standard Reference',
				'max': '200',
				'api_key': API_KEY
			}
		})

		//after we make a call, we get a list of foods in our results.
		//for each listed item, we'll add it to the array of foods
		//that we'll send over to the Edamam module.
		.then(function (results) {
			console.log(checkedFoodGroup, results.data.list);

			results.data.list.item.forEach(function (result) {
				foodsArray.push(result.name);
				// console.log(foodsArray);
			});
		});
	};

	return {
		searchUSDA: searchUSDA,
		foodsArray: foodsArray
	};
}();
//# sourceMappingURL=USDAModule.js.map
