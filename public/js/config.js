/******************************
 * date:2017/08/04
 * name:整个项目的配置与接口
 * author:孙帅
 */

var SITEURL = 'http://localhost:7778';

var APIURL = 'http://localhost:7779';

var APILIST = {
	//首页导航api	
	subNavApi : APIURL + '/api/subNavApi',
	//测试api接口
	oneapi : APIURL + '/zuoye/php/oneapi.php',
	//首页产品数据api
	productBlock : APIURL + '/api/productBlock',
	//产品详情页图片api
	smallImgData : APIURL + '/api/smallImgData',
	//产品详情页标题api
	param : APIURL + '/api/param',
	//产品详情页 省地址 api
	province : APIURL + '/api/province',
	//产品详情页 市地址 api
	city : APIURL + '/api/city',
	//产品详情页 区地址 api
	area : APIURL + '/api/area',
	
	//购物车页 产品api
	cartUlLi : APIURL + '/api/cartUlLi',
	//购物车页 计算某单项商品的合计总价：数量 * 单价
	cart : APIURL + '/api/cart',
	//购物车页 单个商品复选按钮，计算选中商品的总数量和总价的接口
	goodsCheck : APIURL + '/api/goodsCheck',
	
};

/*
	首页轮播图数据
*/
var slideImages = {
	urls : ['images/temp/banner1.jpg','images/temp/banner2.jpg','images/temp/banner3.jpg','images/temp/banner4.jpg']
};

/******************************
 * date:2017/08/09
 * name:整站开发路径
 * author:孙帅
 */

var TEMPURL = {
	goodsDetail : SITEURL + '/goods-detail.html'
};
