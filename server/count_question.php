<?php
require('config.php');

$request = isset($_SERVER['HTTP_X_REQUESTED_WITH'])
     ? strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) : '';
if($request !== 'xmlhttprequest') exit;


header('Content-type: application/json; charset=utf-8');
if(!isset($_GET['id']) || $_GET['id'] == ''){
    echo 'id exit';
    exit();
}

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

//idのデータが存在するか確認。ない場合はinsertして0のjsonを返して終了
$table_name = 'table_question_count';
$where = 'id = ' . $_GET['id'];
$sql_query = 'SELECT COUNT(*) FROM ' . $table_name . ' WHERE ' . $where .';';
$result = mysql_query($sql_query);
if (!$result) {
	echo 'カウントクエリーが失敗しました。'.mysql_error();
    die('カウントクエリーが失敗しました。'.mysql_error());
}
$row = mysql_fetch_assoc($result);
if($row['COUNT(*)'] == 0){
    $sql_query = 'INSERT INTO ' .$table_name. ' (id) VALUES (' . $_GET['id'] . ');';
    $result = mysql_query($sql_query);
    if (!$result) {
        echo 'カウントクエリーが失敗しました。'.mysql_error();
        die('カウントクエリーが失敗しました。'.mysql_error());
    }
    echo "{'id':" . $_GET['id'] . ", 'total_question_count':0, 'pass_question_count':0}";
    $close_flag = mysql_close($link);
    exit();
}

//get_question_numが来たら該当idのデータを返す
if(isset($_GET['get_question_num']) && $_GET['get_question_num'] != ''){
    $sql_query = 'SELECT * FROM ' . $table_name . ' WHERE ' . $where .';';
    $result = mysql_query($sql_query);
    if (!$result) {
        echo 'ゲットクエリーが失敗しました。'.mysql_error();
        die('ゲットクエリーが失敗しました。'.mysql_error());
    }
    else{
        $row = mysql_fetch_assoc($result);
        $json = json_encode($row);
        $close_flag = mysql_close($link);
        echo $json;
        exit();
    }
}
//pass=okが来たらtotalとpassを可算。それ以外ならtotal飲みを可算
elseif(isset($_GET['pass']) && $_GET['pass'] != ''){
    if($_GET['pass']=='ok'){
        $incliment = 'total_question_count = total_question_count + 1, pass_question_count = pass_question_count + 1';
    }
    else{
        $incliment = 'total_question_count = total_question_count + 1';
    }
    $sql_query = 'UPDATE ' . $table_name . ' SET ' . $incliment . ' WHERE ' . $where. ';';
    $result = mysql_query($sql_query);
    if (!$result) {
        echo 'UPDATEクエリーが失敗しました。'.mysql_error();
        die('UPDATEクエリーが失敗しました。'.mysql_error());
    }
}

$close_flag = mysql_close($link);
echo "{'id':0}";
?>