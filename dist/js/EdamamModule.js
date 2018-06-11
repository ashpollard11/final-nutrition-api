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
	var form = document.querySelector('.search-form');

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
				'q': country.value,
				'app_id': API_ID,
				'app_key': API_KEY,
				'calories': cal.value
			}
		}).then(function (results) {
			console.log(results);
			displayRecipes(results.data.hits);
		});
	};

	var displayRecipes = function displayRecipes(recipeArray) {

		recipeArray.forEach(function (item) {
			console.log(item.recipe);

			// if (item.recipe.calories <= calories) {

			//first, we make a container = li.
			//container holding all the data
			var liCont = document.createElement('li');

			//second, we make an article to hold the recipe info.
			//this will be useful for styling/flexibility.
			//it will be appended to the liCont.
			var innerArticle = document.createElement('article');

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
			var ingredientsSection = document.createElement('section');

			//ingredients inner container
			var ingredientsInner = document.createElement('div');

			//name
			var ingredientsTitle = document.createElement('h4');

			//drop button
			var ingredientsDrop = document.createElement('button');

			//add content.
			imgCont.src = thumbnail;

			var linkTitle = document.createTextNode(title);

			link.href = url;

			calP.innerHTML = 'Calories: ' + Math.round(item.recipe.calories / item.recipe.yield);

			dietP.innerHTML = 'Diet Labels: ' + item.recipe.dietLabels;

			healthP.innerHTML = 'Health Labels: ' + item.recipe.healthLabels;

			ingredientsTitle.innerHTML = 'Ingredients ';

			ingredientsDrop.innerHTML = '&#9660;';

			//append everything
			results.appendChild(liCont);
			liCont.appendChild(innerArticle);

			innerArticle.appendChild(link);
			link.appendChild(linkTitle);

			innerArticle.appendChild(calP);
			innerArticle.appendChild(dietP);
			innerArticle.appendChild(healthP);
			innerArticle.appendChild(ingredientsSection);
			ingredientsSection.appendChild(ingredientsInner);
			ingredientsInner.appendChild(ingredientsTitle);
			ingredientsInner.appendChild(ingredientsDrop);

			liCont.appendChild(imgCont);

			item.recipe.ingredientLines.forEach(function (ingredient) {
				//list ingredients
				var ingredientP = document.createElement('p');
				ingredientP.innerHTML = ingredient;
				ingredientsSection.appendChild(ingredientP);

				//listen for open or closed container
				ingredientsDrop.addEventListener('click', function () {
					ingredientP.classList.toggle('is-open');
					if (ingredientP.classList.contains('is-open')) {
						ingredientsDrop.innerHTML = '&#9650;';
					} else {
						ingredientsDrop.innerHTML = '&#9660;';
					}
				});
			});
			// } else {
			// 	null
			// }
		});
	};

	return {
		searchEdamam: searchEdamam
	};
}();
//# sourceMappingURL=EdamamModule.js.map
