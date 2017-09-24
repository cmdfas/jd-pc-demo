/******************************
 * date:2017/08/14
 * name:购物车页面 模板
 * author:孙帅
 */
//es6方式 自己写的
/*function cartTplFn(cartList){
	var me = this;
	var html = '';
	var len = cartList.length;
	for(var i=0; i<len; i++){
		html+= `<div class="border2px"></div>
				<div class="goodsItem">
						<input type="checkbox" class='chkBtn'>
					<label>
						<img src="' + cartList[i].goodsimg}" />
					</label>
					<span>' + cartList[i].name}</span>
					<p class="p1">' + cartList[i].introduce}</p>
					<p class="p2">￥' + cartList[i].unit}.00</p>
					<div class="goodsNumInput">
						<input type="button" value="-" class="a" />
						<input type="text" value="' + cartList[i].num}" class="b" />
						<input type="button" value="+" class="c" />
					</div>
					<p class="p3">￥' + cartList[i].total}.00</p>
					<p class="p4">删除</p>
				</div>`;
	}
	return html;
}*/
//老尚写的

$.extend({
	cartTplFn:function(cartList){
		var me = this;
		var html = '';
		var len = cartList.length;
		for(var i=0; i<len; i++){
			html+= '<div class="border2px"></div>';
			html+= '<div class="goodsItem">';
				//原声html的input单选按钮 20170816
				//html+= '<input type="checkbox" data-goodsNums="'+ cartList[i].num +'" data-unit="'+ cartList[i].unit +'" data-total="'+  cartList[i].total + '" checked class="chkBtn">';
				
				//input skin 20170816
				html += '<div class="checkboxSkin" data-isShow="0"><input type="checkbox" data-goodsNums="'+ cartList[i].num +'" data-unit="'+ cartList[i].unit +'" data-total="'+  cartList[i].total + '" checked class="checkboxBtn"><img src="./images/icon/icon-checked.png"/></div>';
				html+= '<div class="goodsItemPic">';
					html+= '<img src="' + cartList[i].goodsimg + '" />';
				html+= '</div>';
				html+= '<p class="title">' + cartList[i].name + '</p>';
				html+= '<p class="info">' + cartList[i].introduce + '</p>';
				html+= '<p class="price">￥' + cartList[i].unit + '.00</p>';
				html+= '<div class="goodsNumInput">';
					html+= '<input type="button" value="-" class="a reduceGoodsBtn" />';
					html+= '<input type="text" value="' + cartList[i].num + '" class="b enterValue" />';
					html+= '<input type="button" value="+" class="c addGoodsBtn" />';
				html+= '</div>';
				html+= '<p class="allPrice">￥' + cartList[i].total + '.00</p>';
				html+= '<p class="delete deleteBtn">删除</p>';
			html+= '</div>';
		}
		return html;
	}	
});


