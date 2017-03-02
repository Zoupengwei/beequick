define(["jquery", "swiper", "weChat"], function ($, swiper, wx) {
    var obj = {};

    obj.getSwipeMenuData = getSwipeMenuData;

    obj.getMainData = getMainData;

    //获取轮播和菜单的数据
    function getSwipeMenuData() {
        $.get("http://h5.yztctech.net/api/axf/apihome.php",
            function (req) {
                // console.log(req);
                var data = JSON.parse(req);

                var slide = data.data.slide;
                var sipwerHtml = '';
                //获取轮播图的数据
                for (var i in slide) {
                    sipwerHtml += '<li class="swiper-slide"><img src=' + slide[i].activity.img + ' /></li>';
                }
                $(".banner ul").html(sipwerHtml);
                //启动轮播
                swipe();

                var menu = data.data.menu;
                var menuHtml = '';
                //获取菜单的数据
                for (var i in menu) {
                    if (i == 1) {
                        //疯狂秒杀
                        menuHtml += '<li><a href="#crazyShop"><figure><img src=' +
                            menu[i].activity.img +
                            ' /><figcaption>' + menu[i].activity.name +
                            '</figcaption></figure></a></li>';

                    } else {
                        menuHtml += '<li><a href="#"><figure><img src=' +
                            menu[i].activity.img +
                            ' /><figcaption>' + menu[i].activity.name +
                            '</figcaption></figure></a></li>';
                    }
                }
                $(".content>.menu ul").html(menuHtml);

                //绑定扫一扫
                $("header .left").on('click',function () {
                    scan();
                });
            });
    };

    //轮播图的控制函数
    function swipe() {
        var myswiper = new Swiper(".swiper-container", {
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
        });
    };

    //获取主要内容的数据
    function getMainData() {
        $.get("http://h5.yztctech.net/api/axf/apihomehot.php",
            function (req) {
                // console.log(req);
                var data = JSON.parse(req).data;
                var html = '';

                for (var i in data) {

                    html += `<li class="product-item"><div class="pic" 
                        style= "background: url('${data[i].img} ')no-repeat;background-size: 100% 100%"></div>
                        <p class="pro-title"> ${data[i].name} </p>
                        <div class="discout"><span class="jingxuan">精选</span>
                        <span class="huodong">${data[i].pm_desc}</span></div>
                        <div class="pro-desc"><p class="specification">
                        ${data[i].specifics}</p><p class="price">¥
                        ${data[i].price} <span class="pass-price">¥
                        ${data[i].market_price}</span></p>
                        <span class="add icon-plus"></span></div></li>
                        `;

                    //*1转化为number
                    if ((i * 1 + 1) % 3 == 0) {
                        var num = (i * 1 + 1) / 3 - 1;
                        $(".act-category-item-goodList").eq(num).html(html);
                        html = '';
                    }
                }
            });
    };

    //微信配置
    wx.config({
     debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
     appId: '<?php echo $signPackage["appId"];?>', // 必填，公众号的唯一标识
     timestamp: '<?php echo $signPackage["timestamp"];?>', // 必填，生成签名的时间戳
     nonceStr: '<?php echo $signPackage["nonceStr"];?>', // 必填，生成签名的随机串
     signature: '<?php echo $signPackage["signature"];?>',// 必填，签名，见附录1
     jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2

     });

    //扫一扫的接口函数
    function scan() {
        wx.scanQRCode({
            needResult: 0, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            },
        });
        console.log(1111);
    }

    //获取地理位置
    wx.ready(function () {
        var locat = $("header .center").on("click", function () {
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度

                    wx.openLocation({
                        latitude: 0, // 纬度，浮点数，范围为90 ~ -90
                        longitude: 0, // 经度，浮点数，范围为180 ~ -180。
                        name: '', // 位置名
                        address: '', // 地址详情说明
                        scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                    });
                },
            });
        });
    });

    return obj;
});