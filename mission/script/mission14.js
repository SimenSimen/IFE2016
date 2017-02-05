var aqiData = [
["北京", 90],
["上海", 50],
["福州", 10],
["广州", 50],
["成都", 90],
["西安", 100]
];

(function () {
	var lists = [];
	for (var i = 0; i < aqiData.length; i++) {
		if (aqiData[i][1] > 60) {
			lists.push(aqiData[i]);
		}
	}
	lists.sort(function(a,b){return b[1]-a[1];});
	for (var i = 0; i < lists.length; i++) {
		var li = document.createElement("li");
		var textNode = document.createTextNode("第"+(i+1)+"名是: "+lists[i][0]+"空汙數值為: "+lists[i][1]);
		var ul = document.getElementById("aqi-list");
		li.appendChild(textNode);
		ul.appendChild(li);
	}


})();