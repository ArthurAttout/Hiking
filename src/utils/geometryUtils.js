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