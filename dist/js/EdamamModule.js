'use strict';

var EdamamModule = function () {

	var term = document.querySelector('#calories');

	var search = document.querySelector('#search');

	search.addEventListener('click', function (e) {
		var searchTerm = term.value;
		searchEdamam(searchTerm);
	});

	var searchEdamam = function searchEdamam(term) {
		console.log('searchEdamam()', term);

		var API_ID = '7225e88e';
		var API_KEY = '0b61fdd62618cc0846b866672077a6ea';
		var url = 'https://api.edamam.com/search';

		axios.get(url, {
			params: {
				'app_id': API_ID,
				'app_key': API_KEY,
				'_ep': 'search',
				'q': term
			}
		}).then(function (results) {
			console.log(results);
		});
	};
}();
//# sourceMappingURL=EdamamModule.js.map
