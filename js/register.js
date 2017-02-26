var registerInputNode = $(".register_main>.register_main_ul>li input");
var registerSpanNode = $(".register_main>.register_main_ul>li span");
var registerButton = $(".register_main>.register_main_ul>li button");
//console.log(registerButton);
// ^[a-zA-z][a-zA-Z0-9_]{5,15}$
// ^[a-zA-Z0-9!"\#$%&'()*+,-./:;<=>?@\[\\\]^_`\{\|\}\~]{10,16}$
var isPass = 0;
registerInputNode.eq(0).on("blur",function(){
	var str = registerInputNode.eq(0).val();
	var pattern = new RegExp("^[1][358][0-9]{9}$");
	if(pattern.test(str)){
		isPass++;
		registerInputNode.eq(0).css("color","gray");
		registerSpanNode.eq(1).html("");
	}else{
		registerInputNode.eq(0).css("color","red");
		registerSpanNode.eq(1).html("格式错误").css("color","red");
	}
});
registerInputNode.eq(1).on("blur",function(){
	var str = registerInputNode.eq(1).val();
	var pattern = new RegExp("^[a-zA-Z0-9!/\#$%&'()*+,-./:/;<=>?@\[\\\]^_`\{\|\}\~]{10,16}$");
	if(pattern.test(str)){
		isPass++;
		registerInputNode.eq(1).css("color","gray");
		registerSpanNode.eq(3).html("");
	}else{
		registerInputNode.eq(1).css("color","red");
		registerSpanNode.eq(3).html("格式错误").css("color","red");
	}
});
registerInputNode.eq(2).on("blur",function(){
	var str1 = registerInputNode.eq(1).val();
	var str2 = registerInputNode.eq(2).val();
	if(str1 == str2){
		isPass++;
		registerInputNode.eq(2).css("color","gray");
		registerSpanNode.eq(5).html("");
	}else{
		registerInputNode.eq(2).css("color","red");
		registerSpanNode.eq(5).html("密码不同").css("color","red");
	}
});
registerInputNode.eq(3).on("change",function(){
	isPass++;
});
registerButton.on("touchend",function(){
	if(isPass == 4){
		console.log(registerInputNode.eq(0).val(),registerInputNode.eq(1).val())
		var url = "http://datainfo.duapp.com/shopdata/userinfo.php?status=register&userID="+ registerInputNode.eq(0).val() +"&password="+ registerInputNode.eq(1).val() +"";
		$.get(url,function(data){
			if(data == 0){
				//alert("用户名重复")
			}else if(data == 1){
				//alert("注册成功");
				isPass = 0;
				localStorage.setItem("user",registerInputNode.eq(0).val());
				console.log(localStorage.getItem("user"));
				window.location.href = "login.html";
			}else if(data == 2){
				//alert("服务器出错");
			}
		},false);
	}else{
		//alert("请完善个人信息");
	}
});
