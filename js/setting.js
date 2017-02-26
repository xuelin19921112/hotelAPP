$(".setting_main ul li:nth-child(7) button").on("tap",function(){
    localStorage.removeItem("user");
    window.location.href = "mine.html"
});