/**
 * Created by Auser on 2017/3/1.
 */

define(["jquery", "underscore", "backbone"],
    function ($, _, backbone) {
        var w = backbone.Router.extend({
            routes: {
                "home": "home",
                "personal": "personal",
                "crazyShop": "crazyShop",
                "fresh": "fresh",
            },

            "home": function () {
                require(["text!./home/home.html", "./home/js/home"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    ctrl.request();
                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home.png");

                });
            },

            "personal": function () {
                require(["text!./personal/personal.html"], function (tpl) {
                    $("#content").html(tpl);
                    $("footer li:nth-last-of-type(1) figure img").attr("src", "./public/img/my2.png");
                    $("footer li:nth-of-type(1) figure img").attr("src", "./public/img/home2.png");
                });
            },

            "crazyShop": function () {
                require(["text!./crazyShop/crazyShop.html", "./crazyShop/js/crazyShop"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    ctrl.request();
                });
            },

            "fresh": function () {
                require(["text!./fresh/fresh.html", "./fresh/js/fresh"], function (tpl, ctrl) {
                    $("#content").html(tpl);
                    ctrl.request();
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