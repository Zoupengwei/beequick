/**
 * Created by 邹朋位 on 2017/2/27.
 */

require.config({
    paths: {
        "flexible":     "public/lib/flexible",
        "jquery":       "public/lib/jquery-2.2.3",
        "backbone":     "public/lib/backbone.min",
        "underscore":   "public/lib/underscore.min",
        "text":         "public/lib/text",
        "swiper":       "public/lib/swiper-3.3.1.min",
        "router":       "./router",
        "weChat":       "public/lib/jweixin-1.2.0",
    }
});


require(["flexible", "router","weChat"],
    function (flexible, router, wx) {

});