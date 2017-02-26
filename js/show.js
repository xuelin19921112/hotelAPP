var mySwiper = new Swiper('.swiper-container',{//设置开场动画页面切换
    direction : 'horizontal',
    pagination : '.swiper-pagination',
    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function(swiper){
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    }
});
$(".join_in").on("touchend",function(){
    console.log(0)
})