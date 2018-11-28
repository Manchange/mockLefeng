require(["config"],()=>{
    require(["jquery","common","base"],()=>{
        jQuery(function($){
            $('.search input').focus(()=>{
                $('.search input').val('');
            });
            console.log($('.car2').height());
            //页面切换
            // if($('.car2').height()>630){
            // $('.car2').css('display','block');
            // $('.car1').css('display','none');
            // }else{
            // $('.car2').css('display','none');
            // $('.car1').css('display','block');
            // }
            //优惠券隐藏和显示
                //按钮的变化判断
            var a = 1;
            $('.quan').slideUp('slow');
            $('.sykq').click(()=>{
                if(a==1){
                    $('.sykq i').css('background-position','0 -35px');
                    $('.quan').slideDown('slow');
                    a = 2;
                }else if(a==2){
                    $('.sykq i').css('background-position','0 -18px');
                    $('.quan').slideUp('slow');
                    a = 1;
                }
            });
            //优惠券切换
            $('.qcq').addClass('cactive');
            $('.qcq,.zcq').click((e)=>{
                if(e.target.className==='qcq'){
                    $('.qcq').addClass('cactive');
                    $('.zcq').removeClass('cactive');
                    $('.qyhq').css('display','block');
                    $('.zyhq').css('display','none');
                }else if(e.target.className==='zcq'){
                    $('.zcq').addClass('cactive');
                    $('.qcq').removeClass('cactive');
                    $('.zyhq').css('display','block');
                    $('.qyhq').css('display','none');
                }
            });
            //读取购物车数据
                function pros(){
                    $.ajax({
                        url:'../api/getCarlist.php',
                        type:'get',
                        dataType:'json',
                        success:function(data){
                            var str = '';
                            var qty = 0;
                            var total = 0;
                            $.each(data,(index,item)=>{
                                qty+=item.qty*1;
                                total+=item.price*item.qty;
                                 add = item.price*item.qty;
                                str+=`
                                    <tr class="firstr">
                                        <td class='th1 td1'>
                                        <span class="mj">满减</span>
                                        <i class="xiang">跨品牌满199元减100</i>
                                        </td>
                                        <td class='th2'></td='th3'></td>
                                        <td class>
                                        <td class='th4'></td>
                                        <td class='th5'></td>
                                    </tr>
                                    <tr>
                                        <td class="th1">
                                            <img src="../${item.imgurl}" />
                                            <span class="title" guid="${item.id}">${item.title}</span>
                                        </td>
                                        <td class="th2">
                                            <span>￥${item.price}</span><br>
                                            <del>￥${item.oldprice}</del>
                                        </td>
                                        <td class="th3">
                                            <p>
                                                <button class="jian">-</button>
                                                <input type="text" value="${item.qty}" class="addNum"/>
                                                <button class="jia">+</button>
                                            </p>
                                        </td>
                                        <td class="th4">
                                            <p class="addprice">￥${add}</p>
                                            <p class="youh">已优惠￥100</p>
                                        </td>
                                        <td class="th5">
                                            <i class="close">删除</i>
                                        </td>
                                        </tr>`
                            });
                            $('.tbody').html(str);
                            $('.carqty').html(qty);
                            $('.cqp').html('￥'+total);
                            blurs();
                            sum();
                            del();
                        }
                    });
                };
                pros();
            //数量加减
            function sum(){
                $('.jian,.jia').click((e)=>{
                    var id ='';
                    var input ='';
                    var add = $('.pall').text().slice(1)*1;
                    console.log(add);
                    if(e.target.className =='jian'){
                        var fa = e.target.parentNode.parentNode.parentNode;
                        var val = fa.children[2].children[0].children[1];
                            id = fa.children[0].children[1].getAttribute('guid');
                        if(val.value<=1){
                            val.value=1;
                            input=val.value;
                        }else{
                            val.value-=1;
                            input=val.value;
                        }
                    }else if(e.target.className =='jia'){
                        var fa = e.target.parentNode.parentNode.parentNode;
                        var val = fa.children[2].children[0].children[1];
                            id = fa.children[0].children[1].getAttribute('guid');
                        val.value=val.value*1+1;
                        input=val.value;
                    };
                    ajaxs(id,input);
                });
            };
            function ajaxs(id,qty){
                $.ajax({
                    url:'../api/carupdata.php',
                    data:{
                        id:id,
                        qty:qty
                    },
                });
                pros();
            };
            //删除商品时刷新页面
            function del(){
                $('.close').click((e)=>{
                    if(e.target.className=='close'){
                        var fa = e.target.parentNode.parentNode;
                        var id = fa.children[0].children[1].getAttribute('guid');
                        console.log(fa);
                        $.ajax({
                            url:'../api/del.php',
                            data:{
                                id:id
                            },
                        });
                        pros();
                    };
                });
            };
            //失去焦点时重新加载页面
            function blurs(){
                $('.addNum').blur((e)=>{
                 if(e.target.className==='addNum'){
                    var qty = e.target.value;
                    var fa = e.target.parentNode.parentNode.parentNode;
                    var id = fa.children[0].children[1].getAttribute('guid');
                    var price = fa.children[1].children[0].innerHTML.slice(1);
                    ajaxs(id,qty);
                }
            });
            };
        });//jquery
    });//第二层require
})// 第一层require