var c_ = (className)=>{return document.getElementsByClassName(className);};
var id_ = (id)=>{return document.getElementById(id);};
(()=>{
	function init () {
		var d = new Date();
		var title = id_('headertext');
		var tableCells = c_('daysdata');
		var next = c_('arrowright')[0];
		var previous = c_('arrowleft')[0];
		var table = c_('tg')[0];
		var input = id_('showdate');
		var calendarDiv = c_('calendar')[0];
		var checkedDate = [];
		d.setDate(1);
		var calendar = {
			year : d.getFullYear(),
			month : d.getMonth() ,
			firstDay : d.getDay()
		}
		function setCalender () {
			calendar.year = d.getFullYear();
			calendar.month = d.getMonth();
			calendar.firstDay = d.getDay();
		}
		
		function resetEffectedCells (cells) {
			for (var i = 0; i < cells.length; i++) {
				cells[i].className = 'daysdata';
			}
		}
		// check the day is on holiday
		function checkHoliday (sun , sat) {
			for (var day = 0; day < sun.length; day++) {
				if( day == 5 && sun[day].innerHTML < 8)
					continue;
				else if (day == 0 && sun[day].innerHTML != 1)
					continue;
				sun[day].className += ' holidays';
			}
			for (day = 0; day < sat.length; day++) {
				if( day == 4 && sat[day].innerHTML < 7)
					continue;
				sat[day].className += ' holidays';
			}
		}
		//check the date is not in this month
		function checkNotInMonth (pre , next) {
			for (var i = 0; i < pre.length; i++) {
				pre[i].className += ' disable';
			}
			for (i = 0; i < next.length; i++) {
				next[i].className += ' disable';
			}
		}
		function randerCalendar () {
		 	title.innerHTML = calendar.year + ' 年 ' + (calendar.month+1) + ' 月 ';
			var days = getDates();
			var l = days.preMonth.length + days.thisMonth.length;
			var pre =[] , next = [];
			resetEffectedCells(tableCells);
		 	for (var i = 0; i < days.preMonth.length; i++) {
		 		pre.push(tableCells[i]);
		 		tableCells[i].innerHTML = days.preMonth[i];
		 	}
		 	for (i = 0; i < days.thisMonth.length; i++) {
		 		tableCells[i + days.preMonth.length].innerHTML = days.thisMonth[i];
		 	}
		 	for (i = 0; i < days.nextMonth.length; i++) {
		 		next.push(tableCells[i + l]);
		 		tableCells[i + l].innerHTML = days.nextMonth[i];
		 	}
		 	var sun =[tableCells[0],tableCells[7],tableCells[14],tableCells[21],tableCells[28],tableCells[35]];
		 	var sat = [tableCells[6],tableCells[13],tableCells[20],tableCells[27],tableCells[34]];
		 	checkHoliday(sun ,sat);
		 	checkNotInMonth(pre , next);
		}
		function getNextMonth () {
			d.setMonth(calendar.month + 1, 1);
			setCalender();
			randerCalendar();
		}
		function getPreviousMonth () {
			d.setMonth(calendar.month - 1, 1);
			setCalender();
			randerCalendar();
		}
		function getDates () {
			var thisMonth = [];
			var preMonth = [];
			var nextMonth = [];
			for (var i = 0; i < calendar.firstDay; i++) {
				d.setDate(i*-1);
				preMonth.unshift(d.getDate());
				d.setMonth(calendar.month, 1);		
			}
			var date = 1;
			while (thisMonth.length + preMonth.length + nextMonth.length < 42) {
				d.setDate(date)
				if(d.getMonth() != calendar.month){
					nextMonth.push(d.getDate());
					d.setFullYear(calendar.year , calendar.month);
				}
				else {
					thisMonth.push(d.getDate());
				}
				date++;		
			}
			return {thisMonth : thisMonth , preMonth : preMonth , nextMonth : nextMonth};
		}
		function dateHover (e) {
			if(e.target.className == 'daysdata' || e.target.className == 'daysdata holidays'){
				e.target.style.background = 'rgb(237,116,25)'; 
				e.target.style.color = '#fff';
			}
		}
		function resetDateHover (e) {
				e.target.style = ''; 
		}
		function checkHover () {
			if (!checkedDate[0]) 
				return;
			var el = checkedDate[0];
			resetDateHover(el.dayHtmlObj);
			if (el.year == calendar.year && el.month == calendar.month)
				dateHover(el.dayHtmlObj);
		}
		function tableGetClick (e) {
			if (e.target.className == 'arrowleft') {
				getPreviousMonth();
				checkHover();
			}
			else if (e.target.className == 'arrowright') {
				getNextMonth();
				checkHover();
			}
			else if (e.target.className == 'daysdata' || e.target.className == 'daysdata holidays') {
				showdate.value = calendar.year + ' / ' + (calendar.month+1) + ' / ' + e.target.innerHTML;
				table.removeEventListener('mouseout', resetDateHover);
				table.removeEventListener('mouseover', dateHover);
				var theday = {dayHtmlObj : e , year : calendar.year , month : calendar.month};
				if(checkedDate[0])
					resetDateHover(checkedDate[0].dayHtmlObj);
				dateHover(theday.dayHtmlObj);
				checkedDate = [];
				checkedDate.push(theday);
				getSelectDate({year: calendar.year , month : calendar.month+1 , day : e.target.innerHTML});
			}
		}
		function showCalender (e) {
			calendarDiv.style = null;
		};
		function hideCalender (e) {
			if (e.target.tagName == 'HTML') {
				calendarDiv.style = 'display : none';
			}
		}
		function getSelectDate (date) {
			var today = new Date();
			var checkeday = new Date( date.year , date.month-1 , date.day , today.getHours()+1);
			if (checkeday - today >= 0) 
				return;
			else
				showdate.value = '請勿選取過去的日子 !';
		}
		randerCalendar();
		table.addEventListener('mouseover', dateHover);
		table.addEventListener('mouseout', resetDateHover);
		table.addEventListener('click' , tableGetClick);
		input.addEventListener('click', showCalender);
		window.addEventListener('click' , hideCalender);
	}
	window.addEventListener('load',init);
})();