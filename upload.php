<?php

$targetDir = "videos/";
$reportDir = "reports/";

$username = $_POST['username'];
$hacker = $_POST['hacker'];
$hacktype = $_POST['hacktype'];
$description = $_POST['description'];

$videoName = basename($_FILES["video"]["name"]);
$targetFile = $targetDir . time() . "_" . $videoName;

if (move_uploaded_file($_FILES["video"]["tmp_name"], $targetFile)) {

    $reportFile = $reportDir . time() . ".txt";

    $data = "Reporter: $username\n";
    $data .= "Hacker: $hacker\n";
    $data .= "Hack Type: $hacktype\n";
    $data .= "Description: $description\n";
    $data .= "Video: $targetFile\n";

    file_put_contents($reportFile, $data);

    // WhatsApp Message
    $message = "🚨 INFINITY RP HACK REPORT 🚨%0A";
    $message .= "Reporter: $username%0A";
    $message .= "Hacker: $hacker%0A";
    $message .= "Hack: $hacktype%0A";
    $message .= "Details: $description";

    $phone = "94740682507";

    echo "<script>
    window.location.href='https://wa.me/$phone?text=$message';
    </script>";

} else {
    echo "Upload Error!";
}
?>