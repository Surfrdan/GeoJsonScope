<?php

$dumpData = json_decode(file_get_contents("http://localhost:8080/data.json"));

$obj = new StdClass();
$obj->type = "FeatureCollection";
$obj->features = array();
foreach($dumpData as $aircraft) {
    $feature = new StdClass();
    $feature->type = "Feature";
    $point = new StdClass();
    $point->type = "Point";
    $point->coordinates = array($aircraft->lon,$aircraft->lat);
    $feature->properties = new StdClass();
    $feature->properties->callsign = $aircraft->flight;
    $feature->properties->hex = $aircraft->hex;
    $feature->properties->altitude = $aircraft->altitude;
    $feature->properties->heading = $aircraft->track;
    $feature->properties->speed = $aircraft->speed;
    $feature->properties->altitude = $aircraft->altitude;
    $feature->geometry = $point;
    $obj->features[] = $feature;

}
header("Content-Type: application/json");
echo json_encode($obj);
