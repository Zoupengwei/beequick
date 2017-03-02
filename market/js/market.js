/**
 * Created by Auser on 2017/3/1.
 */


define(["jquery"],
    function ($) {
        var obj = {};

        //ajax请求数据
        obj.getData = getData;

        obj.clickFn = clickFn;

        //获取数据
        function getData(param) {
            $.get("http://h5.yztctech.net/api/axf/apicategory.php",{category:param},
                function (req) {
                    // console.log(req);
                    var data = JSON.parse(req).data;
                    var html = '';

                    for (var i in data) {
                        html += '<dd class="goods-items">' +
                            '<a href="javascript:;">' +
                            '<img class="product-image" src=' + data[i].img +
                            '/><p class="p-title p-ellipsis">' + data[i].name +
                            '</p><p class="tag"><span class="p-tag selection">精选</span>' +
                            '<span class="p-tag gift">' + data[i].pm_desc +
                            '</span></p><p class="p-intro p-ellipsis">' + data[i].specifics +
                            '</p><p class="p-price">￥' + data[i].price +
                            '</p><a href="javascript:;"><span class="icon-font add-goods"></span></a>'
                    }

                    $("main .goods-list .allItem").html(html);
                });
        }

        //给每个li绑定点击事件
        function clickFn() {
            $(".goods-category-list li").click(function () {
                //切换样式
                $(this).find("a").addClass("current");
                $(this).siblings().find("a").removeClass("current");
                //获取该项的数据
                getData($(this).children().text());
            });
        }

        return obj;
    });