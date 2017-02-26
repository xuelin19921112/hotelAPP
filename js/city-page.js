//获取热门城市
var getHotCity = function(){
    $.get("../json/index.json", function(data){
        data = data[0].content[0].pre;
        var html = "";
        for(var i = 0; i < data.length; i++){
            html += "<a href='javascript:;'>"+ data[i] +"</a>";
        }
        $("#add-contaion .add-hotTel").html(html);
        $("#add-contaion .add-main .box a").on("touchend", function(ev){
            localStorage.setItem("address", $(this).html());
            window.location.href = localStorage.getItem("backPage");
        });
    });
};
getHotCity();
$("#add-contaion .add-head a").on("touchend", function(ev){
    window.location.href = localStorage.getItem("backPage");
});
