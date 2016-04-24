var addressPoints = [
    [1.3521, 103.8198],
];

var map = L.map('map').setView([1.3521, 103.8198], 12);

var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

addressPoints = addressPoints.map(function (p) { return [p[0], p[1]]; });

var heat = L.heatLayer(addressPoints).addTo(map);
