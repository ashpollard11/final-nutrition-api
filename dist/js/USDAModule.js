'use strict';

var USDAModule = function () {

	var term = document.querySelector('#term');

	var search = document.querySelector('#search');

	search.addEventListener('click', function (e) {
		var searchTerm = term.value;
		searchUSDA(searchTerm);
	});

	var searchUSDA = function searchUSDA(term) {
		console.log('searchUSDA()', term);

		var API_KEY = 'r2bvhj9kL6I2OWmgp13rWCJ4NYD0FGaf7YckDNE5';
		var url = 'https://api.nal.usda.gov/ndb/list?format=json';

		axios.get(url, {
			params: {
				'key': API_KEY,
				// '_ep': search,
				'lt': 'f',
				'sort': 'n'
			}
		}).then(function (results) {
			console.log(results);
		});
	};
}();
//# sourceMappingURL=USDAModule.js.map
