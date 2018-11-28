<?php
require ("connect.php");
$id = $_GET["id"];
    $sql = "DELETE FROM `carlist` WHERE id = '$id'";
    $conn -> query($sql);
// 关闭数据库，避免资源浪费
$conn -> close();
?>