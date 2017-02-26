document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
var loginSpanNode = $(".login_main .login_main_content li:nth-child(1) span");
var loginInputNode = $(".login_main .login_main_content li:nth-child(1) input");
var loginButtonNode = $(".login_main .login_main_content li:nth-child(1) button");
var box = document.getElementById("box");
box.style.webkitTransition='all ease 0.3s';
//【边框】
var liNode1 = $(".login_main>.login_main_top>li").eq(0);
var liNode2 = $(".login_main>.login_main_top>li").eq(1);
//【两个页面滑动事件】
touch.on('#box','swipeleft',function(){
	box.style.webkitTransform='translate3d(-'+100+'vw,0,0)';
	liNode1.css({
		"color": "black",
		"borderBottom": "1px solid #ccc"
	});
	liNode2.css({
		"color": "#4f9bd8",
		"borderBottom": "4px solid #4f9bd8"
	});
});
touch.on('#box','swiperight',function(){
	box.style.webkitTransform='translate3d('+0+'px,0,0)';
	liNode2.css({
		"color": "black",
		"borderBottom": "1px solid #ccc"
	});
	liNode1.css({
		"color": "#4f9bd8",
		"borderBottom": "4px solid #4f9bd8"
	});
});
//【点击登录方式】
touch.on(liNode2,'tap',function(){
	box.style.webkitTransform='translate3d(-'+100+'vw,0,0)';
	liNode1.css({
		"color": "black",
		"borderBottom": "1px solid #ccc"
	});
	liNode2.css({
		"color": "#4f9bd8",
		"borderBottom": "4px solid #4f9bd8"
	});
});
touch.on(liNode1,'tap',function(){
	box.style.webkitTransform='translate3d('+0+'px,0,0)';
	liNode2.css({
		"color": "black",
		"borderBottom": "1px solid #ccc"
	});
	liNode1.css({
		"color": "#4f9bd8",
		"borderBottom": "4px solid #4f9bd8"
	});
});
//【点击其他登录方式】
//【箭头旋转】
var circleNode = $(".login_main .login_main_content li:nth-child(1) .login_method .login_method_box .circle span");
var methodNode = $(".login_main .login_main_content li:nth-child(1) .login_method");
var isRotate = true;
circleNode.on("touchend",function(){
	if(isRotate){
		circleNode.css({
			"transform": "rotate(-90deg)"
		});
		methodNode.css({
			"bottom": "0vh"
		});
		isRotate = false;
	}else{
		circleNode.css({
			"transform": "rotate(90deg)"
		});
		methodNode.css({
			"bottom": "-10vh"
		});
		isRotate = true;
	}
});
// 【滑动事件】
touch.on(methodNode,'swipeup',function(){
	methodNode.css({
		"bottom": "0vh"
	});
	circleNode.css({
		"transform": "rotate(-90deg)"
	});
	isRotate = false;
});
touch.on(methodNode,'swipedown',function(){
	methodNode.css({
		"bottom": "-10vh"
	});
	circleNode.css({
		"transform": "rotate(90deg)"
	});
	isRotate = true;
});

loginButtonNode.on("touchend",function(){
	var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=login&userID="+ loginInputNode.eq(0).val() +"&password="+ loginInputNode.eq(1).val() +"";
	$.get(url,function(data){
		if(data == 0){
			alert("用户名不存在")
		}else if(data == 2){
			alert("用户名密码不符");
		}else{
			alert("登陆成功");
			//console.log(data);
			isPass = 0;
			alert("登录成功");
			window.location.href = "mine.html";
		}
	},false);
});
//【手机号快捷登陆】
//得到一个n位数验证码
/*function testCode(n){
	var arr = [];
	for(var i = 0; i < n; i++){
		var num = parseInt(Math.random() * 100);
		if(num >= 0 && num <= 9){
			arr.push(num);
		}else if(num >= 65 && num <= 90){
			arr.push(String.fromCharCode(num));
		}else if(num >= 10 && num <= 35){
			arr.push(String.fromCharCode(87 + num));
		}else{
			i--;
		}
	}
	return arr.join("");
}
var loginPhoneNode = $(".login_main .login_main_content li:nth-child(2) input");
var loginPhoneButtonNode = $(".login_main .login_main_content li:nth-child(2) button");
var str = "";
loginPhoneButtonNode.eq(0).on("touchend",function(){
	loginPhoneButtonNode.eq(0).html(testCode(6));
	//console.log(loginPhoneButtonNode.eq(0).html())
	//【获取验证码后立即注册
});
loginPhoneButtonNode.eq(1).on("touchend",function(){//手机号快速登录验证
	str = localStorage.getItem("user");
	if(loginPhoneNode.eq(0).val() == str && loginPhoneNode.eq(1).val() == loginPhoneButtonNode.eq(0).html()){
		//alert("登录成功");
		window.location.href = "mine.html";
	}else if(loginPhoneNode.eq(0).val() != str){
		//alert("用户不存在")
	}else{
		//alert("验证码错误")
	}
});*/
//【手机号快捷登陆】
var loginPhoneNode = $(".login_main .login_main_content li:nth-child(2) input");
var loginPhoneButtonNode = $(".login_main .login_main_content li:nth-child(2) button");

// APIKEY  db6c94834d0ae0a04cf0bc0c54b0d95d
// http://sms-api.luosimao.com/v1/send.json
loginPhoneButtonNode.on("tap",function(){
	$.post("http://sms-api.luosimao.com/v1/send",function(data){
		console.log(data);
	});
});



