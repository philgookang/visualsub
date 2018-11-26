
// Converts from degrees to radians.
Math.radians = function(degrees) {
    return (degrees * (Math.PI / 180));
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
    return (radians * (180 / Math.PI));
};

//
Math.quadrantAdjust = function(click_station, other_station, angle) {
    if ((click_station.x <= other_station.x) && (click_station.y <= other_station.y)) {
        return Math.degrees(angle); //
    } else if ((click_station.x >= other_station.x) && (click_station.y <= other_station.y)) {
        return (180 - Math.degrees(angle)); //
    } else if ((click_station.x >= other_station.x) && (click_station.y >= other_station.y)) {
        return (180 + Math.degrees(angle));
    } else if ((click_station.x <= other_station.x) && (click_station.y >= other_station.y)) {
        return (360 - Math.degrees(angle));
    }
};
