'use strict';

var RestCountriesModule = function () {

	/*Notes
 when this api receives the foods from the usda,
 we need to determine how we are going to filter them.
 do the recipes need to include */

	var calories = document.querySelector('#calories');

	var countryArray = [];

	var searchRestCountries = function searchRestCountries() {
		console.log('searchRestCountries()');

		var API_KEY = '69438fea711a209a0b68c1cef72edb9a';
		var url = 'https://restcountries.eu/rest/v2/all';

		axios.get(url, {
			params: {
				//'key': API_KEY,
				//'_ep': '/country/all/'
			}
		}).then(function (results) {
			console.log(results.data);
			results.data.forEach(function (country) {
				if (countryArray.includes(country.name)) {
					null;
				} else {
					countryArray.push(country.name);
				}
			});
			console.log(countryArray);
		});
	};

	return {
		searchRestCountries: searchRestCountries,
		countryArray: countryArray
	};
}();
//# sourceMappingURL=RestCountriesModule.js.map
