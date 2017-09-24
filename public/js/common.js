/*
 * data:2017/07/24
 * name:整个项目的公共方法
 * author:孙帅
 * 
 * */

/*
 * 获取页面dom节点
 * param : n  要查找的dom节点的id
 * */
function g(id){
	return document.getElementById(id);
}


// 过渡优化
function gEq(_this){
	return _this.children().eq(1);
}

//jquery ajax get方式公共方法
function getAjax(url,callback){
	$.ajax({
		type:"get",
		url: url,
		dataType:'jsonp',
		jsonp:'callback',
		success:callback
	});
}

/******************************
 * date:2017/08/10
 * name:接收参数，返回不同的产品信息
 * param : 
 */
function getParamsAjax(url,pid,callback){
	$.ajax({
		type:"get",
		url: url,
		data:'cc='+pid,
		dataType:'jsonp',
		jsonp:'callback',
		success:callback
	});
}


/******************************
 * date:2017/08/10
 * name:购物车计算单个商品总价
 * param : 
 */
function cartFnJsonp(url,n,callback){
	$.ajax({
		type:"get",
		url: url,
		data:'cart='+ n,
		dataType:'jsonp',
		jsonp:'callback',
		success:callback
	});
}
/******************************
 * date:2017/08/15
 * name:购物车计算选中商品的总数量和总价的接口
 * param : 
 */
function cartGoodsFnJsonp(url,n,callback){
	$.ajax({
		type:"get",
		url: url,
		data:'goods='+ n,
		dataType:'jsonp',
		jsonp:'callback',
		success:callback
	});
}

/******************************
 * date:2017/08/10
 * name:获取url参数的方法
 * param : url : http://localhost:8080/goodsDetail.html?pid=23548672&page=2
 * return : {pid:23548672,page:2} || undefined
 */
function getUrlParams(url){
	if(!url) return;
	if(url.indexOf('?') !== -1){
		var n = url.indexOf('?');
		var p = url.substring(n+1);
	}
	var arr = p.split('&');
	var obj = {};
	
	for(var i=0;i<arr.length;i++){
//		if(arr[i].indexOf(search) !== -1){
//			return arr[i].split('=')[1];
			obj[arr[i].split('=')[0]] = Number(arr[i].split('=')[1]);
//		}
	}
	
	return obj || undefined ;
}
/******************************
 * date:2017/08/10
 * name:获取url参数的方法,只能取一个
 * param : url : http://localhost:8080/goodsDetail.html?pid=23548672
 * return : 23548672 || undefined
 */
function getPid(url,s){
	if(url.indexOf(s) !== -1){
		var n = url.indexOf(s);
		var p = url.substring(n + s.length + 1);
	}
	return p || undefined;
}