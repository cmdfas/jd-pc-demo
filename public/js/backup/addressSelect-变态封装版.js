/******************************
 * date:2017/08/10
 * name:产品详情页-省市县地址选择
 * author:孙帅
 */
function AddressSelect(config){
	for(var i in config){
		this[i] = config[i];
	}
	this.init();
}
AddressSelect.prototype = {
	init:function(){
		var me = this;
		//地址菜单显示隐藏
		me.addressTitle();
		//获取数据生成dom结构,并添加事件
		me.getData();
		//为三个省市区tab标题统一添加事件
		me.tabEvent();
	},
	//地址菜单显示隐藏
	addressTitle : function(){
		var me = this;
		me.addressTitleId.on('click',function(){
			me.addressListId.slideToggle();
		});
	},
	//获取数据生成dom结构并添加事件
	getData : function(){
		var me = this;
		me.addAjaxDomEvent('province');
		me.addAjaxDomEvent('city');
		me.addAjaxDomEvent('area');
	},
	//获取数据生成dom结构   此类中公共方法  param : s  省：province  市:city 区：area 参数其他无效
	addAjaxDomEvent : function(s){
		var me = this;
		getAjax(APILIST[s],function(data){
			me.createDom(data[s],me[s+'Id']);
			me[s+'Event']();
		});
	},
	//根据数据生成dom结构   此类中公共方法
	createDom : function(data,wrap){
		//生成省市区的dom节点
		for(var i=0;i<data.length; i++){
			$('<p/>').html(data[i].name).appendTo(wrap);
		}
	},
	//为省区域子节点添加事件
	provinceEvent : function(){
		var me = this;
		me.addClickEvent('province',function(){
			me.tabB.addClass('yellow').html('请选择').show();
			me.tabC.hide();
			//市 显示  省和区隐藏
			me.provinceId.hide();
			me.cityId.show();
			me.areaId.hide();
		});
	},
	//为市区域子节点添加事件
	cityEvent : function(){
		var me = this;
		me.addClickEvent('city',function(){
			me.tabC.addClass('yellow').html('请选择').show();
			//区 显示  省和市隐藏
			me.provinceId.hide();
			me.cityId.hide();
			me.areaId.show();
		});
	},
	//为区区域子节点添加事件
	areaEvent : function(){
		var me = this;
		me.addClickEvent('area',function(){
			//菜单隐藏
			me.addressListId.slideUp();
		});
	},
	//为省市区tab内容区域子节点添加事件    此类中公共方法  param : s  省：province  市:city 区：area 参数其他无效   callback : 回调
	addClickEvent : function(s,callback){
		var me = this;
			me[s+'Id'].find('p').on('click',function(){
				var html = $(this).html();
				//建立索引关系
				var oo = {
					province : 'tabA',
					city : 'tabB',
					area : 'tabC'
				};
				if(oo[s] === 'tabC'){
					me[oo[s]].html(html);
				}else{
					me[oo[s]].removeClass('yellow').html(html);
				}
				//将选择地址存入数组中
				me.addressPush(html);
				//回调函数
				callback();
			});	
	},
	//操作省市区的数组  并添加至页面中
	addressPush : function(s){
		var me = this;
		var arr = me.arr;
		if(arr.length < 3){
			arr.push(s);
		}else{
			arr.splice(2);
			arr.push(s);
		}
		me.addressDivId.html('');
		for(var i=0; i<arr.length; i++){
			$('<p/>').html(arr[i]).appendTo(me.addressDivId);
		}
	},
	//为三个省市区tab标题统一添加事件
	tabEvent : function(){
		var me = this;
		me.addTabEvent('tabA');
		me.addTabEvent('tabB');
		me.addTabEvent('tabC');
	},
	//省市区tab标题切换方法  此类中公共方法  param : s 要切换的tab标题的id  如：tabA、tabB、tabC  其他参数无效
	addTabEvent : function(s){
		var me = this;
		me[s].on('click',function(){
			//建立索引关系
			var array = [
				{province : 'tabA'},
				{city : 'tabB'},
				{area : 'tabC'}
			];
			for(var i=0; i<array.length; i++){
				for(var j in array[i]){
					if(array[i][j] == s){
						//为点击的tab标题添加’yellow‘类和内容区域显示
						me[j+'Id'].show();
						me[array[i][j]].addClass('yellow');
						//当修改地址时，重新生成省  清空arr数组
						me.arr.splice(i);
					}else{
						//其他tab标题去除'yellow'类，内容区域隐藏
						me[j+'Id'].hide();
						me[array[i][j]].removeClass('yellow');
					}
				}
			}
		});
	}
}
//配置项
var AddressSelectConfig = {
	addressTitleId : $('#addressTitleId'),
	addressListId : $('#addressListId'),
	provinceId : $('#provinceId'),
	cityId : $('#cityId'),
	areaId : $('#areaId'),
	tabA : $('#tabA'),
	tabB : $('#tabB'),
	tabC : $('#tabC'),
	arr : [],
	addressDivId : $('#addressDivId')
};
//初始化地址选择列表
new AddressSelect(AddressSelectConfig);
