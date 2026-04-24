<?php
include 'config.php';

if(!isset($_SESSION['admin'])){
    header("Location: login.php");
    exit();
}

$files = glob("reports/*.txt");

echo "<h2>Reports</h2>";

foreach($files as $file){
    echo "<pre>";
    echo file_get_contents($file);
    echo "</pre><hr>";
}
?>