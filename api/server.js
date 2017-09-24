var express = require('express');
var app = express();

//测试api接口
app.get('/api/one.php',function(req, res){
    //需要返回的json对象
    var data = {
        "code":200,
        "message":"success for request",
        "data":{
            "tid":1,
            "name":"这是我的第一个api接口",
            "site":"myapi.com",
            "text":"这里是描述"
        }
    }

    res.jsonp(data)
})
//首页导航api   
app.get('/api/subNavApi',function(req, res){
    var data = {
        "productList": [{
            "type": "家电",
            "products": [{
                "name": "油烟机",
                "Price": 11
            }, {
                "name": "对燃气灶",
                "Price": 12
            }, {
                "name": "LG洗衣机",
                "Price": 13
            }]
        }, {
            "type": "手机",
            "products": [{
                "name": "三星",
                "Price": 13
            }, {
                "name": "苹果",
                "Price": 14
            }, {
                "name": "华为",
                "Price": 15
            }, {
                "name": "moto模块化手机",
                "Price": 16
            }]
        }, {
            "type": "电脑",
            "products": [{
                "name": "神州",
                "Price": 15
            }, {
                "name": "苹果",
                "Price": 16
            }]
        }]
    };
    res.jsonp(data)
})
//首页产品数据api
app.get('/api/productBlock',function(req, res){
    var data = {
        "pb": [{
            "tipTop": "0",
            "name": "枕头",
            "productImg": "https://img10.360buyimg.com/babel/s400x170_jfs/t8149/142/1761260370/13043/8f344e01/59bf50b5Nfa3bf8b2.jpg",
            "describe": "枕头好啊，好啊，做梦可以梦到美女。",
            "price": 11,
            "oldprice": 22,
            "pid": 23548672
        }, {
            "tipTop": "0",
            "name": "JBL小音箱",
            "productImg": "https://img11.360buyimg.com/babel/s400x170_jfs/t8983/266/1830495006/51725/63fce5df/59bfb885Naa356463.jpg",
            "describe": "音箱好啊，音质特别好。",
            "price": 33,
            "oldprice": 44,
            "pid": 6764512318
        }]
    }
    res.jsonp(data)
})
//产品详情页图片api
app.get('/api/smallImgData',function(req, res){
    var data = {
        "smallImg": [{
            "imgurl": "https://img13.360buyimg.com/n5/s54x54_jfs/t5791/178/2318644223/82382/a6fe34dd/592f8ffcN859f5d4e.jpg",
            "bigImg": "https://img13.360buyimg.com/n1/s450x450_jfs/t5791/178/2318644223/82382/a6fe34dd/592f8ffcN859f5d4e.jpg"
        }, {
            "imgurl": "https://img13.360buyimg.com/n5/s54x54_jfs/t4690/165/2380466276/110983/953bc0b4/58eed398Ne303a991.jpg",
            "bigImg": "https://img13.360buyimg.com/n5/s450x450_jfs/t4690/165/2380466276/110983/953bc0b4/58eed398Ne303a991.jpg"
        }, {
            "imgurl": "https://img13.360buyimg.com/n5/s54x54_jfs/t8110/35/498195152/111644/ed4e7674/59a956b0N7b596d27.jpg",
            "bigImg": "https://img13.360buyimg.com/n5/s450x450_jfs/t8110/35/498195152/111644/ed4e7674/59a956b0N7b596d27.jpg"
        }, {
            "imgurl": "https://img13.360buyimg.com/n5/s54x54_jfs/t4873/49/1207242632/102365/954a2b7a/58eed39fN3000c753.jpg",
            "bigImg": "https://img13.360buyimg.com/n5/s450x450_jfs/t4873/49/1207242632/102365/954a2b7a/58eed39fN3000c753.jpg"
        }, {
            "imgurl": "https://img13.360buyimg.com/n5/s54x54_jfs/t4462/132/2360944723/174692/1a19c658/58eed3a5Ne7e418fd.jpg",
            "bigImg": "https://img13.360buyimg.com/n5/s450x450_jfs/t4462/132/2360944723/174692/1a19c658/58eed3a5Ne7e418fd.jpg"
        }, {
            "imgurl": "https://img13.360buyimg.com/n5/s54x54_jfs/t4948/363/1232970123/98727/aec6c134/58eed3aaN995f807f.jpg",
            "bigImg": "https://img13.360buyimg.com/n5/s450x450_jfs/t4948/363/1232970123/98727/aec6c134/58eed3aaN995f807f.jpg"
        }]
    }

    res.jsonp(data)
})
//产品详情页标题api
app.get('/api/param',function(req, res){
    var data = {
        "productInfo": [{
            "title": "【京东超市】罗莱（LUOLAI）决明子荞麦呵护枕 "
        }, {
            "pInfo": "3D曲面屏，后置猫头鹰双摄像头：1600万主拍+800万大广角，夜拍，820"
        }, {
            "info": "电池容量：2000mAh-2999mAhK"
        }, {
            "pid": 6764512318
        }, {
            "pxxx": "pxxxxx"
        }]
    }

    res.jsonp(data)
})
//产品详情页 省地址 api
app.get('/api/province',function(req, res){
    var data = {
        "province": [{
            "name": "北京",
            "id": 1
        }, {
            "name": "上海",
            "id": 2
        }, {
            "name": "辽宁",
            "id": 3
        }, {
            "name": "四川",
            "id": 4
        }, {
            "name": "湖南",
            "id": 5
        }, {
            "name": "湖北",
            "id": 6
        }]
    }

    res.jsonp(data)
})
//产品详情页 市地址 api
app.get('/api/city',function(req, res){
    var data = {
        "city": [{
            "name": "沈阳",
            "id": 1
        }, {
            "name": "大连",
            "id": 2
        }, {
            "name": "营口",
            "id": 3
        }, {
            "name": "大铁岭",
            "id": 4
        }, {
            "name": "辽阳",
            "id": 5
        }, {
            "name": "本溪",
            "id": 6
        }]
    }

    res.jsonp(data)
})
//产品详情页 区地址 api
app.get('/api/area',function(req, res){
    var data = {
        "area": [{
            "name": "苏家屯区",
            "id": 1
        }, {
            "name": "新民市",
            "id": 2
        }, {
            "name": "皇姑区",
            "id": 3
        }, {
            "name": "大铁沈河区",
            "id": 4
        }, {
            "name": "东陵区",
            "id": 5
        }, {
            "name": "浑南新区",
            "id": 6
        }]
    }

    res.jsonp(data)
})
//购物车页 产品
app.get('/api/cartUlLi',function(req, res){
    var data = {
        "cartList": [{
            "name": "商品1111",
            "introduce": "商品1111就是好",
            "pid": "goods_111",
            "unit": 3698,
            "num": "1",
            "ischeck": "0",
            "total": 3698,
            "goodsimg": "https://img10.360buyimg.com/cms/s80x80_jfs/t5791/178/2318644223/82382/a6fe34dd/592f8ffcN859f5d4e.jpg"
        }, {
            "name": "商品222",
            "introduce": "商品222就是好",
            "pid": "goods_222",
            "unit": 368,
            "num": "2",
            "ischeck": "0",
            "total": 736,
            "goodsimg": "https://img10.360buyimg.com/cms/s80x80_jfs/t5791/178/2318644223/82382/a6fe34dd/592f8ffcN859f5d4e.jpg"
        }, {
            "name": "商品333",
            "introduce": "商品333就是好",
            "pid": "goods_333",
            "unit": 222,
            "num": "10",
            "ischeck": "0",
            "total": 2220,
            "goodsimg": "https://img10.360buyimg.com/cms/s80x80_jfs/t5791/178/2318644223/82382/a6fe34dd/592f8ffcN859f5d4e.jpg"
        }],
        "error": {
            "code": 0,
            "msg": "1,有错误，具体报错信息在这里。0，没有错误。"
        },
        "total": {
            "num": 13,
            "totalMoney": 6654
        }
    }

    res.jsonp(data)
})
//购物车页 计算某单项商品的合计总价：数量 * 单价
app.get('/api/cart',function(req, res){
    var cart = JSON.parse(req.query.cart)
    var num = cart[0].num
    var price = cart[0].price

    var result = num * price

    res.jsonp(result)
})
//购物车页 单个商品复选按钮，计算选中商品的总数量和总价的接口
app.get('/api/goodsCheck',function(req, res){
    var cart = JSON.parse(req.query.goods)

    console.log(cart)
    var checkNum = 0
    var checkPrice = 0

    for(var i=0; i<cart.length; i++){
        checkNum += Number(cart[i].num)
        checkPrice += Number(cart[i].price)
    }

    res.jsonp({"price":checkPrice,"num":checkNum})
})


app.listen(7779,()=>{
    console.log('Api Server: http://localhost:7779');
});