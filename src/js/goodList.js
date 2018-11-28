require(["config"],()=>{
    require(["jquery","common","base"],()=>{
        jQuery(function($){
            $('.more').slideUp("fast");
            $('.menu-btn').hover(()=>{
                $('.more').slideDown("slow");
            },()=>{
                $('.more').slideUp("fast");
            });
            var dsort = 0;//折扣排序的参数
            var psort = 0;//价格排序的参数
            var ssort = 0;//销量排序的参数
            var sort = 'asc';
            var num = 0;//请求数量
            var type = 0;
            //按折扣排序
            $('.qcount').click(()=>{
                $('.fprice').removeClass('active1','active2');
                $('.qsale').removeClass('active1','active2');
                psort = 0;
                ssort = 0;
                type = 'cont';
                dsort++;
                if(dsort%3===1){
                    $('.qcount').addClass('active1');
                }else if(dsort%3===2){
                    $('.qcount').addClass('active2');
                    $('.qcount').removeClass('active1');
                }else if(dsort%3===0){
                    type = 0;
                    $('.qcount').removeClass('active2');
                }
                qgood(num,type,dsort);
            });
            //按价格排序
            $('.fprice').click(()=>{
                $('.qcount').removeClass('active1','active2');
                $('.qsale').removeClass('active1','active2');
                ssort = 0;
                dsort = 0;
                type = 'price';
                psort++;
                if(psort%3===1){
                    $('.fprice').addClass('active1');
                }else if(psort%3===2){
                    $('.fprice').addClass('active2');
                    $('.fprice').removeClass('active1');
                }else if(psort%3===0){
                    type = 0;
                    $('.fprice').removeClass('active2');
                }
                qgood(num,type,psort);
            });
            //按销量排序
            $('.qsale').click(()=>{
                $('.qcount').removeClass('active1','active2');
                $('.fprice').removeClass('active1','active2');
                psort = 0;
                dsort = 0;
                type = 'salenum';
                ssort++;
                if(ssort%3===1){
                $('.qsale').addClass('active1');
                }else if(ssort%3===2){
                    $('.qsale').addClass('active2');
                    $('.qsale').removeClass('active1');
                }else if(ssort%3===0){
                    type = 0;
                    $('.qsale').removeClass('active2');
                }
                qgood(num,type,ssort);
            });
            $(window).scroll(()=>{
                var qfoot = $('.footer').offset().top;
                var wint = ($(window).scrollTop()+$(window).height());
                if(wint>qfoot){
                    num++;
                    if(wint>qfoot&&num<=4){
                        qgood(num,type,psort);
                    }
                }
            });
            function qgood(num,type,psort){
                if(psort%3===1){
                    sort = 'desc';
                }else if(psort%3===2){
                    sort = 'asc';
                }else if(psort%3===0){
                    type = 0;
                };
                $.ajax({
                    url:'../api/qgood.php',
                    type:'get',
                    data:{
                        num:num,
                        type:type,
                        sort:sort
                    },
                    dataType:'json',
                    success:function(data){
                            var str = '';
                            $.each(data,function(index,item){
                                str+=`<ul>
                                  <li>
                                    <a href="detail.html?id=${item.num}" title="${item.title}">
                                        <img class="pic" src="..\/${item.imgurl}" />
                                    </a>
                                  </li>
                                  <li class="qtil" dataGuid="${item.num}">${item.title}</li>
                                  <li class="qprice">
                                    <span>￥${item.price}</span>
                                    <b>(${item.cont}折)</b>
                                    <del>￥${item.oldprice}</del>
                                  </li>
                                    <button class="gbtn">加入购物车</button>
                                    </ul>`
                            });
                            $('.qpro').append(str);
                            $('.gbtn').click((e)=>{
                                if(e.target.className=='gbtn'){
                                    var pa = e.target.parentNode;
                                    var discount = pa.children[2].children[1].innerHTML.slice(1,-1);
                                    console.log(discount);
                                    var guid = pa.children[1].getAttribute('dataGuid');
                                    console.log(guid);
                                    var title = pa.children[1].innerHTML;
                                    console.log(title);
                                    var price = pa.children[2].children[0].innerHTML.slice(1);
                                    console.log(price);
                                    var oldprice = pa.children[2].children[2].innerHTML.slice(1);
                                    console.log(oldprice);
                                    var reg = /img\/.*?(jpg)$/gi;
                                    var imgurl =(pa.children[0].children[0].children[0].src).match(reg).toString();
                                    console.log(imgurl);
                                    setinaj(guid,discount,title,oldprice,price,imgurl);
                                }
                            });
                    }
                });
            };
            qgood(num,type,psort);
            //加入购物车
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
            function pros(){
                    $.ajax({
                        url:'../api/getCarlist.php',
                        type:'get',
                        dataType:'json',
                        success:function(data){
                            var qtyall = 0;
                            $.each(data,(index,item)=>{
                                qtyall+=item.qty*1;
                            });
                            $('.carnum').text(qtyall);
                        }
                    });
                };
                pros();
        });//jquery
    });//第二层require
})// 第一层require