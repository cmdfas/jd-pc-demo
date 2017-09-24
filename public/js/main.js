/*
 * data:2017/07/24
 * name:项目的首页入口文件
 * author:孙帅
 * */

$(function(){
	// 首页header头的搜索框
	new SearchFn('#searchId');
	
	// 首页左侧产品导航
	new SubNavFn('#subNavProductId');
	
	var slideParams = {
		//ul容器
		imageDivId : $('#imageDivId'),
		//小圆点父容器
		slidePointWrap : $('#slidePointId'),
		//小圆点父容器背景
		slidePointWrapBg : $('.slidePoint'),
		//左按钮
		toLeftBtnId : $('#toLeftBtnId'),
		//右按钮
		toRightBtnId : $('#toRightBtnId')
	};
	
	// 首页的轮播图
	new SlideWrapFn(slideParams);
	
	//首页的享品质
	new ProductBlock('#productContentId');
});
