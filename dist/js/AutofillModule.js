"use strict";

var AutoFillModule = function () {

	var country = document.querySelector("[name=\"country\"]");
	var suggestions = document.querySelector(".suggestions");
	var inputValue = country.value;

	window.addEventListener('load', function (e) {
		BattutaModule.searchBattuta();
	});

	//on the release of a key, we add a value to the input field
	country.addEventListener("keyup", function (e) {
		//the inner html in the div(list container) is empty
		suggestions.innerHTML = '';
		//e.currentTarget is the state input's value. The value is lower case
		var inputValue = e.currentTarget.value.toLowerCase();
		//if the input value is empty, stop the function for now
		if (inputValue.length <= 0) {
			return;
		}

		BattutaModule.countryArray.forEach(function (item) {
			//return this string/state, make it lower case to match the input value,
			//but check if it includes the input value
			return item.toLowerCase().includes(inputValue)
			//if it does include the input value, call the createButton function. if not, do nothing
			? createButton(item) : null;
		});
	});

	//make strings into buttons
	var createButton = function createButton(string) {
		var button = document.createElement("button");
		button.innerHTML = string;
		button.addEventListener("click", function (e) {
			e.preventDefault();
			country.value = string;
			suggestions.innerHTML = '';
		});
		//this adds the button to the dom
		suggestions.appendChild(button);
	};
}();
//# sourceMappingURL=AutofillModule.js.map
