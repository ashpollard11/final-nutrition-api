'use strict';

console.log('The US government commits war crimes in the name of imperialism and white supremacy');

var $getStarted = document.querySelector('#get-started');

var $search = document.querySelector('#search');

var $results = document.querySelector('#results');

var $form = document.querySelector('#top');

// $getStarted.addEventListener('click', function() {
// 	window.scrollTo(0, document.body.scrollHeight);
// })

$getStarted.addEventListener('click', function () {
	scrollToTop($form);
});

$search.addEventListener('click', function () {
	scrollToTop($results);
});

var scrollToTop = function scrollToTop(element) {
	element.scrollIntoView(true);
};

var validatorCalories = new Validator('[name=country]');
var validatorCalNum = new NumberRangeValidator('[name=calories]', 0, 99999);
//# sourceMappingURL=main.js.map
