export const API_KEY = "AIzaSyAM6PvX6b0VwVoyrswa0OgOVNMQY-EYczY";

export const calculateDistance = (pointA, pointB) => {

    // http://www.movable-type.co.uk/scripts/latlong.html
    const lat1 = pointA.latitude;
    const lon1 = pointA.longitude;

    const lat2 = pointB.latitude;
    const lon2 = pointB.longitude;

    const R = 6371e3; // earth radius in meters
    const phi1 = lat1 * (Math.PI / 180);
    const phi2 = lat2 * (Math.PI / 180);
    const deltaPhi = (lat2 - lat1) * (Math.PI / 180);
    const deltaLambda = (lon2 - lon1) * (Math.PI / 180);

    const a = (Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2)) +
        ((Math.cos(phi1) * Math.cos(phi2)) * (Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2)));

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // in meters
};

export const calculateTotalDistance = (track) => {
    let total = 0;
    let savedItem = track.path[0];

    track.path.map((item,index) => {
        if(index === 0) return item; //Skip first element

        total += calculateDistance(savedItem,item);

        savedItem = item;
        return item;
    });
    return total;
};

export const calculateDeltaAltitude = (track) => {

    let totalDistanceInMeters = calculateTotalDistance(track);

    let first = track.path[0];
    let last = track.path[track.path.length-1];
    let samplesAmount = (totalDistanceInMeters / 100).toFixed(0); //Approximately one sample every 100 meters
    
    if(samplesAmount <= 10)
        samplesAmount = 10;

    if(samplesAmount > 250)
        samplesAmount = 250;

    let parameters = first.latitude + "," + first.longitude + "|" + last.latitude + "," + last.longitude + "&samples=" + samplesAmount + "&key=" + API_KEY;
    let url = "https://maps.googleapis.com/maps/api/elevation/json?path=" + parameters;
    console.log(url);
    return fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(result) {
            console.log(result);
            let maximum = Math.max.apply(Math,result.results.map(function(o){return o.elevation;}));
            let minimum = Math.min.apply(Math,result.results.map(function(o){return o.elevation;}));

            return maximum - minimum;
    });
};

export const calculateBearing = (currentPosition, destinationBeacon) => {
    // λ = longitude
    // φ = latitude
    var y = Math.sin(destinationBeacon.longitude-currentPosition.longitude) * Math.cos(destinationBeacon.latitude);
    var x = Math.cos(currentPosition.latitude)*Math.sin(destinationBeacon.latitude) -
        Math.sin(currentPosition.latitude)*Math.cos(destinationBeacon.latitude)*Math.cos(destinationBeacon.longitude-currentPosition.longitude);
    var bearing = (Math.atan2(y, x)) * (180 / Math.PI); // convert from radian to degrees
    return ((bearing + 360) % 360)
};