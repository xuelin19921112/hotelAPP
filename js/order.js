var header_key = false;
$("header div").on("touchend",function(){//点击下拉菜单
    if(header_key == false){
        $("header > div").eq(1).css("display","block");
        $("header > div:nth-child(1) span").css("transform","rotate(90deg)")
        header_key = true;
    }else{
        $("header > div").eq(1).css("display","none");
        $("header > div:nth-child(1) span").css("transform","rotate(-90deg)")
        header_key = false;
    }
});

$("nav a").on("touchend",function(){//导航栏点击
    $("nav a").css({
        color:"black",
        borderBottom:"none"
    });
    $(this).css({
        color:"#00CCFF",
        borderBottom:"2px solid #00CCFF"
    })
});



//获取订单id

var string = function(){
    var pay_id = localStorage.getItem("pay_id");
    if(pay_id == null){
        return;
    }
    var arr_id = pay_id.split("|");
    var pay_html = "";
    var time = localStorage.getItem("time");
    var arr_time = time.split("|");
    var newArr = [];
    var newString = "";
    $.get("../json/goods.json",function(data){
        $.each(data,function(i,o){
            for(var j = 0; j < arr_id.length; j++){
                if(arr_id[j] == o.sp){
                    pay_html += "<li pay='"+o.sp+"'>"+
                        "<div>"+
                        "<img src=\"../imgs/"+o.content.src+"\" >"+
                        "<p>"+
                        "<span><a>"+o.content.hotel+"</a><a>待消费</a></span>"+
                        "<span>下单时间: "+arr_time[j]+"</span>"+
                        "<span>￥ "+o.content.price+"</span>"+
                        "</p>"+
                        "</div>"+
                        "<div><span class='more'>再来一单</span></div>"+
                        "<div class='del'>删除</div>"+
                        "</li>"
                }
            }
            $("#scroller ul").html(pay_html);
            var myScroll;//iscroll结构
            myScroll = new IScroll('#wrapper', {  mouseWheel: true, scrollbars: false ,probeType: 3});
            document.addEventListener('touchmove', function(e){
                e.preventDefault();
            }, false);
        });

        $(".more").on("tap",function(){//再来一单
            window.location.href = "list.html";
        });

        $("#scroller li").on("swipeLeft",function(){//删除键
            $(this).children().eq(-1).animate({
                right:0
            },400)
        });
        $("#scroller li").on("swipeRight",function(){
            $(this).children().eq(-1).animate({
                right:"-20vw"
            },400)
        });
        $(".del").on("tap",function(){
            var goods_id = $(this).parent().attr("pay");
            for(var i = 0; i < arr_id.length; i++){
                if(arr_id[i] != goods_id){
                    newArr.push(arr_id[i]);
                    newString = newArr.join("|");
                }
            }
            $(this).parent().parent().html("");
            localStorage.setItem("pay_id",newString);
            var cc = localStorage.getItem("pay_id");
            if(cc == ""){
                localStorage.removeItem("pay_id");
            }
            string();
        });
    });
};
string();




