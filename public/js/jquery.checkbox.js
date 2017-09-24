/******************************
 * date:2017/08/14
 * name:购物车页面  checkbox插件
 * author:孙帅
 */

(function($){
	$.fn.checkbox = function(params){
		this.css(params);
		this.on('click',function(){
			if($(this).attr('data-isShow') == 0){
				$(this).find('img').hide();
				$(this).attr('data-isShow',1);
			}else{
				$(this).find('img').show();
				$(this).attr('data-isShow',0);
			}
		});
		return this;
	}
})(jQuery)
