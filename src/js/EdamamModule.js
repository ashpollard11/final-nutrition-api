var EdamamModule = (function() {
	
	//use the country to search countries
	let country = document.querySelector('#country')
	//use the calories to search with maximum calories
	let calories = document.querySelector('#calories');

	//search button
	const search = document.querySelector('#search');

	//where results go
	let results = document.querySelector('#results');

	//form
	const form = document.querySelector('#search-form');

	//on click of the search button, we loop through the
	//checkboxes to see if there are any checked. If there
	//are, we'll call the api to make a query search for each check
	search.addEventListener('click', function(e) {
		results.innerHTML = '';
		searchEdamam(country, calories);
		BattutaModule.searchBattuta();
		country.value = '';
		calories.value = '';
	});

	const searchEdamam = (country, cal) => {

		console.log('searchEdamam()', country.value, cal.value)

		const API_ID = '7225e88e';
		const API_KEY = '0b61fdd62618cc0846b866672077a6ea';
		let url = 'https://api.edamam.com/search';

		axios.get(url, {
			params: {
				'app_id': API_ID,
				'app_key': API_KEY,
				'q': country.value,
				'calories': "0-" + cal.value
			}
		})
		.then(function (results) {
			console.log(results)
			displayRecipes(results.data.hits);

		})
	}

	const displayRecipes = (recipeArray) => {

		recipeArray.forEach((item) => {
			console.log(item.recipe);

			//first, we make a container = li.
			//container holding all the data
			const liCont = document.createElement('li');

			//second, we make a div to hold the recipe info.
			//this will be useful for styling/flexibility.
			//it will be appended to the liCont.
			const innerDiv = document.createElement('div');

			//then the image, with a fallback.
			//if there is an image, include it
			let thumbnail = "https://pbs.twimg.com/profile_images/571009371593666560/H8BnOWbx.jpeg";
			if (item.recipe.image) {
				thumbnail = item.recipe.image;
			}

			//img. container of the thumbnail
			const imgCont = document.createElement('img');
			//name
			const title = item.recipe.label;

			//the link itself
			const url = item.recipe.url;

			//the a tag
			const link = document.createElement('a');

			//calories
			const calP = document.createElement('p');

			//diet type
			const dietP = document.createElement('p');

			//health labels
			const healthP = document.createElement('p');

			//ingredients container
			const ingredientsCont = document.createElement('div');

			//ingredients inner container
			const ingredientsInner = document.createElement('div');

			//name
			const ingredientsTitle = document.createElement('p');

			//drop button
			const ingredientsDrop = document.createElement('button');

			ingredientsTitle.addEventListener('click', function() {
				item.recipe.ingredientLines.forEach((ingredient) => {
					//list ingredients
					const ingredientP = document.createElement('p');
					ingredientP.innerHTML = ingredient;
					ingredientsCont.appendChild(ingredientP);

					ingredientsDrop.innerHTML = '&#9650;';

					ingredientsDrop.addEventListener('click', function() {
						//close container
						ingredientP.style.display = 'none';
						ingredientsDrop.innerHTML = '&#9660;';
					})
				})
			})

			//add content.
			imgCont.src = thumbnail;

			const linkTitle = document.createTextNode(title);

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
		}) 
	}

	return {
		searchEdamam: searchEdamam
	}

})();