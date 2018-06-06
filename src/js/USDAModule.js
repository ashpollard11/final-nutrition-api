var USDAModule = (function() {

	//the individual queries may not be necessary. I have them
	//here for safe measure, for now.
	let meats = document.querySelector('#meats');
	let vegetables = document.querySelector('#vegetables');
	let grains = document.querySelector('#grains');
	let dairy = document.querySelector('#dairy');

	//this is the most important query. I'm going to check
	//if any of these have been checked off
	let checkbox = document.querySelectorAll('.checkbox');

	//this may be an optional box for the user in the long run,
	//but will be useful later
	let calories = document.querySelector('#calories');
	
	//search button
	const search = document.querySelector('#search');

	//array to hold all the suggested foods
	let foodsArray = [];

	//on click of the search button, we loop through the
	//checkboxes to see if there are any checked. If there
	//are, we'll call the api to make a food list for each check
	search.addEventListener('click', function(e) {
		checkbox.forEach((foodGroup) => {
			if (foodGroup.checked === true) {
				searchUSDAFoodList(foodGroup);
			}
		})
	})

	//we search the api, state the food group we're searching
	//in the list
	const searchUSDAFoodList = function (checkedFoodGroup) {
		console.log('searchUSDAFoodList()', checkedFoodGroup)

		const API_KEY = 'r2bvhj9kL6I2OWmgp13rWCJ4NYD0FGaf7YckDNE5';
		let url = 'https://api.nal.usda.gov/ndb/list?format=json';

		axios.get(url, {
			params: {
				'lt' : 'f',
				'sort': 'n'
				'key': API_KEY
			}
		})

		//for each listed food, we'll call the api again to
		//make nutrient reports with the listed food's code.
		//this code can only be retrieved from the list.
		.then(function (results) {
			console.log(checkedFoodGroup, results)
			results.forEach((result) => {
				searchUSDAReport(result.foodcode)
			})
		})
	}

	//we search the api for reports.
	const searchUSDAReport = function (checkbox) {
		console.log('searchUSDA()', checkbox)

		const API_KEY = 'r2bvhj9kL6I2OWmgp13rWCJ4NYD0FGaf7YckDNE5';
		let url = 'http://api.nal.usda.gov/ndb/nutrients/?format=json';

		axios.get(url, {
			params: {
				'nutrients': nutrients,
				'key': API_KEY
			}
		})

		//for each report, if the calories listed on the food
		//is equal to or less than our requested calories,
		//we'll add the food to our array of food. This array will
		//be sent over to the food2fork module to request recipes.
		.then(function (reports) {
			console.log(reports)
			reports.forEach((report) => {
				if (report.kcal <= calories.value) {
					foodsArray.push(report.kcal);
				}
			})
		})
	}



})();