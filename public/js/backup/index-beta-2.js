/******************************
 * date:2017/07/25
 * name:首页的header头的搜索框
 * author:孙帅
 */
function searchFn(){
	// console.log( $('#searchId') );
	var _searchId = $('#searchId');

	// 获取、失去焦点
	_searchId.focus(function(){
			$(this).val('');
			// console.log( $(this) );
			// console.log( this )
		}).blur(function(){
			$(this).val('我是老尚');
		});
}

/******************************
 * date:2017/07/26
 * name:首页的左侧导航条
 * author:孙帅
 */
function subNavFn(){
	var _subNavProductId = $('#subNavProductId');
	var _lis = _subNavProductId.children();
	
	 /*
	 给lis当中的每个li，都添加一个click事件，
	 当点击的时候，执行click后面的那个匿名函数中的js
	 */

	// _lis.on('click',function(){
	// 	var _popUp = $(this).children().eq(1);
	// 	_popUp.show();
	// });
	
	// -----------------

	// _lis.on('mouseover',function(){
	// 	var _popUp = $(this).children().eq(1);
	// 	_popUp.show();
	// });

	// _lis.on('mouseout',function(){
	// 	var _popUp = $(this).children().eq(1);
	// 	_popUp.hide();
	// });

	_lis.on({
		mouseover:function(){
			// $(this).children().eq(1).show();

			// 下面这种写法，
			// 是把函数的结果，直接返回到当前“作用域”
			gEq($(this)).show();
		},
		mouseout:function(){
			// $(this).children().eq(1).hide();
			gEq($(this)).hide();
		}
	});
}

/******************************
 * date:2017/07/26
 * name:首页的轮播图
 * author:孙帅
 */
function slideWrapFn(){
	// ul容器
	var $imageDivId = $('#imageDivId');
	// 小点父容器
	var $slidePointWrap =$('#slidePointId');
	// li子节点的集合
	var $liLength = $imageDivId.children();
	// li子节点数量
	var $liSum = $liLength.length;
	// 这是li的宽度
	var $liImgWidth = $liLength.eq(0).width();

	// 点击到第几张图片，用来计数的
	var _tempI = 0;
	
	//动态计算ul容器 宽度
	$imageDivId.css('width', $liSum * $liImgWidth);
	//动态生成小点
	for(var i=0;i<$liSum;i++){
		$('<p>').appendTo($slidePointWrap);
	}
	//动态计算 小点父容器&&背景容器 宽度和居中
	var $slidePointWrapWidth = $liSum * 28;
	$('.slidePoint').css({
		'width':$slidePointWrapWidth,
		'margin-left': -($slidePointWrapWidth + 12)/2 //加上12的padding-left值
	});
	
	//获取小点
	var $slidePoint = $('#slidePointId p');
	//为第一个元素添加avtive状态
	$slidePoint.eq(0).addClass('redP');

	//自动播放功能
	var timer = null;
	function autoPlay(){
		timer = setInterval(function(){
			
		if( _tempI<($liSum - 1) ){
			_tempI++;
		} else {
			_tempI = 0;
		}
			//设置元素的切换和动画  和 小点active效果
			changeSlideStyle(_tempI);
		},2000);
	}
	autoPlay();	

	// 左按钮点击
	$('#toLeftBtnId').on('click',function(){
		clearInterval(timer); //清除自动播放
		if( _tempI<($liSum - 1) ){
			_tempI++;
		} else {
			_tempI = 0;
		}
		//设置元素的切换和动画  和 小点active效果
		changeSlideStyle(_tempI);
		autoPlay(); //自动播放
	});

	// 右按钮点击
	$('#toRightBtnId').on('click',function(){
		clearInterval(timer); //清除自动播放
		if( _tempI > 0 ){
			_tempI--;
		} else {
			_tempI = $liSum - 1;
		}
		//设置元素的切换和动画  和 小点active效果
		changeSlideStyle(_tempI);
		autoPlay(); //自动播放
	});
	
	//第一种方式
	/*$slidePoint.each(function(index){
		$(this).on('click',function(){
			$(this).siblings().removeClass('redP');
			$(this).addClass('redP');
			$imageDivId.css('left',-( index * $liImgWidth ));
			$imageDivId.css('opacity',0);
			$imageDivId.stop().animate({
				opacity : 1
			},250);
		});
	});*/
	
	//底部小点点击
	$slidePoint.on('click',function(){
		clearInterval(timer); //清除自动播放
		_tempI = $(this).index(); //获取当前点击元素的索引
		//设置元素的切换和动画  和 小点active效果
		changeSlideStyle(_tempI);
		autoPlay(); //自动播放
	});
	
	//设置元素的left值和动画  和 小点active效果
	function changeSlideStyle(index){
		//改变元素的left值 和 渐变动画
		$imageDivId.css({
			'left':-( index * $liImgWidth ),
			'opacity':0
		}).stop().animate({
			'opacity':1
		},250)
		//设置小点的active效果
		$slidePoint.removeClass('redP').eq(index).addClass('redP');
	}
	
}