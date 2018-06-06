var FoodToForkModule = (function() {

	let term = document.querySelector('#term');
	
	const search = document.querySelector('#search');

	search.addEventListener('click', function(e) {
		let searchTerm = term.value;
		searchFTF(searchTerm);
	})

	const searchFTF = function (term) {
		console.log('searchFTF()', term)

		const API_KEY = '88ad166fd02cc537ab6a510338a17c6f';
		let url = 'http://circuslabs.net/proxies/food2fork-proxy/';
		

		axios.get(url, {
			params: {
				'key': API_KEY,
				'_ep': 'search',
				'q': term
			}
		})
		.then(function (results) {
			console.log(results)
		})

	}

})();