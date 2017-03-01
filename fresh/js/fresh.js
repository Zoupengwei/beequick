/**
 * Created by Auser on 2017/3/1.
 */
define(["jquery"], function ($) {
    var obj = {};
    obj.request = function () {
        $.ajax({
            type: "get",
            url: "http://h5.yztctech.net/api/axf/apiyuding.php",
            async: true,
            success: function (req) {
                var data = JSON.parse(req);
                var product = data.product;

                var html = '';
                for (var i in product) {
                    html += '<li class="fruits-item">' +
                        '<p class="p-pic" href="javascript:;">' +
                        '<img src=' + product[i].img + '/></a></p>' +
                        '<a href="javascript:;"><p class="p-intro">' +
                        product[i].name + '</a></p>' +
                        '<p class="p-price">￥<em>' + product[i].price +
                        '</em></p><a class="addCar" href="javascript:;">' +
                        '<span class="icon-font"></span></a></li>';
                }

                $("main .selection-fruits .fruits-list").html(html);
            }
        });
    };

    return obj;
});