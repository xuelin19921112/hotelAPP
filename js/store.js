

$.get("../json/index.json","GET",function(data){
    var slide = "";
    var rooms = "";
    var touch_move= "";
    
    var id = localStorage.getItem("id"); 
    var group = localStorage.getItem("group"); 
    for(var i = 0; i < data[group].length; i++){
        if(data[group][i].sp == id){
            var img_length = data[group][i].content.smallImg;
            var room_length = data[group][i].content.bed;
            for(var j = 0; j < img_length.length; j++){
                 slide += "<div class=\"swiper-slide\">"+
                               "<a href=\"javascript:;\"><img src=\"../imgs/"+ img_length[j] +"\" alt=\"\" /></a>"+
                          "</div>"
                if(j == 0 || j == 2 || j == 5){
                    touch_move += "<p>"+ data[group][i].content.desc +"</p>"
                }
                touch_move += "<div><img src=\"../imgs/"+ img_length[j] +"\" alt=\"\" /></div>"
            }
            $("#touch_move").html(touch_move);
            $(".swiper-wrapper").html(slide);
            var mySwiper = new Swiper('.pages1', {
                autoplay: 2000,//可选选项，自动滑动
                speed: 500,
                pagination : '.swiper-pagination',
                autoplayDisableOnInteraction : false
            });
            $(".car div").html(data[group][i].content.tel);
			$(".sname").html(data[group][i].content.hotel);
			$(".address").html(data[group][i].content.detArea);
            $.each(room_length,function (i,o) {
                rooms += "<div class=\"room\">"+
                            "<div class=\"rooms\" data_price=\""+ o[1] +"\" data_name=\""+ o[0] +"\"></div>"+
                            "<div class=\"box\">"+
                                "<div class=\"left\">"+
                                    "<p>"+ o[0] +"</p>"+
                                    "<ul>"+
                                        "<li>大床</li>"+
                                        "<li>无早</li>"+
                                        "<li>信用卡担保</li>"+
                                    "</ul>"+
                                    "<div>"+ o[2] +"</div>"+
                                "</div>"+
                                "<div class=\"right\">￥"+ o[1] +" </div>"+
                            "</div>"+
                        "</div>"
            });
            $(".bed").html(rooms);
        }
    }
});



var clock1 = 0;
var house = document.getElementsByClassName("house")[0];
var bed = document.getElementsByClassName("bed")[0];
var telephone = document.getElementsByClassName("telephone")[0];
var store_box = document.getElementById("store_box");
var matter_move = document.getElementById("matter_move");
var menu1 = document.getElementsByClassName("menu1")[0];
var startPosition, endPosition, deltaY;
store_box.style.webkitTransition = "all 1s ease";
matter_move.style.webkitTransition = "all 1s ease";
/*-----------------------------------房间类型------------------------------------------*/
$(".bed").hide();
touch.on(menu1,"touchend",function(){
    $(".bed").show();
});
touch.on(bed,"touchend",function(e){
    $(".bed").hide();
    $(".moneys i").html($(e.target).attr("data_price"));
    $(".menu1 span").html($(e.target).attr("data_name"))
});

/*---------------------------拨打电话house----------------------------------*/
$(".house").hide();
touch.on(house,"tap",function(e){
    e.preventDefault();
    $(".house").hide()
});
touch.on(telephone,"tap",function(e){
    e.preventDefault();
    $(".house").show()
})
/*---------------------------------上下滑动换页------------------------------------*/
touch.on(store_box,"touchstart",function(e){
	var touch = e.touches[0];
	startPosition = {
		y: touch.pageY
	}
});
touch.on($(".a"),"touchmove",function(e){
	var touch = e.touches[0];
	endPosition = {
		y: touch.pageY
	};
	deltaY = endPosition.y - startPosition.y;
	store_box.style.webkitTransform = "translate3d(0,"+ deltaY +"px,0)";
	$(".hid").css({
		opacity:-deltaY/300
	});
});
touch.on($(".a"),"touchend",function(){
	if(deltaY > -200){
		store_box.style.webkitTransform = "translate3d(0,0,0)"
		$(".hid").css({
			opacity:0
		});
	}else{
		store_box.style.webkitTransform = "translate3d(0,-92vh,0)"
		$(".hid").css({
			opacity:1
		});
	}
});
touch.on($(".b"),"touchmove",function(e){
	var touch = e.touches[0];
	endPosition = {
		y: touch.pageY
	};
	deltaY = endPosition.y - startPosition.y;
	if(deltaY > 300){
		store_box.style.webkitTransform = "translate3d(0,0,0)"
		$(".hid").css({
			opacity:0
		});
	}
});

/*---------------------------------------左划换页----------------------------------------------------*/
$(".nav li").eq(0).addClass("now_page");
touch.on(matter_move,"swipeleft",function(e){

	if(clock1 == 0){
		clock1++;
		matter_move.style.webkitTransform = "translate3d(-100vw,0,0)"
        $(".nav li").eq(0).removeClass("now_page");
        $(".nav li").eq(1).addClass("now_page");
	}else if(clock1 == 1){
        $(".nav li").eq(1).removeClass("now_page");
        $(".nav li").eq(2).addClass("now_page");
		clock1++;
		matter_move.style.webkitTransform = "translate3d(-200vw,0,0)"
	}
});
/*--------------------------------------右划换页-----------------------------*/
touch.on(matter_move,"swiperight",function(e){
	if(clock1 == 2){
		clock1--;
        $(".nav li").eq(2).removeClass("now_page");
        $(".nav li").eq(1).addClass("now_page");
		matter_move.style.webkitTransform = "translate3d(-100vw,0,0)"
	}else if(clock1 == 1){
		clock1--;
        $(".nav li").eq(1).removeClass("now_page");
        $(".nav li").eq(0).addClass("now_page");
		matter_move.style.webkitTransform = "translate3d(0,0,0)"
	}
});
/*-----------下订单-----------*/
var pay_string = "";
$(".pay").on("touchend",function(){
    var id = localStorage.getItem("id");
    var pay_id = localStorage.getItem("pay_id");
    if(pay_id == null){
        pay_string = id;
    }else{
        pay_string = pay_id+ "|" +id;
    }
    localStorage.setItem("pay_id",pay_string);

    /*---------------下订单时间-----------------*/
    var date = new Date();
    var time_pay = date.toLocaleString();
    var time = localStorage.getItem("time");

   if(time == null){
        localStorage.setItem("time",time_pay);
        time = localStorage.getItem("time");
    }else{
        time = time + "|" + time_pay;
    }

    localStorage.setItem("time",time);
    window.location.href = "mine.html";
});


//----------------------获取当前日期---------------------
//获取日历时间 日期的差值
var differDate = function(ele1, ele2){
    var differDate = 0;
    var val1 = [(ele1.text()).substring(0, 2), (ele1.text()).substring(3, 5)];
    var val2 = [(ele2.text()).substring(0, 2), (ele2.text()).substring(3, 5)];
    var newD1 = new Date(2016, parseInt(val1[0]), parseInt(val1[1]));
    var newD2 = new Date(2016, parseInt(val2[0]), parseInt(val2[1]));
    differDate = (newD2.getTime() / 1000 - newD1.getTime() / 1000) / (3600 * 24);
    differDate = differDate > 0 ? differDate : 1;
    $(".part2 .days").html("共"+ differDate +"晚").css({
        color: "red",
        fontSize: "1.2rem",
        fontWeight: "900"
    });
};
var getNowDate = function(){
    var checkIn = true;
    $(".part2 .day").eq(0).html(localStorage.getItem("checkIn")).on("touchend", function(ev){
        checkIn = true;
        localStorage.setItem("isArrival", checkIn);
        localStorage.setItem("backPage", "store.html");
        window.location.href = "menology.html";
    });
    $(".part2 .day").eq(1).html(localStorage.getItem("leaveOut")).on("touchend", function(ev){
        checkIn = false;
        localStorage.setItem("isArrival", checkIn);
        localStorage.setItem("backPage", "store.html");
        window.location.href = "menology.html";
    });
    differDate($(".part2 .day").eq(0), $(".part2 .day").eq(1));
};
getNowDate();

//返回上一个页面
$(".hid div").eq(0).on("touchend", function(ev){
    if(localStorage.getItem("backPage") == "store.html"){
        localStorage.setItem("backPage", "list.html");
    }
    window.location.href = localStorage.getItem("backPage");
});

