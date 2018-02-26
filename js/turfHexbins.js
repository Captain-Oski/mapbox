mapboxgl.accessToken = 'pk.eyJ1IjoiY2xlbWVudGcxMjMiLCJhIjoiY2o2M3ZhODh3MWxwNDJxbnJnaGZxcWNoMiJ9.YroDniTcealGFJgHtQ2hDg';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9'
});


map.on('load', function() {

/*
    var bbox = turf.bbox(mygeojson);
    var cellSide = 100;
    var options = {units: 'miles'};
*/

    map.addSource("smarthalo", {
        type: "geojson",
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: "data/smarthalo.geojson"})

    var bbox = [-96,31,-84,40];
    var cellSide = 100;
    var options = {units: 'miles'};

    var hexgrid = turf.hexGrid(bbox, cellSide, options);



    /*map.addLayer({
        id: "clusters",
        type: "circle",
        source: "smarthalo",
        paint: {
            // Use step expressions (https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": "red",
            "circle-radius": 6
        }
    });*/

    map.addLayer({
        'id': 'maine',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': hexgrid
        },
        'layout': {},
        'paint': {
            'fill-color': '#088',
            'fill-opacity': 0.8
        }
    });

    var ptsWithinbuff = turf.within(mygeojson,hexgrid);
    console.log('Found ' + ptsWithinbuff.features.length + ' features');

    var tagged = turf.collect(hexgrid,mygeojson , 'relevance', 'values');

    console.log(tagged)



    function test() {
        for(var i = 0 ; i < tagged.features.length;i++){
            //tagged.features[i].properties.sum = tagged.features[i].properties.values.reduce(function(pv, cv) { return pv + cv; }, 0)
            tagged.features[i].properties.sum = 1
        }
    }

    console.log(test())

    //var values = tagged.features[0].properties.values.reduce(function(pv, cv) { return pv + cv; }, 0);

    //console.log(values)



  /*  map.addLayer({
        'id': 'maine2',
        'type': 'fill',
        'source': {
            'type': 'geojson',
            'data': tagged
        },
        'paint': {
        'fill-color': [
            'interpolate',
            ['linear'],
            ['get', 'values'],
            0, '#F2F12D',
            0.5, '#EED322',
            1, '#E6B71E',
            2, '#DA9C20',
            3, '#CA8323',
            4, '#B86B25',
            5, '#A25626',
            10, '#8B4225',
            20, '#723122'
        ],
        'fill-opacity': 0.75
    }
    });*/
});

