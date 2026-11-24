<?php
// XAMPP defaults: user root, empty password.
$pdo = new PDO('mysql:host=localhost;dbname=aurelia;charset=utf8mb4','root','',[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
session_start();
header('Content-Type: application/json');
