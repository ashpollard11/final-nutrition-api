var EdamamModule = (function() {
	
	//use the country to search countries
	let country = document.querySelector('#country')

	let countryErrorDiv = document.querySelector('#country .error-message')

	//use the calories to search with maximum calories
	let calories = document.querySelector('#calories');

	// let errorDiv = document.querySelector('.error-message')

	//search button
	const search = document.querySelector('#search');

	//where results go
	let results = document.querySelector('#results');

	//form
	const form = document.querySelector('.search-form');

	//loader
	const loader = document.querySelector('.loading-cont');

	//on click of the search button, we loop through the
	//checkboxes to see if there are any checked. If there
	//are, we'll call the api to make a query search for each check
	search.addEventListener('click', function(e) {
		if (country.value !== '' || calories.value !== '') { 
			results.innerHTML = '';
			showLoader();
			searchEdamam(country, calories);
			
			// BattutaModule.searchBattuta();
		}
	});

	const showLoader = () => {
		loader.classList.add('is-loading')
	}

	const hideLoader = () => {
		loader.classList.remove('is-loading')
	}

	const searchEdamam = (country, cal) => {

		console.log('searchEdamam()', country.value, cal.value)

		const API_ID = '7225e88e';
		const API_KEY = '0b61fdd62618cc0846b866672077a6ea';
		let url = 'https://api.edamam.com/search';

		axios.get(url, {
			params: {
				'q': country.value,
				'app_id': API_ID,
				'app_key': API_KEY,
				'calories': cal.value || null
			}
		})

		.then(function (results) {
			console.log(results)
			hideLoader();
			displayRecipes(results.data.hits);

		})
	}

	const displayRecipes = (recipeArray) => {

		recipeArray.forEach((item) => {
			console.log(item.recipe);

			//first, we make a container = li.
			//container holding all the data
			const liCont = document.createElement('li');

			//second, we make an article to hold the recipe info.
			//this will be useful for styling/flexibility.
			//it will be appended to the liCont.
			const innerArticle = document.createElement('article');

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
			const ingredientsSection = document.createElement('section');

			//ingredients inner container
			const ingredientsInner = document.createElement('div');

			//name
			const ingredientsTitle = document.createElement('h4');

			//drop button
			const ingredientsDrop = document.createElement('button');

			//add content.
			imgCont.src = thumbnail;

			const linkTitle = document.createTextNode(title);

			link.href = url;

			calP.innerHTML = 'Calories: ' + Math.round(item.recipe.calories / item.recipe.yield);

			dietP.innerHTML = 'Diet Labels: ' + item.recipe.dietLabels;

			healthP.innerHTML = 'Health Labels: '
			item.recipe.healthLabels.forEach((label) => {
				healthP.innerHTML += label + ', ';
			});

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

			item.recipe.ingredientLines.forEach((ingredient) => {
				//list ingredients
				const ingredientP = document.createElement('p');
				ingredientP.innerHTML = ingredient;
				ingredientsSection.appendChild(ingredientP);

				//listen for open or closed container
				ingredientsDrop.addEventListener('click', function() {
					ingredientP.classList.toggle('is-open');
					if (ingredientP.classList.contains('is-open')) {
						ingredientsDrop.innerHTML = '&#9650;';
					} else {
						ingredientsDrop.innerHTML = '&#9660;';
					}
				})
			})
		}) 
	}

	return {
		searchEdamam: searchEdamam
	}

})();