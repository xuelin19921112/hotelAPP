//点击搜索 获取具体数据
$("#top button").on("touchend",function(){
    console.log($("#top input").val());
    var that = $("#top input").val();
    main(that);
});
//点击热门搜索 获取具体数据
$("#list_seo_cont div").on("touchend",function(){

    var that = $(this).html();
    main(that);
});

//ajax加载数据 main部分
//  main(that);
function  main(that){
    $.get("../json/index.json", function(data){
        var html = "";
        $.each(data[1],function(i,o){
            if(o.content.hotel == that){
                html   +=    "<li group=\""+o.group+"\" data-id=\""+o.sp+"\">"
                    +    "<div>"
                    +    "<img src=\"../imgs/"+o.content.src+"\" alt=\"\">"
                    +    "</div>"
                    +    "<div>"
                    +    "<p>"+o.content.hotel+"</p>"
                    +    "<p>￥<span>"+o.content.price+"</span>元起</p>"
                    +    "</div>"
                    +    "<div>"
                    +    "<p>"+o.content.desc+"</p>"
                    +    "</div>"
                    +    "<div>"
                    +    "<p><span class=\"iconfont\">&#xe612;</span>"+o.area+"</p>"
                    +    "<p>"
                    +    "<span class=\"iconfont\">&#xe603;</span>"
                    +    "有<i>"+o.content.peoNum+"</i>人住过"
                    +    "</p>"
                    +    "</div>"
                    +    "</li>"
                return false;
            }

        });
        $(".list_main").html(html);
    });
}

//返回上一级路径
$("#top div").eq(0).on("tap", function(ev){
    window.location.href = localStorage.getItem("backPage");
});
