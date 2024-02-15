<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $score = $_POST["score"];
    $intake = $_POST["intake"];

    $jsonData = file_get_contents("scores.json");
    $scores = json_decode($jsonData, true);

    $scores[] = array("name" => $name, "score" => $score, "intake" => $intake);

    $jsonData = json_encode($scores);
    file_put_contents("scores.json", $jsonData);

    echo $jsonData;
}
?>
