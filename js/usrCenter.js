var myScroll;

myScroll = new IScroll('#wrapper', { probeType: 3, mouseWheel: true});
document.addEventListener('touchmove', function(e){
    // e.preventDefault();
}, false);
//【我的特权】
var box = document.getElementById("usrCenter_li");
box.style.webkitTransition='all ease 0.3s';
touch.on(box,'swipeleft',function(){
	box.style.webkitTransform='translate3d(-'+20+'vw,0,0)'
})
touch.on(box,'swiperight',function(){
	box.style.webkitTransform='translate3d('+0+'vw,0,0)'
})
var num = 8888;
var widthNum = (8888 / 9999) * 95
//【进度条】
var moveNode = $("#scroller .ul1_li2 .usrCenter_move div");
moveNode.animate({
	"width":""+ widthNum +"vw"
},2000).css("width","88vw");
//【数字】
var i = 0;
var numNode = $("#scroller .ul1_li2 p:nth-child(2) span");
setInterval(function(){
	i += 20;
	if(i <= num){
		numNode.html(i);
	}else{
		numNode.html(num);
	}
},1);

var startPosition, endPosition, deltaY;
var a = document.getElementById("scroller");
a.style.webkitTransition = "all 1s ease";

touch.on(a,"touchstart",function(e){
	var touch = e.touches[0];
	startPosition = {
		y: touch.pageY
	}
});
touch.on(a,"touchmove",function(e){
	var touch = e.touches[0];
	endPosition = {
		y: touch.pageY
	};
	deltaY = endPosition.y - startPosition.y;
	a.style.webkitTransform = "translate3d(0,"+ deltaY +"px,0)";
	$(".usrCenter_top").css({
		opacity:-deltaY/300
	});
});







