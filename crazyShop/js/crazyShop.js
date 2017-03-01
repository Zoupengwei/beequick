/**
 * Created by Auser on 2017/3/1.
 */
define(["jquery"], function ($) {
    var obj = {};
    obj.request = function () {
        $.ajax({
            type: "get",
            url: "http://h5.yztctech.net/api/axf/apimiaosha.php",
            async: true,
            success: function (req) {
                var data = JSON.parse(req);
                var product = data.product;
                var nowTime = data.nowTime;
                var dateTime = data.dateTime;

                var html = '';
                for (var i in product) {
                    html += '<div class="goods-item">' +
                        '<a class="pic" href="javascript:;">' +
                        '<img src=' + product[i].img + '/></a>' +
                        '<dl><dt class="title"><a href="javascript:;">' + product[i].name + '</a></dt>' +
                        '<dd><p class="intro">' + product[i].specifics + '</p>' +
                        '<p class="price">￥<strong>' + product[i].price + '</strong>' +
                        '<span>/' + product[i].market_price + '</span></p>' +
                        '<p class="btn"><a href="javascript:;">' + product[i].price +
                        '元抢购</a></p></dd></dl></div>';
                }
                $(".active-goods").html(html);

            }
        });

    }

    return obj;
});