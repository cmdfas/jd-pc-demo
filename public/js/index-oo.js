/******************************
 * date:2017/07/31
 * name:首页的header头的搜索框  重构
 * author:孙帅
 */

function SearchFn(n){
	this.searchId = $(n);
	this.init();
}
SearchFn.prototype = {
	init : function(){
		this.focusFn(this.searchId);
		this.blurFn(this.searchId);
	},
	focusFn:function(n){
		n.focus(function(){
			$(this).val('');
		});
	},
	blurFn : function(n){
		n.blur(function(){
			$(this).val('神犬小七');
		});
	}
}

/******************************
 * date:2017/08/07
 * name:首页的左侧导航条  重构 ,添加ajax获取json
 * author:孙帅
 */

function SubNavFn(n){
	this.ul = $(n);
	this.lis = null;
	this.init();
}
SubNavFn.prototype = {
	init : function(){
		/*var _that = this;
		var _lis = _that.lis;
		_that.mouseoutFn(_lis);
		_that.mouseoverFn(_lis);*/
		
		this.getJson();
//		this.getLis();
//		console.log(this.lis);
//		this.lis.css('color','#005EA7');
		
//		this.mouseoverFn(this.lis);
//		this.mouseoutFn(this.lis);
	},
	mouseoverFn : function(n){
		var _that = this;
		n.on('mouseover',function(){
			_that.getSecondChild($(this)).show();
		});
	},
	mouseoutFn : function(n){
		var _that = this;
		n.on('mouseout',function(){
//			$(this).children().eq(1).hide();
			_that.getSecondChild($(this)).hide();
		});
	},
	getSecondChild : function(_that){
		return _that.children().eq(1);
	},
	getJson : function(){
		var _that = this;
//		var html = '';
		
		//loshang
		getAjax(APILIST.subNavApi,function(data){
			console.log(data); //打印数据
			var productList = data.productList;
			var iLen = productList.length;
			for(var i=0; i<iLen;i++){
				$('<li/>',{}).html(function(){
					$('<a/>',{}).html(productList[i].type).appendTo($(this));
//					console.log(productList[i].products);
					//《第一种实现方式》
					/*var $div = $('<div/>',{}).addClass('showNavPopup').appendTo($(this));
					var products = productList[i].products;
					var jLen = products.length;
					for(var j=0; j<jLen; j++){
						$('<p/>',{}).html(products[j].name).appendTo($div));
					}*/
					//《第二种实现方式》
					$('<div/>',{'class':'showNavPopup'}).html(function(){
						var products = productList[i].products;
						var jLen = products.length;
						for(var j=0; j<jLen; j++){
							$('<p/>',{}).html(products[j].name).appendTo($(this));
						}
					}).appendTo($(this));
				}).appendTo(_that.ul);
			}
			
			//获取li所有元素
			_that.getLis();
			//绑定移入移出事件
			_that.mouseoverFn(_that.lis);
			_that.mouseoutFn(_that.lis);
		});
		
		
		
		//孙帅实现的方式
		/*getAjax(APILIST.subNavApi,function(data){
			console.log(data);
			var arr = data.productList; //array
			for(var i=0;i<arr.length;i++){
				
				html+=`<li>
						<a href="#">${arr[i].type}</a>
						<div class="showNavPopup">
						`;
				
				console.log(arr[i].type);
				if(arr[i].products){
					for(var j=0; j<arr[i].products.length; j++){
						console.log('--' + arr[i].products[j].name + ':' +arr[i].products[j].Price);
						html+=`<p>${arr[i].products[j].name}</p>`;
					}
				}
				html+= `</div>
					</li>`;
			}
			console.log(html);
			$('#subNavProductId').html(html);
			
			_that.lis = _that.ul.children();
			console.log(_that.lis);
			
			_that.mouseoverFn(_that.lis);
			_that.mouseoutFn(_that.lis);
		});*/
		
		/* 结构  */
		/*
				<ul id="subNavProductId">
					<li>
						<a href="#">家电</a>
						<div class="showNavPopup">
							<p>电脑</p>
							<p>洗衣机</p>
							<p>空调</p>
						</div>
					</li>
					<li><a href="#">汽车用品</a></li>
		*/
	},
	getLis : function(){
		this.lis = this.ul.children();
	}
}


/******************************
 * date:2017/08/01
 * name:首页的轮播图  重构
 * author:孙帅
 */

function SlideWrapFn(params){
	for(var i in params){
		this[i] = params[i];
	}
	
	/*//ul容器
	this.imageDivId = $('#imageDivId');
	//小圆点父容器
	this.slidePointWrap = $('#slidePointId');
	//小圆点父容器背景
	this.slidePointWrapBg = $('.slidePoint');
	//左按钮
	this.toLeftBtnId = $('#toLeftBtnId');
	//右按钮
	this.toRightBtnId = $('#toRightBtnId');*/
	
	this.lis = null; //li节点
	this.lisSum = 0; //li数量
	this.liWidth = 0; //li宽度
	this.index = 0; //当前索引
	this.timer = null; //自动播放
	//初始化
	this.init();

	
}
SlideWrapFn.prototype = {
	init:function(){
		this.createDom();
		this.leftBtn();
		this.rightBtn();
		this.pointBtn();
	},
	ulDom : function(){
		//动态生成轮播图li
		var html = '';
		var imgs = this.getData();
		this.lisSum = slideImages.urls.length;
		for(let i=0;i<this.lisSum;i++){
			html+=` <li>
						<img src="${imgs[i]}" />
					</li>`;
		}
		//插入到容器中
		this.imageDivId.html(html);
		//获取子节点
		this.lis = this.imageDivId.children();
		//获取子节点宽度
		this.liWidth = this.lis.eq(0).width();
		//动态计算ul容器 宽度
		this.imageDivId.css('width', this.lisSum * this.liWidth);
	},
	createDom : function(){
		//动态生成轮播图li
		this.ulDom();
		//动态生成小点
		this.createPointDom();
	},
	createPointDom : function(){
		//动态生成小点
		for(let i=0;i<this.lisSum;i++){
			$('<p/>').appendTo(this.slidePointWrap);
		}
		this.slidePointWrap.find('p').eq(0).addClass('redP');	
		//小点的父容器和背景容器的宽高和居中
		this.poointWrapWidth();
		
	},
	//小点的父容器和背景容器的宽高和居中
	poointWrapWidth : function(){
		//动态计算 小点父容器&&背景容器 宽度和居中
		var $slidePointWrapWidth = this.lisSum * 28;
		this.slidePointWrapBg.css({
			'width':$slidePointWrapWidth,
			'margin-left': -($slidePointWrapWidth + 12)/2 //加上12的padding-left值
		});
	},
	getData : function(){
		var imgs = slideImages.urls;
		return imgs;
	},
	leftBtn : function(){
		var that = this;
		this.toLeftBtnId.on('click',function(){
			that.index--;
			if(that.index < 0){
				that.index = that.lisSum-1;
			}
			//切换动画
			that.slideAnimate(that.imageDivId,that.index,that.liWidth);
		});
	},
	rightBtn : function(){
		var that = this;
		this.toRightBtnId.on('click',function(){
			that.index++;
			if(that.index > that.lisSum-1){
				that.index = 0;
			}
			//切换动画
			that.slideAnimate(that.imageDivId,that.index,that.liWidth);
		});
	},
	pointBtn : function(){
		var that = this;
		this.slidePointWrap.find('p').on('click',function(){
			that.index = $(this).index();
			//切换动画
			that.slideAnimate(that.imageDivId,that.index,that.liWidth);
		});
		//添加自动播放
	},
	//设置元素的left值和动画  和 小点active效果
	slideAnimate : function(ele,index,width){
		//改变元素的left值 和 渐变动画
		ele.css({
			'left':-(index * width),
			'opacity':.4
		}).stop().animate({
			'opacity':1
		},250);
		//设置小点的active效果
		this.slidePointWrap.find('p').removeClass('redP').eq(index).addClass('redP');		
	},
	//自动播放功能 还能做
	autoPlay : function(){
		//自动播放功能
		this.timer = setInterval(function(){
		if( this.index <( this.lisSum - 1) ){
			this.index++;
		} else {
			this.index = 0;
		}
			//设置元素的切换和动画  和 小点active效果
			this.slideAnimate(this.index);
		},2000);
	}
}

/******************************
 * date:2017/08/01
 * name:首页的"享品质"
 * author:孙帅
 */

function ProductBlock(n){
	this.productId = $(n);
	this.init();
}
ProductBlock.prototype = {
	init : function(){
		this.getJson();
	},
	getJson : function(){
		var _that = this;
		
		getAjax(APILIST.productBlock,function(data){
			console.log(data);
			var pb = data.pb;
			var pbLen = pb.length;
			var html = '';
			//es6字符串模板形式
			for(var i=0; i<pbLen; i++){
				html+=`<div class="producetItem">
							<dl class="bg_${i+1}">
								<dt>${pb[i].name}</dt>
								<dd>${pb[i].describe}</dd>
							</dl>
							<img src="${pb[i].productImg}" />
						</div>`;
			}
//			console.log(html);
//			_that.productId.html(html);
			
			
			//jquery方式
			for(var i=0;i<pbLen;i++){
				$('<a/>',{'class':'productItem'}).html(function(){
					var _this = $(this);	
					$('<dl/>',{'class':'bg_'+(i+1)}).html(function(){
						var _this = $(this);
						$('<dt/>').html(pb[i].name).appendTo(_this);
						$('<dd/>').html(pb[i].describe).appendTo(_this);
					}).appendTo(_this);
					$('<img/>').attr('src',pb[i].productImg).appendTo(_this);
				}).attr({
					'data-pid' : pb[i].pid,
					'data-price' : pb[i].price,
					'target' : '_blank',
					'href' : TEMPURL.goodsDetail + '?pid=' + pb[i].pid
				}).appendTo(_that.productId);
			}
			
		});
	}
}
