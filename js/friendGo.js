var friendGoNode = $(".friendGo_top div:nth-child(2) div span");
console.log(friendGoNode);
friendGoNode.eq(1).on("touchend",function(){
	friendGoNode.eq(0).css({
		"color":"#80bdec",
		"backgroundColor":"#fff"
	});
	friendGoNode.eq(1).css({
		"color":"#fff",
		"backgroundColor":"#80bdec"
	});
});
friendGoNode.eq(0).on("touchend",function(){
	friendGoNode.eq(1).css({
		"color":"#80bdec",
		"backgroundColor":"#fff"
	});
	friendGoNode.eq(0).css({
		"color":"#fff",
		"backgroundColor":"#80bdec"
	});
});