var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), true);
		
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
		
    },

    // Update DOM (DOCUMENT OBJECT MODEL) on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }	
};

app.initialize();

//var map = L.map('map').setView([30.34, 78.04], 12); //This is method Chaining


//Same thing without method chaining

var map=L.map('map');
map.setView([30.34, 78.04], 12)

//var baseLayer = L.tileLayer('https://osm.geointservices.io/tiles/{z}/{x}/{y}.png', {
//  attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
//});
//baseLayer.addTo(map);

//var baseLayer = L.tileLayer('dehradun.gpkg?table=tiles&z={z}&x={x}&y={y}.png', {
//  attribution: '© <a href="https://www.mapbox.com/map-feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>'
//  //,maxZoom:13
//  //,minZoom:10
//});
//baseLayer.addTo(map);
//
var tileLayer = L.geoPackageTileLayer({
    geoPackageUrl: './dehradun.gpkg',
    layerName: 'tiles',
	//center: [30.30, 78.00]
	maxZoom:15,
	minZoom:11
}).addTo(map);
//
tileLayer.on('load', function() {
  tileLayer.off('load');
  L.geoPackageFeatureLayer([], {
      geoPackageUrl: './dehradun.gpkg',
      layerName: 'atms',
      style: function (feature) {
        return {
          color: "#F00",
          weight: 2,
          opacity: 1
        };
      },
      onEachFeature: function (feature, layer) {
        var string = "";
        for (var key in feature.properties) {
          string += '<div class="itemX"><span class="labelX">' + key + ' :</span><span class="value">' + feature.properties[key] + '</span></div>';
		  
        }
        layer.bindPopup(string);
      }
  }).addTo(map);
});
var tileLayer2 = L.geoPackageTileLayer({
    geoPackageUrl: './dehradun.gpkg',
    layerName: 'hotels'
}).addTo(map);

tileLayer2.on('load', function() {
  tileLayer.off('load');
  L.geoPackageFeatureLayer([], {
      geoPackageUrl: './dehradun.gpkg',
      layerName: 'hotels',
      style: function (feature) {
        return {
          color: "#F00",
          weight: 2,
          opacity: 1
        };
      },
      onEachFeature: function (feature, layer) {
        var string = "";
        for (var key in feature.properties) {
          string += '<div class="item"><span class="label">' + key + ' :</span><span class="value">' + feature.properties[key] + '</span></div>';		  
        }
        layer.bindPopup(string);
      }
  }).addTo(map);
});
