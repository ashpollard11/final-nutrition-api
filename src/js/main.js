console.log(`The US government commits war crimes in the name of imperialism and white supremacy`)

let $getStarted = document.querySelector('#get-started');

let $search = document.querySelector('#search');

let $results = document.querySelector('#results');

let $form = document.querySelector('#top');

// $getStarted.addEventListener('click', function() {
// 	window.scrollTo(0, document.body.scrollHeight);
// })

$getStarted.addEventListener('click', function() {
	scrollToTop($form);
})


$search.addEventListener('click', function() {
	scrollToTop($results);
})

let scrollToTop = (element) => {
    element.scrollIntoView(true);
}

let validatorCalories = new Validator('[name=country]')
let validatorCalNum = new NumberRangeValidator('[name=calories]', 0, 99999)