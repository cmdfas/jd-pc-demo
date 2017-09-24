/******************************
 * date:2017/08/14
 * name:购物车页面
 * author:孙帅
 */
function ShoppingCart(config){
	for(var i in config){
		this[i] = config[i];
	}
	this.init();
}
ShoppingCart.prototype = {
	init : function(){
		var me = this;
		me.getJson();
	},
	getJson : function(){
		var me = this;
		getAjax(APILIST.cartUlLi,function(data){
			console.log(data);
			if(data.error.code === 0){
				me.cartTpl(data.cartList); //生成dom渲染到页面中
				me.totalGoodsNumberId.html(data.total.num); //更新全部商品数量
				me.selectGoodsNumberId.html(data.total.num); //更新选择商品数量
				me.totalGoodsMoneyId.html(data.total.totalMoney); //更新商品总价
				//增加减少商品数量按钮事件
				me.addGoodsEvent();
				me.reduceGoodsEvent();
				//增加减少输入框事件
				me.enterGoodsNumEvent();
				//每个checkbox点击事件
				me.checkboxGoodsEvent();
				//删除某项商品
				me.deleteGoodsEvent();
				//
				me.deleteSelectGoodsEvent();
				//全选功能
				me.checkAllEvent();
			}else{
				console.log(data.error.msg);
			}
		});
	},
	//生成dom  公共方法
	cartTpl : function(cartList){
		var me = this;
		//生成dom渲染到页面中
		me.cartWrapId.html($.cartTplFn(cartList));
		//配置checkbox的样式
		me.skinCheckboxConfig();
	},
	//增加商品数量按钮事件
	addGoodsEvent : function(){
		var me = this;
		me.cartWrapId.find('.addGoodsBtn').on('click',function(){
			var _this = $(this);
			var e = _this.parents('.goodsItem').find('.checkboxBtn'); //存储商品数量和单价的容器
			var num = e.attr('data-goodsNums');  //商品数量
			var unit = e.attr('data-unit'); //商品单价
			num++;
			
			e.attr('data-goodsNums',num); //更新存储商品数量
			_this.prev().val(num); //更新页面中的商品数量
			var sum = _this.parent().next(); //计算结果的渲染容器
			me.cartSingleTotal(num,unit,sum,_this); //计算结果 并渲染到页面
			_this.attr('disabled','disabled'); //点击之后禁止点击  回调传回数据之后可以点击
			//错误的方法
			/*var n = $(this).prev().val();
			n++;
			$(this).prev().val(n);*/
		});
	},
	//减少商品数量按钮事件
	reduceGoodsEvent : function(){
		var me = this;
		me.cartWrapId.find('.reduceGoodsBtn').on('click',function(){
			var _this = $(this);
			var e = _this.parents('.goodsItem').find('.checkboxBtn'); //存储商品数量和单价的容器
			var num = e.attr('data-goodsNums'); //商品数量
			var unit = e.attr('data-unit'); //商品单价
			if(num > 1){
				num--;
				e.attr('data-goodsNums',num); //更新存储商品数量
				_this.next().val(num);  //更新页面中的商品数量
				var sum = _this.parent().next(); //计算结果的渲染容器
				me.cartSingleTotal(num,unit,sum,_this); //计算结果 并渲染到页面
			}
			_this.attr('disabled','disabled'); //点击之后禁止点击  回调传回数据之后可以点击
		});
	},
	//增加减少输入框事件
	enterGoodsNumEvent : function(){
		var me = this;
		me.cartWrapId.find('.enterValue').on('blur',function(){
			var _this = $(this);
			var num = _this.val(); //获取输入的数量值
			var e = _this.parents('.goodsItem').find('.checkboxBtn'); //存储商品数量和单价的容器
			var unit = e.attr('data-unit'); //商品单价
			if(num < 1){
				num = 1;
				_this.val(num);
			}
			
			e.attr('data-goodsNums',num); //更新存储商品数量
			var sum = _this.parent().next(); //计算结果的渲染容器
			me.cartSingleTotal(num,unit,sum); //计算结果 并渲染到页面
		});
	},
	//计算某单个商品的合计总价：数量 * 单价  然后将结果渲染到目标容器中     公共方法
	cartSingleTotal : function(n,u,sum,_this){
		/*
		 * n : 商品数量
		 * u : 商品单价
		 * sum : 计算结果的渲染容器
		 * _this : 点击的按钮
		 * */
		var me = this;
		var d = '[{"num":'+ n + ',"price":'+ u +'}]';
		console.log(d);
		cartFnJsonp(APILIST.cart, d , function(data){
			console.log(data);
			if(_this){ //如果存在执行
				_this.removeAttr('disabled'); //传回数据之后 可以点击
			}
			sum.html('￥' + data);
			sum.parent().find('.checkboxBtn').attr('data-total',data);
			//更新全部商品数量  以及全部商品总价
			me.cartFooterInfo();
		});
	},
	//每个商品的单选按钮的点击事件
	checkboxGoodsEvent : function(){
		var me = this;
		var checkBtn = me.cartWrapId.find('.checkboxBtn');
		checkBtn.on('click',function(){
			//更新全选按钮状态
			me.updateCheckAllState();
			//更新全部商品数量  以及全部商品总价
			me.cartFooterInfo();
		});
	},
	//返回，统计“所有商品中，哪些商品被选中”   公共方法
	isCheckedGoods : function(){
		var me = this;
		var arr = [];
		var checkBtn = me.cartWrapId.find('.checkboxBtn');
		
		for(var i=0;i<checkBtn.length;i++){
			if( checkBtn.eq(i).is(':checked') === true ){
				var obj = {};
				obj["price"] = checkBtn.eq(i).attr('data-total');
				obj["num"] = checkBtn.eq(i).attr('data-goodsNums');
				arr.push(obj);
			}
		}
		
		console.log(arr);
		//如果没有被选中的商品
		if(arr.length === 0){
			var o = {};
			o['price'] = 0;
			o['num'] = 0;
			arr.push(o);
		}
		
		return arr;
	},
	//更新全部商品数量  以及全部商品总价     公共方法
	cartFooterInfo : function(){
		var me = this;
		//遍历所有checkbox是否被选中  返回被选中的arr
		var n = me.isCheckedGoods();
		
		//如果没有被选中的商品
		if(n[0].price === 0 && n[0].num ===0 && n.length === 1){
			me.totalGoodsNumberId.html(0);
			me.selectGoodsNumberId.html(0);
			me.totalGoodsMoneyId.html(0);
			return;
		}
		//计算总价  并渲染
		cartGoodsFnJsonp(APILIST.goodsCheck, JSON.stringify(n),function(data){
			console.log(data);
			var price = data.price;
			var num = data.num;
			//更新dom
			me.totalGoodsNumberId.html(num);
			me.selectGoodsNumberId.html(num);
			me.totalGoodsMoneyId.html(price);
		});
	},
	//删除某项商品
	deleteGoodsEvent : function(){
		var me = this;
		var deleteBtn = me.cartWrapId.find('.deleteBtn');
		deleteBtn.on('click',function(){
			var _this = $(this);
			_this.parent().prev().remove();
			_this.parent().remove();
			//更新全选按钮状态 
			me.updateCheckAllState();
			//更新全部商品数量  以及全部商品总价
			me.cartFooterInfo();
		});
	},
	//删除选中商品
	deleteSelectGoodsEvent : function(){
		var me = this;
		var checkBtn = me.cartWrapId.find('.checkboxBtn');
		
		me.deleteSelectGoodsBtn.on('click',function(){
			for(var i=0;i<checkBtn.length;i++){
				if( checkBtn.eq(i).is(':checked') === true ){
					checkBtn.eq(i).parents('.goodsItem').prev().remove();
					checkBtn.eq(i).parents('.goodsItem').remove();
				}
			}
			//更新全部商品数量  以及全部商品总价
			me.cartFooterInfo();
			
			//更新全选按钮状态  
			me.updateCheckAllState();
		});
	},
	//全选功能
	checkAllEvent : function(){
		var me = this;
		me.checkAllBtn.on('click',function(){
			var _this = $(this);
			var checkBtn = me.cartWrapId.find('.checkboxBtn');
			console.log(_this.is(':checked'));
			if(_this.is(':checked') === false){
				me.checkAllBtn.removeAttr('checked');
				checkBtn.removeAttr('checked');
				//关系到配置 checkbox样式
				checkBtn.next().hide();
				checkBtn.parent().attr('data-isShow',1);
			}else{
				me.checkAllBtn.attr('checked','checked');
				checkBtn.attr('checked','checked');
				//关系到配置 checkbox样式
				checkBtn.next().show();
				checkBtn.parent().attr('data-isShow',0);
			}
			//更新全部商品数量  以及全部商品总价
			me.cartFooterInfo();
		});
	},
	//更新全选按钮状态     公共方法
	updateCheckAllState : function(){
		var me = this;
		var checkBtn = me.cartWrapId.find('.checkboxBtn');
		var len = checkBtn.length;
		if(len === 0){ me.checkAllBtn.removeAttr('checked'); return; }
		for(var i=0; i<len; i++){
			if(checkBtn.eq(i).is(':checked') === false){
				me.checkAllBtn.removeAttr('checked');
				break;
			}
			me.checkAllBtn.attr('checked','true');
		}
	},
	//配置checkbox的样式
	skinCheckboxConfig : function(){
		var me = this;
		var checkBtn = me.cartWrapId.find('.checkboxSkin');
		
		checkBtn.checkbox({
			'float':'left',
			'margin':'30px 10px 0 0',
			'cursor':'pointer'
		});
	}
};

var ShoppingCartConfig = {
	cartWrapId : $('#cartWrapId'),
	totalGoodsNumberId : $('#totalGoodsNumberId'),
	selectGoodsNumberId : $('#selectGoodsNumberId'),
	totalGoodsMoneyId : $('#totalGoodsMoneyId'),
	checkAllBtn : $('.checkAllBtn'),
	deleteSelectGoodsBtn : $('#deleteSelectGoodsBtn')
	
};

new ShoppingCart(ShoppingCartConfig);