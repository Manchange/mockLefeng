require(["config"],()=>{
    require(["jquery","common","base"],()=>{
        jQuery(function($){
            $('.more').slideUp("fast");
            $('.menu-btn').hover(()=>{
                $('.more').slideDown("slow");
            },()=>{
                $('.more').slideUp("fast");
            });
            //分享
            $('.share').hover(()=>{
                $('.alink').css('display','block');
            },
            ()=>{
                $('.alink').css('display','none');
            });
            var url = decodeURI(location.search.slice(1));
            var str = url.split('=');
            var detid = str[1];
            //ajax请求详情信息
            $.ajax({
                url:'../api/getGoodItem.php',
                data:{
                    id:detid
                },
                dataType:'json',
                success:function(data){
                    console.log(data);
                    var strp = ''
                    $.each(data,(index,item)=>{
                        $('.dtitle').html(item.title);
                        $('.ptitle').html(item.title);
                        $('.cpic').attr('src','../'+item.imgurl);
                        $('.cpic').attr('dguid',item.num);
                        $('.dprice').html(item.price);
                        $('.dcount').html(item.cont+'折');
                        $('.doldprice').html(item.oldprice);
                        strp+=`<ul class="clearfix">
                            <li><img src="../${item.imgurl}" /></li>
                            <li>
                                <span>${item.title}</span>
                                <del>￥${item.oldprice}</del>
                                <i>￥${item.price}</i>
                            </li>
                        </ul>`;
                    });
                    $('.litileCar').html(strp);
                    $('.addcar').click(()=>{
                        var dguid = $('.cpic').attr('dguid');
                        var dtitle = $('.dtitle').text();
                        var imgurl = $('.cpic').attr('src');
                        var price = $('.dprice').text();
                        var oldprice = $('.doldprice').text();
                        var discount = $('.dcount').text();
                        var qty = $('.addNum').val();
                        go(dguid,dtitle,discount,oldprice,price,imgurl,qty);
                        $('.addNum').val(1);
                    })
                }
            });
            //购物车数据比对
            function go(guid,title,discount,oldprice,price,imgurl,qty){
                $.ajax({
                    url:'../api/resetCar.php',
                    data:{
                        id:guid,
                        title:title,
                        discount:discount,
                        oldprice:oldprice,
                        price:price,
                        imgurl:imgurl,
                        qty:qty
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
                                    <a href="detail.html?id=item.id">
                                        <img src="../${item.imgurl}" />
                                    </a>
                                </span>
                                <span class="alltitle">
                                    <a href="detail.html?id=item.id">
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
                                <a href="showcart.html" target="_blank">去购物车结算</a>`;
                            $('.caritems').html(str);
                        }
                    });
                };
                pros();
            //数量加减
            $('.jian,.jia').click((e)=>{
                if(e.target.className =='jian'){
                    if($('.addNum').val()<=1){
                        $('.addNum').val(1);
                    }else{
                        $('.addNum').val($('.addNum').val()-1);
                    }
                }else if(e.target.className =='jia'){
                    $('.addNum').val($('.addNum').val()*1+1);
                }
            });
            function xi(){
                if($(window).scrollTop()>770){
                    $('.mounting').addClass('mactive');
                    $('.buy').css('display','block');
                }else{
                    $('.mounting').removeClass('mactive');
                    $('.buy').css('display','none');
                };
                var wt = $(window).scrollTop()+50;
                if(wt>$('#detail1').offset().top&&wt<$('#detail1').offset().top+$('#detail1').height()){
                    $('.mount1').addClass('down');
                    $('.mount2').removeClass('down');
                }else if(wt>$('#detail2').offset().top&&wt<$('#detail2').offset().top+$('#detail2').height()){
                    $('.mount1').removeClass('down');
                    $('.mount2').addClass('down');
                }else{
                    $('.mount1').removeClass('down');
                    $('.mount2').removeClass('down');
                }
            };
            xi();
            //吸顶判断
            $(window).scroll(()=>{
                xi();
            });
            //点击
            $('.mount1,.mount2').click((e)=>{
                console.log(e.target);
                if(e.target.className=='mount1'){
                    console.log(1);
                    $("html,body").animate({
                        scrollTop:$('#detail1').offset().top},500);
                }else if(e.target.className=='mount2'){
                    console.log(2);
                    $("html,body").animate({
                        scrollTop:$('#detail2').offset().top},500);
                }
            });
        });//jquery
    });//第二层require
})// 第一层require