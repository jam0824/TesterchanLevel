<?php
require('config.php');

$request = isset($_SERVER['HTTP_X_REQUESTED_WITH'])
     ? strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) : '';
if($request !== 'xmlhttprequest') exit;

header('Content-type: application/json; charset=utf-8');
$link = mysql_connect($sql_url, $user, $pw);
if (!$link) {
    echo '接続失敗です。'.mysql_error();
    die('接続失敗です。'.mysql_error());
}

$db_selected = mysql_select_db($db_name, $link);
if (!$db_selected){
	echo '接続失敗です。'.mysql_error();
    die('データベース選択失敗です。'.mysql_error());
}
mysql_set_charset('utf8');

$table_name = 'table_total_count';
$where = 'id = 1';

if(isset($_GET['pass']) && $_GET['pass'] != ''){
    $incliment = 'int_pass_count = int_pass_count + 1';
}
elseif(isset($_GET['total']) && $_GET['total'] != ''){
    $incliment = 'int_total_count = int_total_count + 1';
}
else{
    exit();
}

$sql_query = 'UPDATE ' . $table_name . ' SET ' . $incliment . ' WHERE ' . $where. ';';
$result = mysql_query($sql_query);
if (!$result) {
	echo 'UPDATEクエリーが失敗しました。'.mysql_error();
    die('UPDATEクエリーが失敗しました。'.mysql_error());
}

$sql_query = 'SELECT int_total_count, int_pass_count FROM ' . $table_name . ' WHERE ' . $where .';';
$result = mysql_query($sql_query);
if (!$result) {
	echo 'SELECTクエリーが失敗しました。'.mysql_error();
    die('SELECTクエリーが失敗しました。'.mysql_error());
}
else{
    $row = mysql_fetch_assoc($result);
    $json = json_encode($row);
}

$close_flag = mysql_close($link);
echo $json;

?>