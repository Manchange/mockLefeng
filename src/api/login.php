<?php
require ("connect.php");
$username = $_GET['username'];
$password = $_GET['password'];
$sql = "SELECT * FROM `user` WHERE username = '$username'";

//执行sql语句,查询结果
$result = $conn -> query($sql);
$row = $result -> fetch_all(MYSQLI_ASSOC);
if($row){
    $sql = "SELECT * FROM `user` WHERE  username = '$username'AND password = '$password'";
//执行sql语句,查询结果
    $result = $conn -> query($sql);
    $row = $result -> fetch_all(MYSQLI_ASSOC);
    if($row){
        echo "登录成功";
    }else{
        echo "账户密码有误";
    };
}else{
    echo "请注册账户";
}
// 关闭数据库，避免资源浪费
$conn -> close();
?>