var myScroll;
myScroll = new IScroll('#wrapper', { bounceEasing: 'circular', bounceTime: 600 , momentum: true});
document.addEventListener('touchmove', function(e){
    e.preventDefault();
}, false);
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    speed: 1000,
    effect: "coverflow",
    slidesPerView: 3,
    centeredSlides: true,
    autoplay: 2000,
    loop: true,
    autoplayDisableOnInteraction: false
});
var mySwiper1 = new Swiper ('.swiper-container1', {
    direction: 'horizontal',
    speed: 1000,
    slidesPerView: 3,
    spaceBetween: 10,
    autoplay: 2000,
    loop: true,
    autoplayDisableOnInteraction: false
});

//入住离开时间
var isArrival = true;
$(".arrival-Date").on("touchend", function(ev){
    isArrival = true;
    localStorage.setItem("backPage", "index.html");
    localStorage.setItem("isArrival", "true");
    window.location.href = "menology.html";
});
$(".leave-Date").on("touchend", function(ev){
    isArrival = false;
    localStorage.setItem("backPage", "index.html");
    localStorage.setItem("isArrival", "false");
    window.location.href = "menology.html";
});

//获取日历时间 日期的差值
var differDate = function(){
    if(!localStorage.getItem("checkIn")){
        localStorage.setItem("checkIn", $(".arrival-Date").html());
    }
    if(!localStorage.getItem("leaveOut")){
        localStorage.setItem("leaveOut", $(".leave-Date").html());
    }
    $(".arrival-Date").html(localStorage.getItem("checkIn"));
    $(".leave-Date").html(localStorage.getItem("leaveOut"));
    var differDate = 0;
    var val1 = [($(".arrival-Date").text()).substring(0, 2), ($(".arrival-Date").text()).substring(3, 5)];
    var val2 = [($(".leave-Date").text()).substring(0, 2), ($(".leave-Date").text()).substring(3, 5)];
    var newD1 = new Date(2016, parseInt(val1[0]), parseInt(val1[1]));
    var newD2 = new Date(2016, parseInt(val2[0]), parseInt(val2[1]));
    differDate = (newD2.getTime() / 1000 - newD1.getTime() / 1000) / (3600 * 24);
    differDate = differDate > 0 ? differDate : 1;
    $(".differDate").html("共"+ differDate +"晚");
};
differDate();

//初始化住店日期
var nowCheckIn = function(){
    var date = new Date();
    var html = "";
    html = ""+ (date.getMonth() + 1) +"月"+ date.getDate() +"日<span>今天</span>";
    $(".arrival-Date").html(html);
    html = ""+ (date.getMonth() + 1) +"月"+ (date.getDate() + 1) +"日<span>明天</span>";
    $(".leave-Date").html(html);
    differDate();
};
nowCheckIn();



//获取订酒店地址
var getAddress = function(ev){
    var html = "";
    html = "<div class='nowAddress' data-istrue='true'>" +
            "<div class='box'></div>" +
        "</div>";
    if(!$(".nowAddress").attr("data-istrue")){
        //$("body").prepend(html);
    }
};
var isAddress = true;
$(".index_address").on("touchend", function(ev){
    getAddress();
});

//获取当前定位地址
if(!localStorage.getItem("address")){
    localStorage.setItem("address", "北京");
}else{
    $(".index_address").html(localStorage.getItem("address"));
}

//获取特色酒店信息
var getUniqueHotel = function(){
    $.get("../json/index.json", "GET", function(data){
        var html = "";
        for(var i = 0; i < data[1].length; i++){
            html += "<div class=\"unique_hotel\">"
                + "<div class=\"box\">"
                    + "<div>"
                        + "<img data-id='"+ data[1][i].sp +"' src=\"../imgs/"+ data[1][i].content.src +"\" alt=\"\">"
                    + "</div>"
                    + "<div class=\"detail\">"
                    + "<div class=\"boxdetail\">"
                    + "<div>"
                    + "<p>"+ data[1][i].content.hotel +"</p>"
                    + "<p><span>￥</span><span>"+ data[1][i].content.price +"</span>起</p>"
                    + "</div>"
                    + "<div class=\"details\">"+ data[1][i].content.desc +"</div>"
                    + "</div>"
                    + "</div>"
                + "</div>"
            + "</div>";
        }
        $("#scroller ul li:nth-child(5)").html(html);
        $(".unique_hotel img").on("tap", function(ev){
            localStorage.setItem("group", "1");
            localStorage.setItem("id", $(this).attr("data-id"));
            localStorage.setItem("backPage", "index.html");
            window.location.href = "store.html";
        });
    });
};
getUniqueHotel();

//存储当前页面路径
$("#seach").on("tap", function(ev){
    localStorage.setItem("backPage", "index.html");
    window.location.href = "list_seo.html";
});
//存储当前页面路径
$("#scroller .inquire").eq(5).on("tap", function(ev){
    localStorage.setItem("backPage", "index.html");
    window.location.href = "list_seo.html";
});

//跳转到地址选择页面
$("header div").eq(0).on("tap", function(ev){
    localStorage.setItem("backPage", "index.html");
    window.location.href = "City-page.html";
});

//发现页面
$("#scroller ul li").eq(5).on("tap", function(ev){
    window.location.href = "about.html";
});