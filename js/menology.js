var mySwiper = new Swiper ('.swiper-container', {
    direction: 'vertical',
    slidesPerView: 1.2
});
var getMenology = function(){
    var date = new Date();
    var num = (new Date(date.getFullYear(), date.getMonth(), 1)).getDay();
    $.get("../json/index.json", "GET", function(data){
        var html = "";
        //当前月份日期
        for(var i = 0; i < num; i++){
            html += "<a href='javascript:;'></a>";
        }
        for(i = 0; i < data[0].content[1].pre[date.getMonth()]; i++){
            html += "<a href='javascript:;' data-Month='"+ (date.getMonth() + 1) +"'>"+ (i + 1) +"</a>";
        }
        $("#menology-contaion .slid1").html(html);

        //当前样式
        var nowNum = num + date.getDate() - 1;
        $("#menology-contaion .slid1 a").eq(nowNum).css({
            background: "#ff6600",
            color: "#fff"
        });

        //下一个月份日期
        html = "";

        //定义下一个月份
        var nextMonth = 0;
        nextMonth = (date.getMonth() + 1) <= 12 ? (date.getMonth() + 1) : (date.getMonth() + 1) - 13;

        num = (new Date(date.getFullYear(),  nextMonth, 1)).getDay();
        for(i = 0; i < num; i++){
            html += "<a href='javascript:;'></a>";
        }
        for(i = 0; i < data[0].content[1].pre[nextMonth]; i++){
            html += "<a href='javascript:;' data-Month='"+ (nextMonth + 1) +"'>"+ (i + 1) +"</a>";
        }
        html += "<div class='nowMenDate'>"+ date.getFullYear() +"年"+ (nextMonth + 1) +"月</div>";
        $("#menology-contaion .slid2").html(html);

        //大吼一个月份日期
        html = "";
        nextMonth = (date.getMonth() + 1) <= 12 ? (date.getMonth() + 2) : (date.getMonth() + 2) - 13;
        num = (new Date(date.getFullYear(), nextMonth, 1)).getDay();
        for(i = 0; i < num; i++){
            html += "<a href='javascript:;'></a>";
        }
        for(i = 0; i < data[0].content[1].pre[nextMonth]; i++){
            html += "<a href='javascript:;' data-Month='"+ (nextMonth +　1) +"'>"+ (i + 1) +"</a>";
        }
        html += "<div class='nowMenDate'>"+ date.getFullYear() +"年"+ (nextMonth + 1) +"月</div>";
        $("#menology-contaion .slid3").html(html);
        //选择日期
        $("#menology-contaion a").on("tap", function(ev){
            if($(this).html()){
                $("#menology-contaion .swiper-slide a").css({
                    background: "none",
                    color: "#000"
                }).eq(nowNum).css({
                    background: "#666",
                    color: "#fff"
                });
                $(this).css({
                    background: "#ff6600",
                    color: "#fff"
                });
                if(!($(this).index() >= nowNum) && parseInt($(this).attr("data-Month")) == (date.getMonth() + 1)){
                    $("#menology-contaion .menology-differ").html("未选择");
                    isNowDay = false;
                }else{
                    isNowDay = true;
                }
                //日期存入localStorage
                var ArrivalDate = $(this).attr("data-Month") + "月" + $(this).html() + "日";
                if(localStorage.getItem("isArrival") == "true"){
                    localStorage.setItem("checkIn", ArrivalDate);
                }else{
                    localStorage.setItem("leaveOut", ArrivalDate);
                }
                differDate(isNowDay);
                $("#menology-contaion .menbology-footer").html("确定").css({
                    background: "#ff6600",
                    color: "#fff",
                    fontSize: "1.5rem"
                }).on("tap", function(ev){
                    if($("#menology-contaion .menology-differ").html() == "未选择"){
                        return;
                    }else{
                        window.location.href = localStorage.getItem("backPage");
                    }
                });
            }
        });
    });
};
getMenology();
var isNowDay = true;
//获取日历时间 日期的差值
var differDate = function(isNowDay){
    $("#menology-contaion .menology-checkIn").html(localStorage.getItem("checkIn"));
    $("#menology-contaion .menology-leaveOut").html(localStorage.getItem("leaveOut"));
    var differDate = 0;
    var val1 = [($("#menology-contaion .menology-checkIn").text()).substring(0, 2), ($("#menology-contaion .menology-checkIn").text()).substring(3, 5)];
    var val2 = [($("#menology-contaion .menology-leaveOut").text()).substring(0, 2), ($("#menology-contaion .menology-leaveOut").text()).substring(3, 5)];
    var newD1 = new Date(2016, parseInt(val1[0]), parseInt(val1[1]));
    var newD2 = new Date(2016, parseInt(val2[0]), parseInt(val2[1]));
    differDate = (newD2.getTime() / 1000 - newD1.getTime() / 1000) / (3600 * 24);
    if(isNowDay || isNowDay == undefined){
        $("#menology-contaion .menology-differ").html("共"+ differDate +"晚");
    }
    if(!(differDate > 0)){
        $("#menology-contaion .menology-differ").html("未选择");
    }
};
differDate();