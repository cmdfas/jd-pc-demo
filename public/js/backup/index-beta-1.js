/*
 * date:2017/07/25
 * info:首页header搜索框
 * */

function searchFn(){
//	var $searchId = $('#searchId');
	
	/* 获得焦点 */
	$('#searchId').focus(function(){
		$(this).val('');
		/* 失去焦点 */
	}).blur(function(){
		$(this).val('抢十亿神犬');
	});
}

/*
 * date:2017/07/26
 * info:首页左侧产品导航
 * */
function subNavFn(){
//	var $lis = $('#subNavProductId li');
	var $lis = $('#subNavProductId').children();
	
//	console.log($lis);
	
	/*$lis.mouseover(function(){
//		$(this).css('font-size','22px');
		$(this).children('div').css('display','block');
	});
	$lis.mouseout(function(){
		$(this).children('div').css('display','none');
	});*/
	
	//第二种方法使用 children('div')
	/*$lis.on('mouseover',function(){
		console.log($(this).children());
		$(this).children('div').css('display','block');
	});
	$lis.on('mouseout',function(){
		$(this).children('div').css('display','none');
	});*/
	
	//第三种方法使用 eq()
	/*$lis.on('mouseover',function(){
		$(this).children().eq(1).css('display','block');
	});
	$lis.on('mouseout',function(){
		$(this).children().eq(1).css('display','none');
	});*/
	
	//第四种方法使用 show
	/*$lis.on('mouseover',function(){
		var $popUp = $(this).children().eq(1);
		$popUp.show();
	}).on('mouseout',function(){
		var $popUp = $(this).children().eq(1);
		$popUp.hide();
	});*/
	
	$lis.on({
		mouseover : function(){
//			$(this).children().eq(1).show();
			gEq($(this)).show();
		},
		mouseout : function(){
//			$(this).children().eq(1).hide();
			gEq($(this)).hide();
		}
	});
	
	
}

/*
 * date:2017/07/26
 * info:首页主轮播图
 * */

//自己写的
/*function sliderFn(){
	var $slide = $('.slideWrap');
	var $slideWrap = $slide.find('ul');
	var $lBtn = $slide.find('label');
	var $rBtn = $slide.find('span');
	var $slidePoint = $slide.find('.slidePoint p');
	var imgNum = $slideWrap.children().length;
	var itemWidth = $slideWrap.children().eq(0).width();
	var sumWidth = (imgNum-1) * itemWidth;
	var num = 0;
	
	//动态设置容器的宽
	$slideWrap.css('width',itemWidth*imgNum + 'px');
	
	console.log(imgNum);
	
	$lBtn.on('click',function(){
		num += itemWidth;
		if(num > 0){
			num = -sumWidth;
		}
		$slideWrap.css('left', num +'px');
		
		$slidePoint.removeClass('redP');
		$slidePoint.eq((-num) / 986).addClass('redP');
	});
	
	$rBtn.on('click',function(){
		num -= itemWidth;
		if(num < -sumWidth){
			num = 0;
		}

		$slideWrap.css('left', num+'px');
		
		$slidePoint.removeClass('redP');
		$slidePoint.eq((-num) / 986).addClass('redP');
	});
	
	
	$slidePoint.each(function( index ) {
//			console.log( index + ": "" + $(this).text() );
//		console.log(index);
		$(this).on('click',function(){
//			console.log($(this),index);
			$(this).siblings().removeClass('redP');
			$(this).addClass('redP');
			$slideWrap.css('left', index * -itemWidth +'px');
		});
	});
}*/
//loshang
function slideWrapFn(){
	//ul容器
	var $imageDivId = $('#imageDivId');
	
	var $liLen = $imageDivId.children().length;
	
	var $liWidth = $imageDivId.children().eq(0).width();
	
	var index = 0;
	
	//动态设置宽
	$imageDivId.css('width',$liWidth*$liLen + 'px');
	
	//左按钮
	$('#toLeftBtnId').on('click',function(){
		index++;
		if(index > ($liLen - 1)){
			index = 0;
		}
		$imageDivId.css('left', -(index * $liWidth) + 'px');
	});
	//右按钮
	$('#toRightBtnId').on('click',function(){
		index--;
		if(index < 0){
			index = $liLen - 1;
		}
		$imageDivId.css('left', -(index * $liWidth) + 'px');
	});
}
