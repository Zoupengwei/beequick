/**
 * Created by Auser on 2017/3/1.
 */

define(["jquery", "underscore", "backbone"],
    function ($, _, backbone) {
        var w = backbone.Router.extend({
            routes: {
                //触发的锚点
                //首页
                "home": "home",
                //疯狂秒杀
                "crazyShop": "crazyShop",
                //闪送超市
                "market": "market",
                //新鲜预定
                "fresh": "fresh",
                //购物车
                "shopCar": "shopCar",
                //我的
                "personal": "personal",
                //积分商城
                "scoremall": "scoremall",
                //我的订单
                "myOrder": "myOrder",
                //搜索详情页
                "search": "search",
            },

            //首页
            "home": function () {
                require(["text!./home/home.html", "./home/js/home"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    ctrl.getSwipeMenuData();
                    ctrl.getMainData();
                    $("footer").show();

                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home.png");
                    $("footer li:nth-of-type(3) figure img").attr("src", "./public/img/order.png");
                    $("footer li:nth-of-type(4) figure img").attr("src", "./public/img/shop.png");
                    $("footer li:nth-of-type(2) figure img").attr("src", "./public/img/foudre.png");

                });
            },

            //闪送超市
            "market": function () {
                require(["text!./market/market.html", "./market/js/market"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    // ctrl.getData("热销榜");
                    ctrl.clickFn();
                    //模拟点击事件，让一加载页面就有数据显示
                    $(".goods-category-list li:eq(0)").trigger('click');

                    $("footer li:nth-of-type(2) figure img").attr("src", "./public/img/foudre2.png");
                    $("footer li:nth-of-type(4) figure img").attr("src", "./public/img/shop.png");
                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home2.png");
                    $("footer li:nth-of-type(3) figure img").attr("src", "./public/img/order.png");
                });
            },

            //新鲜预定
            "fresh": function () {
                require(["text!./fresh/fresh.html", "./fresh/js/fresh"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    ctrl.getData();
                    ctrl.clickFn();

                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home2.png");
                    $("footer li:nth-of-type(3) figure img").attr("src", "./public/img/order2.png");
                    $("footer li:nth-of-type(4) figure img").attr("src", "./public/img/shop.png");
                    $("footer li:nth-of-type(2) figure img").attr("src", "./public/img/foudre.png");


                });
            },

            //购物车
            "shopCar": function () {
                require(["text!./shopCar/shopCar.html", "./shopCar/js/shopCar"], function (tpl, ctrl) {
                    $("#content").html(tpl);

                    $("footer li:nth-of-type(4) figure img").attr("src", "./public/img/shop2.png");
                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home2.png");
                    $("footer li:nth-of-type(3) figure img").attr("src", "./public/img/order.png");
                    $("footer li:nth-of-type(2) figure img").attr("src", "./public/img/foudre.png");
                });
            },


            //我的
            "personal": function () {
                require(["text!./personal/personal.html"], function (tpl) {
                    $("#content").html(tpl);
                    $("footer").show();

                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my2.png");
                    $("footer li:nth-of-type(3) figure img").attr("src", "./public/img/order.png");
                    $("footer li:nth-of-type(4) figure img").attr("src", "./public/img/shop.png");
                    $("footer li:nth-of-type(2) figure img").attr("src", "./public/img/foudre.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home2.png");

                });
            },

            //疯狂秒杀
            "crazyShop": function () {
                require(["text!./crazyShop/crazyShop.html", "./crazyShop/js/crazyShop"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    $("footer").hide();
                    ctrl.request();
                });
            },

            //积分商城
            "scoremall": function () {
                require(["text!./scoremall/scoremall.html", "./scoremall/js/scoremall"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    $("footer").hide();
                });
            },

            //我的订单
            "myOrder": function () {
                require(["text!./myOrder/myorder.html"], function (tpl) {
                    $("#content").html(tpl);
                });
            },

            //搜索详情页
            "search": function () {
                require(["text!./search/searchCategory.html"],function (tpl) {
                    $("#content").html(tpl);
                    $("footer").hide();
                });
            },


            //默认页面
            initialize: function () {
                window.location.hash = "home";
            }
        });

        var route = new w();

        backbone.history.start();
    });