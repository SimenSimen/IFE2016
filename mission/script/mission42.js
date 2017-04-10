var c_ = (className)=>{return document.getElementsByClassName(className);};
function Calendar (id , p) {
	this.id = id ;
	this.elements = {
		dateobj : new Date() ,
		tableCells : c_('daysdata' + id),
		next : c_('arrowright')[id],
		previous : c_('arrowleft')[id], 
		table : c_('tg')[id],
		showdate : c_('showdate')[id],
		calendarDiv : c_('calendar')[id],
		monthselect : c_('monthSelect')[id],
		yearselect : c_('yearSelect')[id],
		okBtn : c_('cBtn')[id*2], 
		cancelBtn : c_('cBtn')[id*2+1],
		checkedDate : [],
	};
	this.fullDate;
	this.period = p ? true : false;
	this.elements.dateobj.setDate(1);
	this.year = this.elements.dateobj.getFullYear();
	this.month = this.elements.dateobj.getMonth();
	this.firstDay = this.elements.dateobj.getDay();
}
Calendar.prototype.setCalender = function() {
	this.year = this.elements.dateobj.getFullYear();
	this.month = this.elements.dateobj.getMonth();
	this.firstDay = this.elements.dateobj.getDay(); 
};
Calendar.prototype.resetEffectedCells = function(cells) {
	for (var i = 0; i < cells.length; i++) {
		cells[i].className = 'daysdata' + this.id;
	}
}
		// check the day is on holiday
Calendar.prototype.checkHoliday	= function (sun , sat) {
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
Calendar.prototype.checkNotInMonth = function (pre , next) {
	for (var i = 0; i < pre.length; i++) {
		pre[i].className += ' disable';
	}
	for (i = 0; i < next.length; i++) {
		next[i].className += ' disable';
	}
}
Calendar.prototype.randerHeader = function (month , year) {
	this.elements.yearselect.value = year;
	this.elements.monthselect.options[month].selected = true;
}
Calendar.prototype.randerCalendar = function () {
	var days = this.getDates();
	var l = days.preMonth.length + days.thisMonth.length;
	var pre =[] , next = [];
	this.resetEffectedCells(this.elements.tableCells);
 	for (var i = 0; i < days.preMonth.length; i++) {
 		pre.push(this.elements.tableCells[i]);
 		this.elements.tableCells[i].innerHTML = days.preMonth[i];
 	}
 	for (i = 0; i < days.thisMonth.length; i++) {
 		this.elements.tableCells[i + days.preMonth.length].innerHTML = days.thisMonth[i];
 	}
 	for (i = 0; i < days.nextMonth.length; i++) {
 		next.push(this.elements.tableCells[i + l]);
 		this.elements.tableCells[i + l].innerHTML = days.nextMonth[i];
 	}
 	var sun =[this.elements.tableCells[0],this.elements.tableCells[7],this.elements.tableCells[14],this.elements.tableCells[21],this.elements.tableCells[28],this.elements.tableCells[35]];
 	var sat = [this.elements.tableCells[6],this.elements.tableCells[13],this.elements.tableCells[20],this.elements.tableCells[27],this.elements.tableCells[34]];
 	this.randerHeader(this.month , this.year)
 	this.checkHoliday(sun ,sat);
 	this.checkNotInMonth(pre , next);
}
Calendar.prototype.getNextMonth = function () {
	this.elements.dateobj.setMonth(this.month + 1, 1);
	this.setCalender();
	this.randerCalendar();
}
Calendar.prototype.getPreviousMonth = function () {
	this.elements.dateobj.setMonth(this.month - 1, 1);
	this.setCalender();
	this.randerCalendar();
}
Calendar.prototype.getDates = function () {
	var thisMonth = [];
	var preMonth = [];
	var nextMonth = [];
	for (var i = 0; i < this.firstDay; i++) {
		this.elements.dateobj.setDate(i*-1);
		preMonth.unshift(this.elements.dateobj.getDate());
		this.elements.dateobj.setMonth(this.month, 1);		
	}
	var date = 1;
	while (thisMonth.length + preMonth.length + nextMonth.length < 42) {
		this.elements.dateobj.setDate(date)
		if(this.elements.dateobj.getMonth() != this.month){
			nextMonth.push(this.elements.dateobj.getDate());
			this.elements.dateobj.setFullYear(this.year , this.month);
		}
		else {
			thisMonth.push(this.elements.dateobj.getDate());
		}
		date++;		
	}
	return {thisMonth : thisMonth , preMonth : preMonth , nextMonth : nextMonth};
}
Calendar.prototype.checkHover = function () {
	for (var i = 0; i < this.elements.checkedDate.length; i++) {
		var el = this.elements.checkedDate[i];
		this.resetDateHover(el.dayHtmlObj);
		if (el.year == this.year && el.month == this.month)
			this.dateHover(el.dayHtmlObj);
	}
}
Calendar.prototype.searchYear = function () {
	this.elements.dateobj.setFullYear(this.elements.yearselect.value , this.elements.monthselect.selectedIndex ,1);
	this.setCalender();
	this.checkHover();
	this.randerCalendar();
}
Calendar.prototype.dateHover = function (e) {
	if(e.target.className == ('daysdata' + this.id) || e.target.className == ('daysdata' + this.id ) +' holidays'){
		e.target.style.background = '#CE0000'; 
		e.target.style.color = '#fff';
	}
}
Calendar.prototype.resetDateHover = function (e) {
	if(e.target.className == ('daysdata' + this.id) || e.target.className == ('daysdata' + this.id ) +' holidays')
		e.target.style = ''; 
}
Calendar.prototype.tableGetClick = function (e) {
	if (e.target.className == 'arrowleft') {
		this.getPreviousMonth();
		this.checkHover();
	}
	else if (e.target.className == 'arrowright') {
		this.getNextMonth();
		this.checkHover();
	}
	else if (e.target.className == ('daysdata' + this.id) || e.target.className == ('daysdata' + this.id ) +' holidays') {
		if (this.period == true) {
			var theday = {dayHtmlObj : e , year : this.year , month : this.month};
			var arr = [];
			if(this.elements.checkedDate.length == 2) {
				this.resetDateHover(this.elements.checkedDate[0].dayHtmlObj);
				this.resetDateHover(this.elements.checkedDate[1].dayHtmlObj);
				this.elements.checkedDate = [];
			}
			this.elements.checkedDate.push(theday);
			this.elements.checkedDate.sort((a,b)=>{return a.dayHtmlObj.target.innerHTML - b.dayHtmlObj.target.innerHTML;});
			this.elements.checkedDate.sort((a,b)=>{return a.month - b.month;});
			this.elements.checkedDate.sort((a,b)=>{return a.year - b.year;});
			for (var date = 0; date < this.elements.checkedDate.length; date++) {
				var el = this.elements.checkedDate[date];
				if (el.year == this.year && el.month == this.month)
					this.dateHover(el.dayHtmlObj);
				arr.push(el.year + ' / ' + (el.month+1) + ' / ' + el.dayHtmlObj.target.innerHTML);
			}
			this.fullDate = arr.join(' - ');
		}
		else {
			this.fullDate = this.year + ' / ' + (this.month+1) + ' / ' + e.target.innerHTML;
			var theday = {dayHtmlObj : e , year : this.year , month : this.month};
			if(this.elements.checkedDate[0])
				this.resetDateHover(this.elements.checkedDate[0].dayHtmlObj);
			this.dateHover(theday.dayHtmlObj);
			this.elements.checkedDate = [];
			this.elements.checkedDate.push(theday);
		}	
	}
}
Calendar.prototype.showCalender = function (e) {
	this.elements.calendarDiv.style = null;
};
Calendar.prototype.hideCalender = function (e) {
	this.elements.calendarDiv.style = 'display : none';
}
Calendar.prototype.getSelectDate = function () {
	this.elements.showdate.value = this.fullDate;
}
Calendar.prototype.contactDates = function (date1 , date2) {
	if (date1.year == date2.year && date1.month == date2.month) {

	}
	else {
		
	}
}
window.onload = () => {
	var calendar1 = new Calendar(0);
	calendar1.randerCalendar();
	var calendar2 = new Calendar(1 , true);
	calendar2.randerCalendar();
	window.addEventListener('click' , (e)=>{
		if (e.target.tagName == 'HTML') {
		calendar1.elements.calendarDiv.style = 'display : none';
		calendar2.elements.calendarDiv.style = 'display : none';
		}
	});
	calendar1.elements.table.addEventListener('click' , (e)=>{
		calendar1.tableGetClick.call(calendar1, e);
	});
	calendar1.elements.showdate.addEventListener('click', (e)=>{
		calendar1.showCalender.call(calendar1, e);
	});
	calendar1.elements.yearselect.addEventListener('change', (e)=>{
		calendar1.searchYear.call(calendar1, e);
	});
	calendar1.elements.monthselect.addEventListener('change', (e)=>{
		calendar1.searchYear.call(calendar1, e);
	});
	calendar1.elements.okBtn.addEventListener('click', (e)=>{
		calendar1.getSelectDate();
		calendar1.hideCalender.call(calendar1, e);
	});
	calendar1.elements.cancelBtn.addEventListener('click', (e)=>{
		calendar1.hideCalender.call(calendar1, e);
	});
	calendar2.elements.table.addEventListener('click' , (e)=>{
		calendar2.tableGetClick.call(calendar2, e);
	});
	calendar2.elements.showdate.addEventListener('click', (e)=>{
		calendar2.showCalender.call(calendar2, e);
	});
	calendar2.elements.yearselect.addEventListener('change', (e)=>{
		calendar2.searchYear.call(calendar2, e);
	});
	calendar2.elements.monthselect.addEventListener('change', (e)=>{
		calendar2.searchYear.call(calendar2, e);
	});
	calendar2.elements.okBtn.addEventListener('click', (e)=>{
		calendar2.getSelectDate();
		calendar2.hideCalender.call(calendar2, e);
	});
	calendar2.elements.cancelBtn.addEventListener('click', (e)=>{
		calendar2.hideCalender.call(calendar2, e);
	});
};
