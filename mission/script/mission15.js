/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
  var data = []
  var source = document.getElementById("source");
  var li = source.children;
  for (var i = 0; i < li.length; i++) {
    data[i] = [];
    data[i].push(li[i].innerHTML.slice(0,2));
    data[i].push(li[i].childNodes[1].innerHTML);
}
  /*
  data = [
    ["北京", 90],
    ["北京", 90]
    ……
  ]
  */
  return data;
}
/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {
  data.sort(function(a,b){
    return a[1]-b[1];
  });
  return data;
}
/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {
  var ul = document.getElementById("resort");
  var score = ["一","二","三","四","五","六","七","八","九","十"];
  for (var i = 0; i < data.length; i++) {
    var li = document.createElement("li");
    li.innerHTML = "第"+score[i]+"名:"+data[i][0]+"空氣質量:<b>"+data[i][1]+"</b>";
    ul.appendChild(li);
  }
}

function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}


function init() {

  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数
  var btn = document.getElementById("sort-btn");
  btn.onclick = btnHandle;
}

init();
