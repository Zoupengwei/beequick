define(["jquery", "swiper"], function ($, swiper) {
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
                    html += '<li class="product-item"><div class="pic" ' +
                        'style="background: url("' + data[i].img + '") no-repeat"></div>' +
                        '<p class="pro-title">' + data[i].name + '</p>' +
                        '<div class="discout"><span class="jingxuan">精选</span>' +
                        '<span class="huodong">' + data[i].pm_desc + '</span></div>' +
                        '<div class="pro-desc"><p class="specification">' +
                        data[i].specifics + '</p><p class="price">¥' +
                        data[i].price + ' <span class="pass-price">¥' +
                        data[i].market_price + '</span></p>' +
                        '<span class="add icon-plus"></span></div></li>';

                    if ((i + 1) % 3 == 0) {
                        var num = i % 3;
                        $(".act-category-item-goodList").html(html);
                    }
                }

            });
    };

    return obj;
});