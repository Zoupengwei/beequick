/**
 * Created by Auser on 2017/3/1.
 */

define(["jquery", "underscore", "backbone"],
    function ($, _, backbone) {
        var w = backbone.Router.extend({
            routes: {
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
            },

            "home": function () {
                require(["text!./home/home.html", "./home/js/home"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    ctrl.request();
                    $("footer").show();

                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home.png");
                    $("footer li:nth-of-type(3) figure img").attr("src", "./public/img/order.png");
                    $("footer li:nth-of-type(4) figure img").attr("src", "./public/img/shop.png");
                    $("footer li:nth-of-type(2) figure img").attr("src", "./public/img/foudre.png");

                });
            },

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

            "crazyShop": function () {
                require(["text!./crazyShop/crazyShop.html", "./crazyShop/js/crazyShop"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    $("footer").hide();
                    ctrl.request();
                });
            },

            "fresh": function () {
                require(["text!./fresh/fresh.html", "./fresh/js/fresh"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    ctrl.request();
                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home2.png");
                    $("footer li:nth-of-type(3) figure img").attr("src", "./public/img/order2.png");
                    $("footer li:nth-of-type(4) figure img").attr("src", "./public/img/shop.png");
                    $("footer li:nth-of-type(2) figure img").attr("src", "./public/img/foudre.png");


                });
            },


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

            "market": function () {
                require(["text!./market/market.html", "./market/js/market"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    $("footer li:nth-of-type(2) figure img").attr("src", "./public/img/foudre2.png");
                    $("footer li:nth-of-type(4) figure img").attr("src", "./public/img/shop.png");
                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home2.png");
                    $("footer li:nth-of-type(3) figure img").attr("src", "./public/img/order.png");
                });
            },

            "scoremall": function () {
                require(["text!./scoremall/scoremall.html", "./scoremall/js/scoremall"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    $("footer").hide();
                });
            },

            "myOrder":function () {
                require(["text!./myOrder/myorder.html"],function (tpl) {
                    $("#content").html(tpl);
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