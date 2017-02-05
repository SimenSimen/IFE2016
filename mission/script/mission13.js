button.onclick = function () {
	var userInput = document.getElementById("aqi-input").value;
	var button = document.getElementById("button");
	document.getElementById("aqi-display").innerHTML = userInput;
}