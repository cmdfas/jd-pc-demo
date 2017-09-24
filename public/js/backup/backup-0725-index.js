/*
 * date:2017/07/24
 * info:首页header搜索框
 * */
function searchFn(){
	//获取输入框
	var _searchId = g('searchId');
	//点击事件
	_searchId.onfocus = function(){
		this.value = '';
	//this.setAttribute('value','');
	}
	//失去焦点
	_searchId.onblur = function(){
	//this.setAttribute('value','抢十亿神犬');
		this.value = '抢十亿神犬';
	}
}

/*
 * date:2017/07/24
 * info:首页左侧产品导航
 * */
function subNavFn(){
	var _subNavProductId = g('subNavProductId');
	console.log(_subNavProductId.childNodes);
	
	var _child = _subNavProductId.childNodes,
		len = _child.length;
	
//	console.log(len);
	
	for(var i=0;i<len;i++){
//		console.log(_child[i].nodeName);
		
		if(_child[i].nodeName == 'LI'){
//			console.log(_child[i]);

			_child[i].onmouseover = function(){
				var len = this.childNodes.length,
					e = this.childNodes;
				for(var j=0;j<len;j++){
					if(e[j].nodeName == 'DIV'){
						e[j].style.display = 'block';
					}
//					console.log(this.childNodes[j]);
				}
			}
			
			_child[i].onmouseout = function(){
				var len = this.childNodes.length,
					e = this.childNodes;
				for(var j=0;j<len;j++){
					if(e[j].nodeName == 'DIV'){
						e[j].style.display = 'none';
					}
//					console.log(this.childNodes[j]);
				}
			}



			/*_child[i].onmouseover = function(){
				var e = this.getElementsByTagName('div')[0];
				if(e){
					e.style.display = 'block';
				}
			}
			_child[i].onmouseout = function(){
  				var e = this.getElementsByTagName('div')[0];
				if(e){
					e.style.display = 'none';
				}
			}*/
		}
		
		
		
		/*if(_child[i].nodeType == 1){
//			count++;
			_child[i].onmouseover = function(){
//				console.log(this);
				var e = this.getElementsByTagName('div')[0];
				if(e){
					e.style.display = 'block';
				}
			}
			_child[i].onmouseout = function(){
  				var e = this.getElementsByTagName('div')[0];
				if(e){
					e.style.display = 'none';
				}
			}
		}*/
		
	}
}