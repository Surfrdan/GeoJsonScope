# GeoJsonScope

GeoJSON Scope is a web based 'RADAR' screen powered by GeoJSON input files. 
![screenshot](https://raw.githubusercontent.com/Surfrdan/GeoJsonScope/master/docs/screenshot.png)

## Aircraft Can be presented in the following format in order to display 'live' 

```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "callsign": "UAL932  ",
        "hex": "aa79a6",
        "altitude": 38000,
        "heading": 93,
        "speed": 565
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -6.05629,
          51.765251
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "callsign": "TOM7GD  ",
        "hex": "400ff2",
        "altitude": 36000,
        "heading": 210,
        "speed": 386
      },
      "geometry": {
        "type": "Point",
        "coordinates": [
          -6.72481,
          52.963505
        ]
      }
    }
  ]
}
```

This JSON Should be generated by a web service and the URL entered into js/radar.js in the realtime section. e.g.:

```javascript
realtime = L.realtime({
    url: 'http://my.webservice.net/geojson_aircraft',
    crossOrigin: true,
    type: 'json'
}, {
```

### Dump1090 users
Included in the tools directory is a PHP script which converts the dump1090 data.json format into GeoJSON. If you are using dump1090 and a SDR Dongle then this will generate the required feed.

### Virtual Radar Server users
Also included in the tools directory is a PHP script which converts the VRS AircraftList.json format into GeoJSON. 
