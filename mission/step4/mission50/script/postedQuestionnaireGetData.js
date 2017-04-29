(()=>{
	function init () {
		var box_number = 0;
		function getQuestionnaireData () {
			if (localStorage.getItem('dataPage')) {
				var qn = JSON.parse(localStorage.getItem('dataPage'));
				return qn ;
			}
			else {
				alert('請點擊查看數據');

				location.href = 'index.html';
			}
		}
		function createDataBox () {
			var parent = document.getElementsByClassName('questionnaireWrapper')[0];
			var div = document.createElement('div');
			var canvas = document.createElement('div');
			div.className = 'dataBox';
			canvas.id = 'dataBoxContent-' + box_number;
			div.appendChild(canvas);
			parent.appendChild(div);
			box_number++;
		}
		function pieChart (data , title , i) {
			var dataPoints = [];
			for ( option in data) {
				var obj = {}
				obj.y = data[option];
				obj.legendText = option;
				obj.label = option;
				dataPoints.push(obj);
			}
			var chart = new CanvasJS.Chart('dataBoxContent-' + i,
			{
				title:{
				text: 'Q' + (i+1) + ' ' + title ,
				fontSize: 20
			},
			height : 250 ,
			animationEnabled: true,
			legend:{
				verticalAlign: 'center',
				horizontalAlign: 'left',
				fontSize: 15,
				fontFamily: 'Helvetica'        
			},
			theme: 'theme2',
			data: [
				{        
					type: 'pie',       
					indexLabelFontFamily: 'Garamond',       
					indexLabelFontSize: 15,
					indexLabel: '{label} {y}%',
					startAngle:-20,      
					showInLegend: true,
					toolTipContent:'{legendText} {y}%',
					dataPoints: dataPoints
				}
			]
			});
			chart.render();
		}
		function columnChart (data , title , i) {
			var dataPoints = [];
			for ( option in data) {
				var obj = {}
				obj.label = option;
				obj.y = data[option];
				dataPoints.push(obj);
			}
			var chart = new CanvasJS.Chart( 'dataBoxContent-' + i ,
			{
				animationEnabled: true,
				theme: 'theme2',
				height : 250 ,
				title:{
					text: 'Q' + (i+1) + ' ' + title ,
					fontSize : 20
				},
				data: [
					{
						type: 'column',
						dataPoints:dataPoints
					}
				]
			});

			chart.render();
		}
		function randerData () {

			var qn = getQuestionnaireData();
			var qns = qn.questions;
			for(var i = 0, length1 = qn.data.length; i < length1; i++){
				createDataBox();
				if(qns[i].type == 'radio' || qns[i].type == 'textarea') {	
					pieChart(qn.data[i] , qns[i].question , i); 
				}
				else
					columnChart(qn.data[i] , qns[i].question , i);
			}
		}

		randerData();
	}
	window.addEventListener('load', init);
	window.addEventListener('unload' , ()=>{
		localStorage.removeItem('dataPage');
	});
})();