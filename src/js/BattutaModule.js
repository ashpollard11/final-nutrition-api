var BattutaModule = (function() {

	/*Notes
	when this api receives the foods from the usda,
	we need to determine how we are going to filter them.
	do the recipes need to include */

	let calories = document.querySelector('#calories');

	let countryArray = [];

	const searchBattuta = function () {
		console.log('searchBattuta()')

		const API_KEY = '69438fea711a209a0b68c1cef72edb9a';
		let url = 'http://circuslabs.net/proxies/battuta/';
		

		axios.get(url, {
			params: {
				'key': API_KEY,
				'_ep': '/country/all/'
				// 'country': term.value
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
		searchBattuta: searchBattuta,
		countryArray: countryArray
	}

})();