
var createStation = function(name, line_number, x, y, time) {
    Visualsub.idx += 1;
    return { "idx" : Visualsub.idx, "name" : name, "line_number" : line_number, "x" : x, "y" : y, "radius" : 6, "time" : time };
};

var stationNameCentering = function(station) {
    return -(station.name.length * 6);
}
var stationNameVerticalAlign = function(station) {
    return ((station.radius * 2) + 6);
}

var transformStation = function(t) {
    return 'translate('+t.x+', '+t.y+')';
};

var mapPosition = function(x, y, radius) {
    var w = window.innerWidth;
    var h = window.innerHeight;

    var winWidthHalf = w/2;
    var winheightHalf = h/2;

    var fixedDistance = 50;

    return {
        "x" : (winWidthHalf + (fixedDistance * x)) - radius,
        "y" : (winheightHalf + ((fixedDistance * y) * -1)) - radius
    };
};

var quadrantAdditionalAngle = function(click_station, other_station) {
    // I	0
    // II	Add 180
    // III	Add 180
    // IV	Add 360
    if ((click_station.x <= other_station.x) && (click_station.y <= other_station.y)) {
        return Math.atan(0);
    } else if ((click_station.x >= other_station.x) && (click_station.y <= other_station.y)) {
        return Math.atan(90);
    } else if ((click_station.x >= other_station.x) && (click_station.y >= other_station.y)) {
        return Math.atan(180);
    } else if ((click_station.x <= other_station.x) && (click_station.y <= other_station.y)) {
        return Math.atan(360);
    }
};

var stationDistance = function(click_station, other_station) {
    // 이건 나중에 dykstra알고리즘으로 계산 해야됨. 우선 고정값쓰장
    // return (Math.random() * (9.5 - 1.5) + 1.5).toFixed(4);
    return other_station.time
};
