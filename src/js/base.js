require(["config"],()=>{
    require(["jquery","common"],()=>{
        jQuery(function($){
            $(document).ready(function(){
                function fixt(){
                    var fixtop = $(window).height()-$('.fixed').outerHeight()-40;
                    $('.fixed').css('top',fixtop);
                };
                fixt();
                $(  window).resize(function(){
                    fixt();
                });
                // 滚动判断
                function bctop(){
                    if($(window).scrollTop()>270){
                        $('.bctop').css('display','block');
                    }else if($(window).scrollTop()<=270){
                        $('.bctop').css('display','none');
                    }
                };
                bctop();
                $(window).scroll(function(){
                    bctop();
                });
                // 悬浮返回效果
                $('.bctop').click(function(e){
                    if(e.target.className ==='bctop'||e.target.tagName==='I'){
                        $("html,body").animate({scrollTop:0},1000);
                    };
                });
                // 区域选择效果
                $('.dress,.areaSell').mouseover(()=>{
                    $('.areaSell').css('display','block');
                });
                $('.areaSell').mouseout(()=>{
                    $('.areaSell').css('display','none');
                })
                $('.areaSell').click((e)=>{
                    if(e.target.tagName==='A'){
                        console.log(1);
                        $('.dressName').text(e.target.text);
                        $('.areaSell').css('display','none');
                    }
                });
                $('.mycar,.carlist').mouseover(()=>{
                    $('.carlist').css('display','block');
                });
                $('.carlist').mouseout(()=>{
                    $('.carlist').css('display','none');
                })
            });
        });
    });
})