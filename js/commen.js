//底部跳转页面
$("#footer div").on("touchend", function(ev){
    if($(this).index() === 0){
        window.location.href = "index.html";
    }else if($(this).index() === 1){
        window.location.href = "list.html";
    }else if($(this).index() === 3){
        window.location.href = "mine.html";
    }else if($(this).index() === 2){
        window.location.href = "about.html";
    }
});