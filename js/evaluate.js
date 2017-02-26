
var myScroll;//iscroll结构
myScroll = new IScroll('#wrapper', {  mouseWheel: true, scrollbars: false});
document.addEventListener('touchmove', function(e){
    e.preventDefault();
}, false);


$("#scroller li:nth-child(2) a").on("touchend",function(){//导航栏点击
    $("#scroller li:nth-child(2) a").css({
        color:"black",
        borderBottom:"none"
    });
    $(this).css({
        color:"#00CCFF",
        borderBottom:"2px solid #00CCFF"
    })
});



var startPosition, endPosition, deltaY;
touch.on("#target","touchstart",function(ev){
    ev.preventDefault();
});
var a = document.getElementById("scroller");
a.style.webkitTransition = "all 1s ease";
touch.on("#scroller","touchstart",function(e){
    var touch = e.touches[0];
    startPosition = {
        y: touch.pageY
    }
});
touch.on("#scroller","touchmove",function(e){
    var touch = e.touches[0];
    endPosition = {
        y: touch.pageY
    };
    deltaY = endPosition.y - startPosition.y;
    a.style.webkitTransform = "translate3d(0,"+ deltaY +"px,0)";
    $("header").css({
        opacity:-deltaY/300
    });
    if(deltaY < -300){
        $("header div p").css("display","block")
    }else{
        $("header div p").css("display","none")
    }
});


//登陆后用户名改变
var user = localStorage.getItem("user");
//console.log(user);
if(user == null){
    $("#scroller ul li:nth-child(1) div span:nth-child(2)").html("用户名")
}else{
    $("#scroller ul li:nth-child(1) div span:nth-child(2)").html(user);
}


