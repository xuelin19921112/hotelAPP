//【轮播动画】
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay: 2000,
    // 如果需要分页器
    pagination: '.swiper-pagination'
});
//【返回按钮】
var walletBackNode = $(".wallet_top .wallet_top_container div:nth-child(1) span");
console.log(walletBackNode);
walletBackNode.on("touchend",function(){
    window.location.href = "mine.html";
});


//登陆后用户名改变
var user = localStorage.getItem("user");
console.log(user);
if(user == null){
    $(".wallet_name p:nth-child(1)").html("用户昵称")
}else{
    $(".wallet_name p:nth-child(1)").html(user);
}


