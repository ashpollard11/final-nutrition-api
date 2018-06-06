var EdamamModule = (function() {

	let term = document.querySelector('#calories');
	
	const search = document.querySelector('#search');

	search.addEventListener('click', function(e) {
		let searchTerm = term.value;
		searchEdamam(searchTerm);
	})

	const searchEdamam = function (term) {
		console.log('searchEdamam()', term)

		const API_ID = '7225e88e';
		const API_KEY = '0b61fdd62618cc0846b866672077a6ea';
		let url = 'https://api.edamam.com/search';
		

		axios.get(url, {
			params: {
				'app_id': API_ID,
				'app_key': API_KEY,
				'_ep': 'search',
				'q': term
			}
		})
		.then(function (results) {
			console.log(results)
		})

	}

})();