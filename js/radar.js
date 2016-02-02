var acLayer = L.layerGroup();
var blueIcon = L.icon({
    iconUrl: 'img/blue_icon.png',
    iconSize: [0, 0],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0]
});
var greenIcon = L.icon({
    iconUrl: 'img/favicon.png',
    iconSize: [6, 6],
    iconAnchor: [0, 0],
    popupAnchor: [0, 0]
});
var map = L.map('map').setView([52.483, -1.89], 7),

realtime = L.realtime({
    url: 'http://nucleardawn.ddns.net/radar2/feeders/geojson_aircraft_vrs.php',
    crossOrigin: true,
    type: 'json'
}, {
    interval: 5 * 1000,
    pointToLayer: function (feature, latlng) {
		if (feature.properties.callsign == null) {
			feature.properties.callsign = '';
		}

        return L.marker(latlng, {icon: greenIcon}).bindLabel(feature.properties.callsign +
           '<br/>' + Math.round(feature.properties.heading)+
           '<br/>' + Math.round(feature.properties.speed), { noHide:true, className: "aircraftLabel", fillOpacity: 0, opacity: 0.6, weight: 1  }).addTo(map);
    }                            
}).addTo(map);  

// Distance Markers from home location
L.circle([52.395400,-4.070829], 10000, { color: "#40FF5A", fillOpacity: 0, opacity: 0.2, weight: 2 }).addTo(map);
L.circle([52.395400,-4.070829], 50000, { color: "#40FF5A", fillOpacity: 0, opacity: 0.2, weight: 2 }).addTo(map);
L.circle([52.395400,-4.070829], 100000, { color: "#40FF5A", fillOpacity: 0, opacity: 0.2, weight: 2 }).addTo(map);
L.circle([52.395400,-4.070829], 150000, { color: "#40FF5A", fillOpacity: 0, opacity: 0.2, weight: 2 }).addTo(map);
L.circle([52.395400,-4.070829], 200000, { color: "#40FF5A", fillOpacity: 0, opacity: 0.2, weight: 2 }).addTo(map);


L.tileLayer('http://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
	subdomains: 'abcd',
	maxZoom: 19
}).addTo(map);

var geojsonReportingPointsLayer = new L.GeoJSON.AJAX("json/reporting_points.json",{
	middleware:function(data){
	   return L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				return L.marker(latlng, { icon: blueIcon }).bindLabel('+ ' + feature.properties.name, 
					{ noHide:true, fillOpacity: 0, opacity: 0.4, weight: 2, className: "reportingPointlabel",  })
			}
	    }).addTo(map);
	}
});

var geojsonAirspaceLayer = new L.GeoJSON.AJAX("json/airspace_simple.json",{
	middleware:function(data){
	   return L.geoJson(data, {
			pointToLayer: function (feature, latlng) {
				switch (feature.geometry.type) {
					case 'Point': return L.circle(latlng, feature.properties.radius).bindLabel(feature.properties.name, { noHide:true } ).addTo(map)
					case 'Polygon': return L.polygon(latlng).bindLabel(feature.properties.name, { noHide:true } ).addTo(map)
				}
			},
			style: function(feature) {
				switch (feature.properties.type) {
					case 'PROHIBITED': return { color: "#ff0000", fillOpacity: 0.2, opacity: 0.2, weight: 2 };
					case 'DANGER': return { color: "#ff0000", fillOpacity: 0.2, opacity: 0.2, weight: 2 };
					case 'RESTRICTED': return { color: "#ff8000", fillOpacity: 0.2, opacity: 0.2, weight: 2 };
					default: return { color: "#ffffff", fillOpacity: 0, opacity: 0.1, weight: 2 };
				}
		    },
			onEachFeature: function (feature, layer) {
				layer.bindPopup(feature.properties.title);
			}
	    }).addTo(map);
	}
});
geojsonAirspaceLayer.addTo(map);