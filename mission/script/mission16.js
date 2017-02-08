/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById('aqi-city-input').value.trim();
	var aqi = document.getElementById('aqi-value-input').value.trim();
	if (!city.match(/^[a-zA-z\u4e00-\u9fff]+\s?([a-zA-z]+)?$/)) {
		// statement
		alert("須為中英文字")
		return;
	}
	
	 if(!aqi.match(/^\d+$/)) {
        alert("須為整數")
        return;
    }
    aqiData[city] = aqi;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById('aqi-table');
	table.innerHTML ="<tr><td>城市</td><td>空氣質量</td><td>操作</td></tr>";
	for (city in aqiData) {
		var tr = document.createElement('tr');
		tr.innerHTML = '<td>'+city+'</td>'+'<td>'+aqiData[city]+'</td><td><button>删除</button></td>'
		table.appendChild(tr);
	}
}
	
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  // do sth.
  var table = document.getElementById('aqi-table');
  var city = this.parentNode.parentNode.children[0].innerHTML;
  delete aqiData[city] ; 
  renderAqiList();
  for (var i = 1; i < table.children.length; i++) {
				(function(n){table.children[n].children[2].children[0].onclick = delBtnHandle;})(i);
		}	
}

function init() {
  window.onload = function(){
	  var btn = document.getElementById('add-btn');
	  btn.onclick = function(){
	  	addBtnHandle();
	  	var table = document.getElementById('aqi-table');
		for (var i = 1; i < table.children.length; i++) {
				(function(n){table.children[n].children[2].children[0].onclick = delBtnHandle;})(i);
		}	
	}
  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	}
}
init();