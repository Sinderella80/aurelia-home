<?php
require 'config.php';
$in = json_decode(file_get_contents('php://input'), true) ?: [];
$act = $_GET['action'] ?? '';
function out($a){ echo json_encode($a); exit; }

if ($act === 'register') {
  $n = trim($in['name'] ?? ''); $e = strtolower(trim($in['email'] ?? '')); $p = $in['password'] ?? '';
  if (!$n || !filter_var($e, FILTER_VALIDATE_EMAIL) || strlen($p) < 6) out(['ok'=>false,'error'=>'Check your name, email and a password of 6+ characters.']);
  $s = $pdo->prepare('SELECT id FROM users WHERE email=?'); $s->execute([$e]);
  if ($s->fetch()) out(['ok'=>false,'error'=>'This email is already registered.']);
  $pdo->prepare('INSERT INTO users(name,email,password) VALUES(?,?,?)')->execute([$n,$e,password_hash($p,PASSWORD_DEFAULT)]);
  $_SESSION['uid'] = $pdo->lastInsertId();
  out(['ok'=>true,'user'=>['name'=>$n,'email'=>$e]]);
}
if ($act === 'login') {
  $s = $pdo->prepare('SELECT * FROM users WHERE email=?'); $s->execute([strtolower(trim($in['email'] ?? ''))]);
  $u = $s->fetch(PDO::FETCH_ASSOC);
  if (!$u || !password_verify($in['password'] ?? '', $u['password'])) out(['ok'=>false,'error'=>'Email or password is incorrect.']);
  $_SESSION['uid'] = $u['id'];
  out(['ok'=>true,'user'=>['name'=>$u['name'],'email'=>$u['email']]]);
}
if ($act === 'logout') { session_destroy(); out(['ok'=>true]); }
out(['ok'=>false,'error'=>'Unknown action.']);
