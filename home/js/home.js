define(["jquery", "swiper"], function ($, swiper) {
    var obj = {};

    obj.request = function () {
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

    function swipe() {
        var myswiper = new Swiper(".swiper-container", {
            autoplay: 3000,
            autoplayDisableOnInteraction: false,
            loop: true,
            pagination: '.swiper-pagination',
            paginationClickable: true,
        });
    }

    return obj;
});