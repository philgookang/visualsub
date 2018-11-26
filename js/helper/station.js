

var createStation = function(name, line_number, x, y, time) {
    Visualsub.idx += 1;
    return { "idx" : Visualsub.idx, "name" : name, "line_number" : line_number, "x" : x, "y" : y, "radius" : 6, "time" : time };
};

var createStationNew = function(station) {
    Visualsub.idx += 1;
    var color = "";
    if (station.line == "2") {
        color = "#3cb44a";
    } else if (station.line == "경의중앙선") {
        color = "#5ba37f";
    } else if (station.line == "분당선") {
        color = "#ffce33";
    } else if (station.line == "3") {
        color = "#ff7300";
    } else if (station.line == "4") {
        color = "#2c9ede";
    }
    return { "idx" : Visualsub.idx, "name" : station.name, "color" : color, "x" : station.x, "y" : station.y, "radius" : 4, "time" : "" };
};

var stationNameCentering = function(station) {
    return -(station.name.length * 6) * Visualsub.scale;
}
var stationNameVerticalAlign = function(station) {
    return ((station.radius * 2) + 10) * Visualsub.scale;
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
        "x" : (winWidthHalf + ((fixedDistance * x) * Visualsub.scale)) - (radius * Visualsub.scale),
        "y" : (winheightHalf + (((fixedDistance * y) * Visualsub.scale) * -1)) - (radius * Visualsub.scale)
    };
};

var stationDistance = function(click_station, other_station) {
    // 이건 나중에 dykstra알고리즘으로 계산 해야됨. 우선 고정값쓰장
    return (Math.random() * (70.5 - 10.5) + 10.5).toFixed(4);
    // return 40
};
