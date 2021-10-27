<?php
$line = $_POST['line'];
$file = '/home/nate/webdata/ilamb_bias_selector.txt';
file_put_contents($file, $line, FILE_APPEND | LOCK_EX);
echo json_encode(array("status"=>'record appended'));
?>