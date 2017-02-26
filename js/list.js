
//加载页面
setTimeout(function(){
 loaded ();
},500)

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
            bindToWrapper:true,
            useTransition: false,
            momentum: false,
           useTransform: false,
           hScrollbar:false,
           vScrollbar:false,
           lockDirection:true,
           hScroll :false
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





    //ajax加载数据 content1部分

    list_content1();
    function  list_content1(){

        $.get("../json/index.json", function(data){
            var html = "";
            $.each(data[1],function(i,o){
                html +=     "<li group=\""+o.group+"\" data-id=\""+o.sp+"\" style=\"background:url(../imgs/"+o.content.src+");background-size:cover\">"
                    +        "<div>"
                    +        "<div class=\"descript\">"
                    +        "<p>"+o.content.hotel+"<span class=\"iconfont\">&#xe61c;</span></p>"
                    +        "<p class=\"iconfont\">&#xe601;&#xe601;&#xe601;&#xe601;&#xe660;"
                    +        "<span>￥<i>"+o.content.price+"</i>/人</span>"
                    +        "</p>"
                    +        "<P>"
                    +        "<span>"
                    +        "<span>"+o.style+"</span> | <span>"+o.area+"</span>"
                    +        "</span>"
                    +        "<span>"+o.content.distance+"km</span>"
                    +        "</P>"
                    +        "<P>"
                    +        "<span class=\"iconfont\">&#xe604;</span>"
                    +        "<i>"+o.content.peoNum+"</i>人消费"
                    +        "</P>"
                    +        "</div>"
                    +        "</div>"
                    +        "</li>"
            });
            $(".ul1").html(html);
        });
    }

    //ajax加载数据 content1部分

    list_content2();
    function  list_content2(){
        $.get("../json/index.json", function(data){
            var html = "";
            $.each(data[2],function(i,o){
                html    +=  "<li group=\""+o.group+"\" data-id=\""+o.sp+"\">"
                        +    "<div>"
                        +    "<img src=\"../imgs/"+o.content.src+"\" alt=\"\">"
                        +    "</div>"
                        +    "<div>"
                        +    "<p>"+o.content.hotel+"</p>"
                        +    "<p>"+o.content.bed.double[2]+"</p>"
                        +    "<p>"
                        +    "<span>￥<span>"+o.content.price+"</span>元起</span>"
                        +    "<span>已有<i>"+o.content.peoNum+"</i>人订购</span>"
                        +    "</p>"
                        +    "</div>"
                        +    "</li>"
            });
            $(".ul2").html("<li>无更多商家，看看一下优惠吧</li>" + html );
        });
    }


    //点击获取 并跳转到详情页面
    setTimeout(function(){
        $("li").on("tap",function(e){
			//把id 和 group 进行本地存储 让详情页获取
            localStorage.setItem("id",$(this).attr("data-id"));
            localStorage.setItem("group",$(this).attr("group"));
            localStorage.setItem("backPage", "list.html");
            window.location = "store.html";
        });
    },500);


    //热门 各种类型的房间的数据拉取   #desc
    $("#desc>div").on("touchend",function(){
        // 让界面回到顶部
        loaded ();
        
        var $this = $(this);
        $(this).parent().children().attr("class","");
        $(this).attr("class","color");

        if($this.html() != "热门"){
            $.get("../json/index.json", function(data){
                var html = "";
                $.each(data[1],function(i,o){
                    if(o.style == $this.html()){
                        html +=     "<li group=\""+o.group+"\" data-id=\""+o.sp+"\" style=\"background:url(../imgs/"+o.content.src+");background-size:cover\">"
                            +        "<div>"
                            +        "<div class=\"descript\">"
                            +        "<p>"+o.content.hotel+"<span class=\"iconfont\">&#xe61c;</span></p>"
                            +        "<p class=\"iconfont\">&#xe601;&#xe601;&#xe601;&#xe601;&#xe660;"
                            +        "<span>￥<i>"+o.content.price+"</i>/人</span>"
                            +        "</p>"
                            +        "<P>"
                            +        "<span>"
                            +        "<span>"+o.style+"</span> | <span>"+o.area+"</span>"
                            +        "</span>"
                            +        "<span>"+o.content.distance+"km</span>"
                            +        "</P>"
                            +        "<P>"
                            +        "<span class=\"iconfont\">&#xe604;</span>"
                            +        "<i>"+o.content.peoNum+"</i>人消费"
                            +        "</P>"
                            +        "</div>"
                            +        "</div>"
                            +        "</li>"
                    }

                });
                $(".ul1").html(html);
            });


        }else{
            list_content1();
        }
        //点击获取 并跳转到详情页面
        setTimeout(function(){
            $("li").on("tap",function(e){
                //把id 和 group 进行本地存储 让详情页获取
                localStorage.setItem("id",$(this).attr("data-id"));
                localStorage.setItem("group",$(this).attr("group"));
                localStorage.setItem("backPage", "list.html");
                window.location = "store.html";
            });
        },500);
    });


//数据当前定位地址获取
$("#header b").html(localStorage.getItem("address")).on("touchend", function(ev){
    localStorage.setItem("backPage", "list.html");
    window.location.href = "City-page.html";
});

//存储当前页面路径
$("#header div").eq(1).on("touchend", function(ev){
    localStorage.setItem("backPage", "list.html");
    window.location.href = "list_seo.html";
});