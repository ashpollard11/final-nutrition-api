'use strict';

var FoodToForkModule = function () {

	var term = document.querySelector('#term');

	var search = document.querySelector('#search');

	search.addEventListener('click', function (e) {
		var searchTerm = term.value;
		searchFTF(searchTerm);
	});

	var searchFTF = function searchFTF(term) {
		console.log('searchFTF()', term);

		var API_KEY = '88ad166fd02cc537ab6a510338a17c6f';
		var url = 'http://circuslabs.net/proxies/food2fork-proxy/';

		axios.get(url, {
			params: {
				'key': API_KEY,
				'_ep': 'search',
				'q': term
			}
		}).then(function (results) {
			console.log(results);
		});
	};
}();
//# sourceMappingURL=FoodToForkModule.js.map
