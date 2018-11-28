<?php
require ("connect.php");
$username = $_GET['phone'];
$_pwd = $_GET['password'];
$sql = "SELECT * FROM `user` WHERE username = '$username'";

//执行sql语句,查询结果
$result = $conn -> query($sql);
$row = $result -> fetch_all(MYSQLI_ASSOC);
if($row){
    echo "用户已存在";
}else{
    if($_pwd!=''){
        $sql = "INSERT INTO `user`(`username`, `password`) VALUES ('$username','$_pwd')";
         //var_dump($sql);
        $conn -> query($sql);
    };
}
// 关闭数据库，避免资源浪费
$conn -> close();
?>