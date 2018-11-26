

var createStation = function(name, line_number, x, y, time) {
    Visualsub.idx += 1;
    return { "idx" : Visualsub.idx, "name" : name, "line_number" : line_number, "x" : x, "y" : y, "radius" : 6, "time" : time };
};

var createStationNew = function(station) {
    Visualsub.idx += 1;
    return { "idx" : Visualsub.idx, "name" : station.name, "line_number" : "", "x" : station.x, "y" : station.y, "radius" : 4, "time" : "" };
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
    w = 1700;
    h = 800;

    var winWidthHalf = w/2;
    var winheightHalf = h/2;

    var fixedDistance = 5;

    return {
        "x" : (winWidthHalf + (fixedDistance * x)) - radius,
        "y" : (winheightHalf + ((fixedDistance * y) * -1)) - radius
    };
};

var stationDistance = function(click_station, other_station) {
    // 이건 나중에 dykstra알고리즘으로 계산 해야됨. 우선 고정값쓰장
    return (Math.random() * (70.5 - 10.5) + 10.5).toFixed(4);
    // return 40
};
