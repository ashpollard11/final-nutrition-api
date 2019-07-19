var RestCountriesModule = (function() {

	/*Notes
	when this api receives the foods from the usda,
	we need to determine how we are going to filter them.
	do the recipes need to include */

	let calories = document.querySelector('#calories');

	let countryArray = [];

	const searchRestCountries = function () {
		console.log('searchRestCountries()')

		const API_KEY = '69438fea711a209a0b68c1cef72edb9a';
		let url = 'https://restcountries.eu/rest/v2/all';
		

		axios.get(url, {
			params: {
				//'key': API_KEY,
				//'_ep': '/country/all/'
			}
		})
		.then(function (results) {
			console.log(results.data);
			results.data.forEach((country) => {
				if (countryArray.includes(country.name)) {
					null
				} else {
					countryArray.push(country.name);
				}
				
			})
			console.log(countryArray);

		})


	}

	return {
		searchRestCountries: searchRestCountries,
		countryArray: countryArray
	}

})();