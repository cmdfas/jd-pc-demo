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
		
		me.getData();
		
//		me.tabTitleEvent();
		me.tabEvent();
	},
	addressTitle : function(){
		var me = this;
		//地址菜单显示隐藏
		me.addressTitleId.on('click',function(){
			
			me.addressListId.slideToggle();
			
			/*if(me.isShow){
				me.addressListId.show();
				me.isShow = false;
			}else{
				me.addressListId.hide();
				me.isShow = true;
			}*/
		});
	},
	getData : function(){
		var me = this;
		getAjax(APILIST.province,function(data){
			console.log(data);
			me.createDom(data.province,me.provinceId);
			me.privinceEvent();
		});
		getAjax(APILIST.city,function(data){
			console.log(data);
			me.createDom(data.city,me.cityId);
			me.cityEvent();
		});
		getAjax(APILIST.area,function(data){
			console.log(data);
			me.createDom(data.area,me.areaId);
			me.areaEvent();
		});
	},
	createDom : function(data,wrap){
		//生成省市区的dom节点
		var m = this;
		for(var i=0;i<data.length; i++){
			$('<p/>').html(data[i].name).appendTo(wrap);
		}
	},
	//孙帅写的方式
	/*
	privinceEvent : function(){
		var me = this;
		me.provinceId.find('p').on('click',function(){
			var province = $(this).html();
			me.tabTitleId.children().eq(0).html(province);
			me.tabTitleId.children().removeClass('yellow').eq(1).addClass('yellow');
			me.provinceId.hide();
			me.cityId.show();
		});
		
		
	},
	cityEvent : function(){
		var me = this;
		
		me.cityId.find('p').on('click',function(){
			var city = $(this).html();
			me.tabTitleId.children().eq(1).html(city);
			me.tabTitleId.children().removeClass('yellow').eq(2).addClass('yellow');
			me.cityId.hide();
			me.areaId.show();
		});
	},
	areaEvent : function(){
		var me = this;
		
		me.areaId.find('p').on('click',function(){
			var province = me.tabTitleId.children().eq(0).html();
			var city = me.tabTitleId.children().eq(1).html();
			var area = $(this).html();
			me.tabTitleId.children().eq(2).html(area);
			
			me.addressTitleId.children().eq(0).html(province);
			me.addressTitleId.children().eq(1).html(city);
			me.addressTitleId.children().eq(2).html(area);
			
			setTimeout(function(){
				me.addressListId.slideUp();
			},1000);

		});
	},
	tabTitleEvent : function(){
		var me = this;
		
		me.tabTitleId.children().eq(0).on('click',function(){
			me.tabTitleId.children().removeClass('yellow');
			$(this).addClass('yellow');
			me.provinceId.show();
			me.cityId.hide();
			me.areaId.hide();
		});
		
		me.tabTitleId.children().eq(1).on('click',function(){
			me.tabTitleId.children().removeClass('yellow');
			$(this).addClass('yellow');
			me.provinceId.hide();
			me.cityId.show();
			me.areaId.hide();
		});
		me.tabTitleId.children().eq(2).on('click',function(){
			me.tabTitleId.children().removeClass('yellow');
			$(this).addClass('yellow');
			me.provinceId.hide();
			me.cityId.hide();
			me.areaId.show();
		});
	}*/
	//loshang
	privinceEvent : function(){
		var me = this;
		
		me.provinceId.find('p').on('click',function(){
			console.log(1)
			var privince = $(this).html();
			me.tabA.removeClass('yellow').html(privince);
			me.tabB.addClass('yellow').html('请选择').show();
			me.tabC.hide();
			me.addressPush(privince);
//			me.arr[0] = privince;
			me.provinceId.hide();
			me.cityId.show();
		})
	},
	cityEvent : function(){
		var me = this;
		me.cityId.find('p').on('click',function(){
			var city = $(this).html();
			me.tabB.removeClass('yellow').html(city);
			me.tabC.addClass('yellow').html('请选择').show();
			me.addressPush(city);
//			me.arr[1] = city;
			me.areaId.show();
			me.cityId.hide();
		})
	},
	areaEvent : function(){
		var me = this;
		me.areaId.find('p').on('click',function(){
			var area = $(this).html();
			me.tabC.html(area);
//			me.arr[2] = area;
			me.addressPush(area);
//			me.addressPush();
			me.addressListId.slideUp();
		})
	},
	addressPush : function(s){
		//操作省市区的数组
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
			$('<span/>').html(arr[i]).appendTo(me.addressDivId);
		}
	},
	tabEvent : function(){
		var me = this;
		me.tabA.on('click',function(){
			me.provinceId.show();
			me.cityId.hide();
			me.areaId.hide();
			
			me.tabA.addClass('yellow');
			me.tabB.removeClass('yellow');
			me.tabC.removeClass('yellow');
			
			//当修改地址时，重新生成省  清空arr数组
			me.arr.splice(0);
		});
		me.tabB.on('click',function(){
			me.provinceId.hide();
			me.cityId.show();
			me.areaId.hide();
			
			me.tabA.removeClass('yellow');
			me.tabB.addClass('yellow');
			me.tabC.removeClass('yellow');
			
			//当修改地址时，重新生成省  清空arr数组
			me.arr.splice(1);
		});
		me.tabC.on('click',function(){
			me.provinceId.hide();
			me.cityId.hide();
			me.areaId.show();
			
			me.tabA.removeClass('yellow');
			me.tabB.removeClass('yellow');
			me.tabC.addClass('yellow');
			
			//当修改地址时，重新生成省  清空arr数组
			me.arr.splice(2);
		});
	}
	
}

var AddressSelectConfig = {
	addressTitleId : $('#addressTitleId'),
	addressListId : $('#addressListId'),
	isShow : true,
	provinceId : $('#provinceId'),
	cityId : $('#cityId'),
	areaId : $('#areaId'),
	tabTitleId : $('#tabTitleId'),
	
	tabA : $('#tabA'),
	tabB : $('#tabB'),
	tabC : $('#tabC'),
	
	arr : [],
	
	addressDivId : $('#addressDivId')
};

new AddressSelect(AddressSelectConfig);

