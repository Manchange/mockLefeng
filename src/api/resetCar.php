<?php
require ("connect.php");
$id = $_GET["id"];
$title = $_GET["title"];
$imgurl = $_GET["imgurl"];
$price = $_GET["price"];
$oldprice = $_GET["oldprice"];
$discount = $_GET["discount"];
$qty = $_GET["qty"];

$sql = "SELECT * FROM `carlist` WHERE id = '$id'";

//执行sql语句,查询结果
$result = $conn -> query($sql);
$row = $result -> fetch_all(MYSQLI_ASSOC);
if($row){
    $sql = "UPDATE `carlist` SET `qty`=qty+$qty WHERE id = '$id'";
    $conn -> query($sql);
}else{
    $sql = "INSERT INTO `carlist`(`id`, `title`, `discount`,`oldprice`,  `price`,`imgurl`, `qty`) VALUES ('$id','$title','discount','$oldprice','$price','$imgurl','$qty')";
    $conn -> query($sql);
}
// 关闭数据库，避免资源浪费
$conn -> close();
?>