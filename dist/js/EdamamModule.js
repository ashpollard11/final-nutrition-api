'use strict';

var EdamamModule = function () {

	//use the country to search countries
	var country = document.querySelector('#country');
	//use the calories to search with maximum calories
	var calories = document.querySelector('#calories');

	//search button
	var search = document.querySelector('#search');

	//where results go
	var results = document.querySelector('#results');

	//form
	var form = document.querySelector('#search-form');

	//on click of the search button, we loop through the
	//checkboxes to see if there are any checked. If there
	//are, we'll call the api to make a query search for each check
	search.addEventListener('click', function (e) {
		results.innerHTML = '';
		searchEdamam(country, calories);
		BattutaModule.searchBattuta();
		country.value = '';
		calories.value = '';
	});

	var searchEdamam = function searchEdamam(country, cal) {

		console.log('searchEdamam()', country.value, cal.value);

		var API_ID = '7225e88e';
		var API_KEY = '0b61fdd62618cc0846b866672077a6ea';
		var url = 'https://api.edamam.com/search';

		axios.get(url, {
			params: {
				'app_id': API_ID,
				'app_key': API_KEY,
				'q': country.value,
				'calories': "0-" + cal.value
			}
		}).then(function (results) {
			console.log(results);
			displayRecipes(results.data.hits);
		});
	};

	var displayRecipes = function displayRecipes(recipeArray) {

		recipeArray.forEach(function (item) {
			console.log(item.recipe);

			//first, we make a container = li.
			//container holding all the data
			var liCont = document.createElement('li');

			//second, we make a div to hold the recipe info.
			//this will be useful for styling/flexibility.
			//it will be appended to the liCont.
			var innerDiv = document.createElement('div');

			//then the image, with a fallback.
			//if there is an image, include it
			var thumbnail = "https://pbs.twimg.com/profile_images/571009371593666560/H8BnOWbx.jpeg";
			if (item.recipe.image) {
				thumbnail = item.recipe.image;
			}

			//img. container of the thumbnail
			var imgCont = document.createElement('img');
			//name
			var title = item.recipe.label;

			//the link itself
			var url = item.recipe.url;

			//the a tag
			var link = document.createElement('a');

			//calories
			var calP = document.createElement('p');

			//diet type
			var dietP = document.createElement('p');

			//health labels
			var healthP = document.createElement('p');

			//ingredients container
			var ingredientsCont = document.createElement('div');

			//ingredients inner container
			var ingredientsInner = document.createElement('div');

			//name
			var ingredientsTitle = document.createElement('p');

			//drop button
			var ingredientsDrop = document.createElement('button');

			ingredientsTitle.addEventListener('click', function () {
				item.recipe.ingredientLines.forEach(function (ingredient) {
					//list ingredients
					var ingredientP = document.createElement('p');
					ingredientP.innerHTML = ingredient;
					ingredientsCont.appendChild(ingredientP);

					ingredientsDrop.innerHTML = '&#9650;';

					ingredientsDrop.addEventListener('click', function () {
						//close container
						ingredientP.style.display = 'none';
						ingredientsDrop.innerHTML = '&#9660;';
					});
				});
			});

			//add content.
			imgCont.src = thumbnail;

			var linkTitle = document.createTextNode(title);

			link.href = url;

			calP.innerHTML = 'Calories: ' + Math.round(item.recipe.calories);

			dietP.innerHTML = 'Diet Labels: ' + item.recipe.dietLabels;

			healthP.innerHTML = 'Health Labels: ' + item.recipe.healthLabels;

			ingredientsTitle.innerHTML = 'Ingredients ';

			ingredientsDrop.innerHTML = '&#9660;';

			//append everything
			results.appendChild(liCont);
			liCont.appendChild(innerDiv);

			innerDiv.appendChild(link);
			link.appendChild(linkTitle);

			innerDiv.appendChild(calP);
			innerDiv.appendChild(dietP);
			innerDiv.appendChild(healthP);
			innerDiv.appendChild(ingredientsCont);
			ingredientsCont.appendChild(ingredientsInner);
			ingredientsInner.appendChild(ingredientsTitle);
			ingredientsInner.appendChild(ingredientsDrop);

			liCont.appendChild(imgCont);
		});
	};

	return {
		searchEdamam: searchEdamam
	};
}();
//# sourceMappingURL=EdamamModule.js.map
