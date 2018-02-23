mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWVudGcxMjMiLCJhIjoiY2o2M3ZhODh3MWxwNDJxbnJnaGZxcWNoMiJ9.YroDniTcealGFJgHtQ2hDg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/clementg123/cj63vaoxm4se12rltb909k73o'
});
map.on('load', function () {

    map.addLayer({
        "id": "terrain-data",
        "type": "point",
        "source": {
            type: 'vector',
            url: 'mapbox://mapbox.mapbox-terrain-v2'
        },
        "source-layer": "contour",
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#ff69b4",
            "line-width": 1
        }
    });
});

