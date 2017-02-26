var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: true,
    autoplay : 5000,
    autoplayDisableOnInteraction : false,
    lazyLoading : true,
    speed:1500,
    // 如果需要分页器
    pagination: '.swiper-pagination',
});


var mySwiper1 = new Swiper ('.swiper-container1', {
    direction: 'horizontal',
    loop: true,
    speed:1000,
    autoplay : 4000,
    autoplayDisableOnInteraction : false,
    slidesPerView : 3,
    spaceBetween : 20,
    lazyLoading : true,
});

//IScroll实例化过程
function loaded () {
    var myScroll,
                pullDown = $("#pullDown"),
                pullUp = $("#pullUp"),
                pullDownLabel = $(".pullDownLabel"),
                pullUpLabel = $(".pullUpLabel"),
                container = $('#list'),
                loadingStep = 0;//加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新

        pullDown.hide();
        pullUp.hide();

        myScroll = new IScroll("#wrapper", {
            scrollbars: false,
            mouseWheel: false,
            interactiveScrollbars: true,
            shrinkScrollbars: 'scale',
            fadeScrollbars: true,
            scrollY:true,
            probeType: 2,
            bindToWrapper:true
        });
        myScroll.on("scroll",function(){
            if(loadingStep == 0&&!pullDown.attr("class").match('refresh|loading') && !pullUp.attr("class").match('refresh')){
                if(this.y > 40){//下拉刷新操作
                    $(".pulldown-tips").hide();
                    pullDown.addClass("refresh").show();
                    pullDownLabel.text("松手刷新数据");
                    loadingStep = 1;
                    myScroll.refresh();
                }else if(this.y < (this.maxScrollY - 14)){//上拉加载更多
                    pullUp.addClass("refresh").show();
                    pullUpLabel.text("正在载入");
                    loadingStep = 1;
                    pullUpAction();
                }
            }
        });
        myScroll.on("scrollEnd",function(){
            if(loadingStep == 1){
                if( pullDown.attr("class").match("refresh") ){//下拉刷新操作
                    pullDown.removeClass("refresh").addClass("loading");
                    pullDownLabel.text("正在刷新");
                    loadingStep = 2;
                    pullDownAction();
                }
            }
        });

    function pullDownAction(){
        setTimeout(function(){
            // var li, i;
            // for (i = 0,li = ""; i < 3; i++) {
            //     li += "<li>" + "new Add " + new Date().toLocaleString() + " ！" + "</li>";
            // }
            // container.prepend(li);
            pullDown.attr('class','').hide();
            myScroll.refresh();
            loadingStep = 0;
            $(".pulldown-tips").show();
        },1000);
    }
    function pullUpAction(){
        setTimeout(function(){
            // var li, i;
            // for (i = 0,li = ""; i < 3; i++) {
            //     li += "<li>" + "new Add " + new Date().toLocaleString() + " ！" + "</li>";
            // }
            // container.append(li);
            pullUp.attr('class','').hide();
            myScroll.refresh();
            loadingStep = 0;
        },1000);
    }

    document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
    }

    //刷新页面 出现附近商品的数量； 上拉  下拉 zepto中 没有slideDown() slideUp()方法
    document.addEventListener('touchmove', function (event) {
        event.preventDefault();
    }, false);
    $("#head").show(400).animate({
        top:"8vh"
    }, 600);

    setTimeout(function(){
        $("#head").animate({
            top:"5.5vh"
        }, 800);
    },1500);

    //ajax加载数据 content部分
    about_content2();
    function  about_content2(){
        $.get("../json/index.json", function(data){
            var html = "";
            $.each(data[3],function(i,o){
                html   +=    "<li group=\""+o.group+"\" data-id=\""+o.sp+"\">"
                        +    "<div>"
                        +    "<img src=\"../imgs/"+o.content.src+"\" alt=\"\">"
                        +    "</div>"
                        +    "<div>"
                        +    "<p>"+o.content.hotel+"</p>"
                        +    "<p>￥<span>"+o.content.price+"</span>元起</p>"
                        +    "</div>"
                        +    "<div>"
                        +    "<p>"+o.content.desc+"</p>"
                        +    "</div>"
                        +    "<div>"
                        +    "<p><span class=\"iconfont\">&#xe612;</span>"+o.area+"</p>"
                        +    "<p>"
                        +    "<span class=\"iconfont\">&#xe603;</span>"
                        +    "有<i>"+o.content.peoNum+"</i>人住过"
                        +    "</p>"
                        +    "</div>"
                        +    "</li>"
            });
            $(".ul1").html("<li class=\"about_main\"><p></p><p>主题酒店精选</p><p></p></li>" + html );
        });
    }


    setTimeout(function(){
        $("li").on("tap",function(e){
            localStorage.setItem("id",$(this).attr("data-id"));
            localStorage.setItem("group",$(this).attr("group"));
            localStorage.setItem("backPage", "about.html");
            window.location = "store.html";
        });
    },500);

//获取当前地址信息
$("#about_top div i").html(localStorage.getItem("address"));