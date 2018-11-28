<?php
require ("connect.php");
$id = $_GET["id"];

$sql = "SELECT * FROM `goods` WHERE num = '$id'";

//执行sql语句,查询结果
$result = $conn -> query($sql);
$row = $result -> fetch_all(MYSQLI_ASSOC);
echo json_encode($row);

//释放查询结果集，避免资源浪费
$result -> close();

// 关闭数据库，避免资源浪费
$conn -> close();
?>