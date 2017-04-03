var c_ = (className)=>{ 
	return document.getElementsByClassName(className);
};
(()=>{
	function init () {
		// set data
		var data_ = {
			Mary : [90 , 70 , 100] ,
			John : [80 , 90 , 60] ,
			Simen : [90 , 50 , 80] ,
			Connan : [95 , 60 , 70] ,
			Gary : [99 , 30 , 90] , 
			Gan : [90 , 60 , 50] , 
			Allen : [100 , 30 , 20] , 
			Wolf : [20 , 70 , 90] , 
			Dommie : [98 , 80 , 70] , 
			Sim : [20 , 90 , 60] , 
			Dodo : [50 , 70 , 90] , 
			Duck : [69 , 70 , 80] , 
			Cities : [50 , 90 , 100] , 
			Cindy : [59 , 60 , 100] , 
			Dunky : [40 , 70 , 30] , 
			Fisher : [50 , 50 , 30] , 
			Johnason : [90 , 30 , 30] , 
			Vincent : [58 , 90 , 40] , 
			Dada : [60 , 70 , 90] , 
			Xped : [90 , 100 , 90] , 
			Zed : [70 , 50 , 10] , 
			Albee : [50 , 30 , 90] , 
			Eason : [99 , 50 , 99] , 
			Edison : [80 , 40 , 60] , 
			Ina : [80 , 90 , 30] 
		}
		// get sum of data
		function sum (data) {
			var keys = Object.keys(data);
			for (var i = 0; i < keys.length; i++) {
				var sum = data[keys[i]].reduce((total , num)=>{return total + num});
				data[keys[i]].push(sum);
			}
		};
		// put the data into table
		function randerData (data) {
			var datas = c_('datas');
			var keys = Object.keys(data);
			for (var i = 0; i < keys.length; i++) {
					datas[i].children[0].innerHTML = keys[i];
				for(var j = 1 ; j < datas[i].children.length; j++){
					datas[i].children[j].innerHTML = data[keys[i]][j-1];
				}
			}
		}
		// sortdata ( data , col , direction) return the result
		sum(data_);
		randerData(data_);
	}
	window.addEventListener('load', init);
})();