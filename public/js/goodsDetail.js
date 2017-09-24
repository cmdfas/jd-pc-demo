/******************************
 * date:2017/08/07
 * name:商品详情页
 * author:孙帅
 */



/******************************
 * date:2017/08/09
 * name:商品图片展示
 */
function GoodsDetailImg(options){
	
	for(var i in options){
		this[i] = options[i];
	}
	
	/*this.smallImgId = $(n);
	this.bigImgId = $('#bigImgId');*/
	this.index = 0;
	this.sum = 0;
	this.init();
}
GoodsDetailImg.prototype = {
	init : function(){
		this.getJson();
	},
	getJson : function(){
		var _that = this;
		getAjax(APILIST.smallImgData,function(data){
//			console.log(data);
			_that.createDom(data.smallImg);
			_that.defaultBigImg(data.smallImg[0].bigImg);
			_that.eventLeft();
			_that.eventRight();
			_that.eventMouse();
		});
	},
	createDom : function(data){
		console.log(data);
		var _that = this;
		var len = data.length;
		this.sum = len;
		for(var i=0;i<len;i++){
			$('<li/>').html(function(){
				$('<img/>').attr('src',data[i].imgurl).appendTo($(this));
			}).attr('data-bigImg',data[i].bigImg).appendTo(this.smallImgId).on('click',function(){
//				$(this).css('border','3px solid #000000');
				var xx = $(this).attr('data-bigImg');
				_that.eventImg(xx);
			});
		}
		//动态计算ul宽度
		this.smallImgId.css('width',len * 75);

		
	},
	eventImg : function(img){
		//点击li 切换对应大图
		this.bigImgId.attr('src',img);
		this.bigBoxImgId.attr('src',img);
	},
	defaultBigImg : function(img){
		//页面打开的 时候，默认显示第一张小图的大图
		this.bigImgId.attr('src',img);	
		this.bigBoxImgId.attr('src',img);
	},
	eventLeft : function(){
		var _that = this;
		this.leftBtnId.on('click',function(){
			if(_that.index < 2 ){
				_that.index++;
				_that.smallImgId.animate({
					'left': -(_that.index * 72)
				});
			}
		});
	},
	eventRight : function(){
		var _that = this;
		this.rightBtnId.on('click',function(){
			if(_that.index > 0){
				_that.index--;
				console.log(_that.index);
				_that.smallImgId.animate({
					'left': -(_that.index * 72)
				});
			}
			
		});
	},
	eventMouse : function(){
		var _that = this;
		this.goodsBigImgId.on({
			'mouseover' : function(e){
				_that.bigImgMaskId.show();
				_that.bigBoxId.show();
			},
			'mouseout' : function(){
				_that.bigImgMaskId.hide();
				_that.bigBoxId.hide();
			},
			'mousemove' : function(e){
//				console.log(e);
				
//				console.log('X:',e.pageX);
//				console.log('Y:',e.pageY);
				var maskW = _that.bigImgMaskId.width(); //透明遮罩的宽度
				var maskH = _that.bigImgMaskId.height(); //透明遮罩的高度
				var wrapW = _that.goodsBigImgId.width(); //外层容器的宽度
				var wrapH = _that.goodsBigImgId.height(); //外层容器的高度
				//console.log(maskW,maskH,wrapW,wrapH);
				var x = e.pageX - _that.bigImgId.offset().left - maskW/2; 
				var y = e.pageY - _that.bigImgId.offset().top - maskH/2;
				
				if(x < 0){
					x = 0;
				}else if(x > wrapW-maskW){
					x = wrapW-maskW;
				}
				if(y < 0){
					y = 0;
				}else if(y > wrapH-maskH){
					y = wrapH-maskH;
				}
				
				
				
//				console.log(_that.bigImgId.offset().left);
				var cs = `left:${x} --- top:${y}<br/>
						pageX:${e.pageX} --- pageY:${e.pageY}<br/>
						offsetLeft:${_that.bigImgId.offset().left} --- offsetTop:${_that.bigImgId.offset().top}<br/>
				`;
				_that.bigImgMaskId.css({
					'left': x,
					'top': y
				}).html(cs);
				
				
				//第一种方式实现
				//求反比值
				var percentX = x / (wrapW-maskW);
				var percentY = y / (wrapH-maskH);
				
				var hh = `left:${x}--top:${y} \n wrapW:${wrapW}--wrapH:${wrapH} \n maskW:${maskW},maskH:${maskH} \n`;
				console.log(hh);
				
				//方向相反
				_that.bigBoxImgId.css({
					'left': -percentX * (_that.bigBoxImgId.width() - _that.bigBoxId.width()),
					'top': -percentY * (_that.bigBoxImgId.height() - _that.bigBoxId.height())
				});
				
//				var jj = `x:${percentX}--'y':${percentY} \n bigImgW:${_that.bigBoxImgId.width()}--bigH:${_that.bigBoxImgId.height()} \n bigW:${_that.bigBoxId.width()}--bigH:${_that.bigBoxId.height()}`;
//				console.log(jj);
//				
//				console.log('bX',-percentX * (_that.bigBoxImgId.width() - _that.bigBoxId.width()),'bY',-percentY * (_that.bigBoxImgId.height() - _that.bigBoxId.height()));*/
				
				//第二种方式
				/*var pw = wrapW/maskW; //计算比例
				
				_that.bigBoxImgId.css({
					'width' : wrapW * pw,
					'left' : -x * pw,
					'top' : -y * pw
				});*/
				
				
				
			}
		});
	}
	
	
}

var detailImgConfig = {
	smallImgId : $('#smallImgId'),
	bigImgId : $('#bigImgId'),
	leftBtnId : $('#leftBtnId'),
	rightBtnId : $('#rightBtnId'),
	goodsBigImgId : $('#goodsBigImgId'),
	bigImgMaskId : $('#bigImgMaskId'),
	bigBoxId : $('#bigBoxImgId'),
	bigBoxImgId : $('#bigBoxImgId img')
}

//
new GoodsDetailImg(detailImgConfig);


/******************************
 * date:2017/08/10
 * name:产品详情页-根据不同商品pid获取不同商品的信息
 * author:孙帅
 */

function GetGoodsDetailInfo(config){
	for(var i in config){
		this[i] = config[i];
	}
	
	this.init();
}
GetGoodsDetailInfo.prototype = {
	init : function(){
		var me = this;
		me.getData();
	},
	getData : function(){
		var me = this;
		
		var pid = getUrlParams(window.location.href).pid;
		
		getParamsAjax(APILIST.param,pid,function(data){
			me.creatDom(data);
			console.log(data);
		});
	},
	resloveJson : function(data){
		//解析json数据，将各个对象内的数据放在数组中，此对象内的公共方法
		var me = this;
		console.log(data);
		var arr = [];
		for(var i=0; i<data.length; i++){
			for(var j in data[i]){
				arr.push(data[i][j]);
			}
		}
//		console.log(arr.join(','));
		return arr;
	},
	creatDom : function(data){
		var me = this;
		var dataArr = data.productInfo;
		var newData = me.resloveJson(dataArr);
		/*console.log(dataArr[0].title);
		console.log(dataArr[1].pInfo);
		me.goodsInfoId.find('h1').html(dataArr[0].title);
		me.goodsInfoId.find('p').html(dataArr[1].pInfo);*/
//		$('<h1/>').html(dataArr[0].title).appendTo(me.goodsInfoId);
//		$('<p/>').html(dataArr[1].pInfo).appendTo(me.goodsInfoId);
		
		for(var i=0; i<newData.length; i++){
			if(i == 0){
				$('<h1/>').html(newData[i]).appendTo(me.goodsInfoId);
			}else{
				$('<p/>').html(newData[i]).appendTo(me.goodsInfoId);
			}
		}
	}
};

var GetGoodsDetailCongif = {
	goodsInfoId : $("#goodsInfoId")
};

new GetGoodsDetailInfo(GetGoodsDetailCongif);

/******************************
 * date:2017/08/14
 * name:产品详情页-加入购物车按钮
 * author:孙帅
 */
function JoinShoppingCart(config){
	for(var i in config){
		this[i] = config[i];
	}
	
	this.init();
}
JoinShoppingCart.prototype = {
	init : function(){
		var me = this;
		me.setValue(me.initValue);
		me.eventAdd();
		me.eventReduce();
	},
	setValue : function(n){
		var me = this;
		me.toShopingCarNumberId.val(n)
	},
	eventAdd : function(){
		var me = this;
		me.toShopingCarAddId.on('click',function(){
			me.initValue++;
			me.setValue(me.initValue);
		});
	},
	eventReduce : function(){
		var me = this;
		me.toShopingCarReduceId.on('click',function(){
			if(me.initValue > 1){
				me.initValue--;
				me.setValue(me.initValue);
			}
		});
	}
};

var JoinShoppingCartConfig = {
	toShopingCarNumberId : $('#toShopingCarNumberId'),
	toShopingCarAddId : $('#toShopingCarAddId'),
	toShopingCarReduceId : $('#toShopingCarReduceId'),
	toShopingCarBtnId : $('#toShopingCarBtnId'),
	initValue : 1
};

new JoinShoppingCart(JoinShoppingCartConfig);
