<?php
$username = 'username';
$password = 'password';
$vrsUrl = "my.webservice.net:8080/VirtualRadar/AircraftList.json";
$ch = curl_init($vrsUrl);
curl_setopt($ch, CURLOPT_USERPWD, $username . ":" . $password);  
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch,CURLOPT_ENCODING , "");
curl_setopt($ch, CURLOPT_USERPWD, $username . ":" . $password);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$return = curl_exec($ch);
curl_close($ch);
$vrsObj = json_decode($return);

$obj = new StdClass();
$obj->type = "FeatureCollection";
$obj->features = array();

foreach($vrsObj->acList as $aircraft) {
    $feature = new StdClass();
    $feature->type = "Feature";
    $point = new StdClass();
    $point->type = "Point";
    $point->coordinates = array($aircraft->Long,$aircraft->Lat);
    $feature->properties = new StdClass();
    $feature->properties->callsign = $aircraft->Call;
    $feature->properties->hex = $aircraft->Icao;
	$feature->properties->id = $aircraft->Icao;
    $feature->properties->altitude = $aircraft->Alt;
    $feature->properties->heading = $aircraft->Trak;
    $feature->properties->speed = $aircraft->Spd;
    $feature->geometry = $point;
    $obj->features[] = $feature;

}
header("Content-Type: application/json");
echo json_encode($obj);
