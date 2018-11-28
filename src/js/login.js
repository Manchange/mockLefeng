    require(["config"],function(){
    require(["jquery","common"],function(){
        jQuery(function($){
            //验证手机号
            $("#username").focusout(function(){
                let username=$("#username").val();
                username=$.trim(username);
                if(username.length == 0 ||!(/^1[3,8]\d{9}$/g.test(username))){
                    $(".num").addClass("error").html("手机号格式不正确");
                    return false;
                }else{
                    $(".num").removeClass("error").html("&nbsp;");
                }
            });
            //验证密码
            $("#password").focusout(function(){
                let password=$("#password").val();
                password=$.trim(password);
                if(password.length==0||!(/^[\w\-]{6,16}$/i.test(password))){
                    $(".mima").addClass("error").html("密码格式不正确");
                    return false;
                }else{
                    $(".mima").removeClass("error").html("&nbsp;");
                }
            });
            //生成验证码
            var randomLetter = parseInt(Math.random()*9000+1000);
            $(".yanma").html(randomLetter).css('backgroundColor','pink');
            $(".syanma").click(function(){
                var randomLetter = parseInt(Math.random()*9000+1000);
            $(".yanma").html(randomLetter).css('backgroundColor','pink');
            });
            //校验验证码
            $("#sure").focusout(function(){
                let randomCode=$(".yanma").html();
                randomCode=$.trim(randomCode);
                let sure=$("#sure").val();
                sure=$.trim(sure);
                if(sure.length==0){
                    $(".yanzhengma").addClass("error").html("请输入验证码");
                }else if(sure!=randomCode){
                    $(".yanzhengma").addClass("error").html("验证码错误，请重新获取");
                    return false;
                }else{
                    $(".yanzhengma").removeClass("error").html("&nbsp;");
                }
            });
            //点击提交注册信息
            $(".button").click(function(){
                var _username=$("#username").val();
                username=$.trim(username);
                var _pwd=$("#password").val();
                password=$.trim(password);
                let pwdAgain=$("#pwdAgain").val();
                pwdAgain=$.trim(pwdAgain);
                var randomCode=$(".yanma").html();
                randomCode=$.trim(randomCode);
                var sure=$("#sure").val();
                sure=$.trim(sure);
                if(_username.length===0||_pwd.length===0||sure!=randomCode){
                   alert("注册信息错误，请重新填写");
                }else{
                    yan(_username,_pwd);
                };
            });
            function yan(_username,_pwd){
                $.ajax({
                    type:'get',
                    url:"../api/login.php",
                    data:{
                        username:_username,
                        password:_pwd
                    },
                    success:function(data){
                        console.log(data);
                        if(data=='请注册账户'){
                            console.log(222);
                            $(".num").addClass("error").html(data);
                        }else if(data=='账户密码有误'){
                            console.log(111);
                            $(".num").addClass("error").html(data)
                        }else if(data=="登录成功"){
                            location.href="../index.html"
                        }
                    }
                });
            }
        })
    })//第二个require
})//第一个require