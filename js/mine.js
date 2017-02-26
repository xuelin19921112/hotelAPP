
var myScroll;
myScroll = new IScroll('#wrapper', { bounceEasing: 'elastic', bounceTime: 1200 });
document.addEventListener('touchmove', function(e){
    e.preventDefault();
}, false);
//【请点击登陆页面跳转】
$("#wrapper>#scroller>ul>li>.mine_li1>div:nth-child(3)").on("tap",function(){
	window.location.href = "login.html";
});
//【我的订单页面跳转】
$(".mine_li3").on("tap",function(){
	window.location.href = "order.html";
});
//【我的钱包页面跳转】
$(".mine_li5").on("tap",function(){
	window.location.href = "wallet.html";
});
//【余额页面跳转】
$(".mine_li6").on("tap",function(){
	window.location.href = "restMoney.html";
});
//【抵用券页面跳转】
$(".mine_li7").on("tap",function(){
	window.location.href = "coupon.html";
});
//【好友去哪页面跳转】
$(".mine_li8").on("tap",function(){
	window.location.href = "friendGo.html";
});
//【我的评价页面跳转】===
$(".mine_li9").on("tap",function(){
	window.location.href = "evaluate.html";
});
//【会员中心页面跳转】
$(".mine_li10").on("tap",function(){
	window.location.href = "usrCenter.html";
});
//【积分商城页面跳转】
$(".mine_li11").on("tap",function(){
	window.location.href = "scoreStore.html";
});
//【关于我们页面跳转】
$(".mine_li12").on("tap",function(){
	window.location.href = "found.html";
});

//登陆后用户名改变
var user = localStorage.getItem("user");
if(user == null){
	$(".mine_li1 div:nth-child(3) a").html("请点击登录")
}else{
	$(".mine_li1 div:nth-child(3) a").html(user);
}

//获取订单id
var pay_id = localStorage.getItem("pay_id");
if(pay_id){
	var arr_id = pay_id.split("|");
	$(".mine_li3 div:nth-child(2) b span").html(arr_id.length);
}
