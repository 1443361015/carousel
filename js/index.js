var marleft = 0,
    val;
$(function(){
    $("ul>li").each(function(){
        $("nav").append(`<input name="radio" type="radio">`);
    });
    $("input:nth-child(1)").prop("checked",true).attr("checked",true);
    $("ul").append('<li></li>');
    //li的长度
    var li_leng = $("ul>li").length;
    //设置ul的宽度
    $("ul").css({"width": li_leng*100 + '%'});
    //设置li的宽度
    $("ul>li").css({"width": 100/li_leng + '%'});
    //给input绑定事件
    $('input[type="radio"]').change(function(){
        //停止定时函数
        window.clearInterval(val);
        //调用轮播函数
        carousel(-($(this).index())*100);
        //重新启动定时函数
        xunhuan();
    });
    //hover事件暂停
    //ulHover();
    //左右切换键事件
    leftRightBtn();
    //启动定时函数
    xunhuan();
});
//轮播
function carousel(leftnum){
    //li的长度
    var li_leng = $("ul>li").length;
    if(leftnum > -(li_leng - 1)*100 && leftnum <=0){
        marleft = leftnum;
    }else{
        marleft -= 100;
    }
    var num = -marleft/100;
    if(num == li_leng - 1){
        num = 0;
    }
    $('input[type="radio"]').eq(num).prop("checked",true).attr("checked",true).siblings().removeAttr("checked");
    //最大位移长度
    let marle = -(li_leng - 1)*100;
    if(marleft <= marle){
        setTimeout("old();",1000);
    }
    $("ul").css({
        "transition": "1s",
        "margin-left": marleft+'%'
    });
}
function old(){
    marleft = 0;
    $("ul").css({
        "transition": "0.001s",
        "margin-left": marleft+'%'
    });
}
//ul的hover事件
function ulHover(){
    $("ul").hover(function(){
        //停止定时函数
        window.clearInterval(val);
        },function(){
        //重新启动定时函数
        xunhuan();
    });
}
function xunhuan(){
    var t = setInterval("carousel();",4000);
    val = t;
}
function leftRightBtn(){
    //左点击
    $(".leftBtn").click(function(){
        //停止定时函数
        window.clearInterval(val);
        if(marleft == 0){
            var li_leng = $("ul>li").length;
            marleft = -(li_leng - 1)*100;
            $("ul").css({
                "transition": "0.001s",
                "margin-left": marleft+'%'
            });
            //延迟后续函数
            setTimeout("leftfrist()",50);
        }else{
            leftfrist();
        }
    });
    //右点击
    $(".rightBtn").click(function(){
        //停止定时函数
        window.clearInterval(val);
        //调用轮播函数
        carousel(marleft-100);
        //重新启动定时函数
        xunhuan();
    });
}
//换左边函数
function leftfrist(){
    //调用轮播函数
    carousel(marleft+100);
    //重新启动定时函数
    xunhuan();
}