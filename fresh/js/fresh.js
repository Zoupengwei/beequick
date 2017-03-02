/**
 * Created by Auser on 2017/3/1.
 */
define(["jquery"], function ($) {
    var obj = {};
    obj.getData = getData;
    obj.clickFn = clickFn;


    //获取数据的函数
    function getData() {
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
    }

    //绑定点击事件
    function clickFn() {
        $(".select-tag-list li").click(function () {
            //切换样式
            $(this).find("a").addClass("sel");
            $(this).siblings().find("a").removeClass("sel");
            $(this).parent().siblings().find("a").removeClass("sel");
            $(".selection-fruits .list-title").html($(this).find("a").html());
            // getData();
        });
    }

    return obj;
});