require(["config"],()=>{
    require(["jquery","common","base"],()=>{
        jQuery(($)=>{
            $(document).ready(function(){
                //轮播图动画
                var img = $('.banner img');
                var page = $('.page span');
                var idx = 0;
                page[idx].style.backgroundColor = '#ff5566';
                img[idx].style.opacity = '1';
                img[idx].style.zIndex = '2';
                var timer = setInterval(autoplay, 2000);
                        
                $('.banner').mouseover(function(event){
                    clearInterval(timer);
                    if(event.target.tagName=="SPAN"){
                        var index = $('.page span').index(event.target);
                        idx = index;
                        for(var j=0;j<page.length;j++){
                            judge(j,index);
                        }
                    }
                });
                $('.banner').mouseout(()=>{
                    timer = setInterval(autoplay, 2000);
                })
                function autoplay(){
                    idx++;
                    show();
                }
                function show(){
                    if(idx>img.length-1){
                        idx = 0;
                    }
                    for(var i = 0;i<page.length;i++){
                        judge(i,idx);
                    }
                }
                function judge(i,idx){
                    if(i==idx){
                        page[i].style.backgroundColor = 'red';
                        img[i].style.opacity = '1';
                        img[i].style.transition = 'opacity 1s'
                        img[i].style.zIndex = '2';
                    }
                    else{
                        page[i].style.backgroundColor = '#333';
                        img[i].style.opacity = '0';
                        img[i].style.transition = 'opacity 1s'
                        img[i].style.zIndex = '1';
                    }
                };
                //品牌请求
                $.ajax({
                    url:'../api/getBrand.php',
                    type:'get',
                    dataType:'json',
                    success:function(data){
                    var str = '';
                    $.each(data,function(index,item){
                        str+='<div class="brand-item" data-guid="'+item.num+'"><a href="html/goodsList.html" title="'+item.brand+'"><img data-org="'+item.imgurl+'" src="" /><p class="pms">'+item.hui+'</p></a><p class="info"><span>'+item.sale+'</span> '+item.brand+'</p></div>'
                    });
                    $('.brand').html(str);
                        var pms = $('.pms');
                        $.each(pms,function(index,item){
                            if(item.innerHTML===''){
                                item.parentNode.removeChild(item);
                            }
                        });
                        var brandItem = $('.brand-item');
                        function run(){
                            $.each(brandItem,(index,item)=>{
                                var childs = item.children[0].children[0];  
                                if(item.offsetTop-$(window).scrollTop()<$(window).height()&&childs.src != childs.getAttribute('data-org')){
                                    childs.src = childs.getAttribute('data-org');
                                }
                            });
                        };
                        run();
                        $(window).scroll(function(){
                            run();
                        });
                    }
                });
                //商品请求
                $.ajax({
                    url:'../api/getGoods.php',
                    type:'get',
                    dataType:'json',
                    success:function(data){
                    var str = '';
                    $.each(data,function(index,item){
                        str+='<div class="goods-item fl" data-guid="'+item.num+'"><ul><li ><a href="html/detail.html?id='+item.num+'" title="'+item.title+'"><img class="pic" data-org="'+item.imgurl+'" src="" /></a></li><li class="gtil"><b>'+item.cont+'\/</b>'+item.title+'</li><li class="price"><span>￥'+item.price+'</span><del>￥'+item.oldprice+'</del><button class="gbtn fr">加入购物车</button></li></ul></div>'
                    });
                    $('.sale').html(str);
                    var goodsItem = $('.goods-item');
                        function run(){
                            $.each(goodsItem,(index,item)=>{
                                var childs = item.children[0].children[0].children[0].children[0];
                                if(item.offsetTop-$(window).scrollTop()<$(window).height()&&childs.src != childs.getAttribute('data-org')){
                                    childs.src = childs.getAttribute('data-org');
                                }
                            });
                        };
                        run();
                        $(window).scroll(function(){
                            run();
                        });
                        $('.goods-item').click((e)=>{
                            var ul = e.target.parentNode.parentNode;
                            var guid = ul.parentNode.getAttribute('data-guid');
                            var title = ul.children[0].children[0].title;
                            var discount = ul.children[1].children[0].innerHTML.slice(0,-1);
                            var oldprice = ul.children[2].children[0].innerHTML.slice(1);
                            var price = ul.children[2].children[1].innerHTML.slice(1);
                            var reg = /img\/.*?(jpg)$/gi;
                            var imgurl = (ul.children[0].children[0].children[0].src).match(reg).toString();
                            setinaj(guid,discount,title,oldprice,price,imgurl);
                        })
                    }
                });
                $('.pro-btn').click((e)=>{
                    if(e.target.className=='pro-btn'){
                        var pa = e.target.parentNode;
                        var discount = pa.children[1].children[0].innerHTML.slice(0,-1);
                        var guid = pa.children[1].children[1].getAttribute('dataGuid');
                        var title = pa.children[1].children[1].innerHTML;
                        var price = pa.children[2].innerHTML.slice(1);
                        var oldprice = pa.children[3].innerHTML.slice(1);
                        var reg = /img\/.*?(jpg)$/gi;
                        var imgurl =(pa.children[5].src).match(reg).toString();
                        setinaj(guid,discount,title,oldprice,price,imgurl);
                    }
                });
                function setinaj(guid,discount,title,oldprice,price,imgurl){
                        $.ajax({
                            url:'../api/insert.php',
                            type:'get',
                            data:{
                                guid:guid,
                                discount:discount,
                                title:title,
                                oldprice:oldprice,
                                price:price,
                                imgurl:imgurl,
                                qty:1
                            },
                        });
                        pros();
                    };
                    //读取购物车数据
                function pros(){
                    $.ajax({
                        url:'../api/getCarlist.php',
                        type:'get',
                        dataType:'json',
                        success:function(data){
                            var str = `<ul>`;
                            var total = 0;
                            var qtyall = 0;
                            $.each(data,function(index,item){
                                total+=item.price*item.qty;
                                qtyall+=item.qty*1;
                                str+=`<li class="allitem" guid="${item.id}">
                                <span class="allimg">
                                    <a href="#">
                                        <img src="${item.imgurl}" />
                                    </a>
                                </span>
                                <span class="alltitle">
                                    <a href="#">
                                        ${item.title}
                                    </a>
                                </span>
                                <span class="allprice fr">
                                    <b>￥${item.price}</b><i>x${item.qty}</i>
                                </span>`
                            });
                            $('.carnum').text(qtyall);
                            str+=`</ul>
                            <div class="total clearfix">
                                <p>
                                    <span class="allnum">共<i>${qtyall}</i>件商品</span>
                                    <span class="sum">共计:<b>￥${total}</b></span>
                                </p>
                                <a href="html/showcart.html" target="_blank">去购物车结算</a>`;
                            $('.caritems').html(str);
                        }
                    });
                };
                pros();
                // 滚动判断
                function scro(){
                    if($(window).scrollTop()>270){
                        $('.fixed').css('display','block');
                        $('.bctop').css('display','block');
                    }else if($(window).scrollTop()<=270){
                        $('.fixed').css('display','none');
                        $('.bctop').css('display','none');
                    }
                    var brandft = $('.brandFix').offset().top;
                    var brandt = $('#brand').offset().top;
                    var brandth = $('#brand').offset().top+$('#brand').outerHeight();
                    if(brandft>=brandt&&brandft<=brandth){
                        $('.brandFix').css('backgroundPosition','0 -306px');
                    }else{
                        $('.brandFix').css('backgroundPosition','-67px -306px');
                    }
                    var hotft = $('.hotFix').offset().top;
                    var hott = $('#hot').offset().top;
                    var hotth = $('#hot').offset().top+$('#hot').outerHeight();
                    if(hotft>=hott&&hotft<=hotth){
                        $('.hotFix').css('backgroundPosition','0 -381px');
                    }else{
                        $('.hotFix').css('backgroundPosition','-67px -381px');
                    }
                };
                scro();
                $(window).scroll(function(){
                    scro();
                });
                // 悬浮返回效果
                $('.brandFix,.hotFix,.bctop').click(function(e){
                    if(e.target.className ==='brandFix'){
                        $("html,body").animate({scrollTop:$('#brand').offset().top},500);
                    }else if(e.target.className ==='hotFix'){
                        $("html,body").animate({scrollTop:$('#hot').offset().top},500);
                    }else if(e.target.className ==='bctop'||e.target.tagName==='I'){
                        $("html,body").animate({scrollTop:0},1000);
                    };
                });
                $('.ewmClose').click(()=>{
                    $('.ewm').css('display','none');
                });
            });
        });
    });
})