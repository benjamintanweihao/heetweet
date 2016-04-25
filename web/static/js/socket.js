// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "web/static/js/app.js".

// To use Phoenix channels, the first step is to import Socket
// and connect at the socket path in "lib/my_app/endpoint.ex":
import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

// Setting up the map

var map = L.map('map').setView([0, 0], 2);

var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

var heat = L.heatLayer([]).addTo(map);

// Socket Logic

socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("tweets:lobby", {})

channel.on("new_tweet", payload => {
    // artifically add more points to get the heatmap effect
    for (var i = 0; i < 100; i++) {
        heat.addLatLng([payload.lat, payload.lng])
    }
})

channel.join()
    .receive("ok", resp => {
        console.log("Joined successfully", resp)
        channel.push("start_stream", {})
    })
    .receive("error", resp => { console.log("Unable to join", resp) })


export default socket
