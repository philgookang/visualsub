var Visualsub = (function() {
    var that = { svg : null, svg_station : null, svg_line : null, idx : 0, scale : 0.9, radius : 4 };
    that.init = function() {
        // var w = window.innerWidth;
        // var h = window.innerHeight;
        var w = 1700;
        var h = 800;
        that.svg = d3.select("#canvas").append('svg').attr('width', w).attr('height', h);
        that.svg_station = that.svg.append("g").attr("name", "stations")
        that.svg_line = that.svg.append("g").attr("name", "lines")
    };
    that.moveTo = function(element, station, position, delay_time) {
        position = mapPosition(position.x, position.y, station.radius);
        element.transition().delay(( 100 * delay_time)).duration(800).attr("transform", transformStation(position));
    };
    that.rerender = function() {
        that.svg_station.selectAll("g").each(function(station) {
            d3.select(this).attr("transform", function(station, i) {
                return transformStation(mapPosition(station.x, station.y, station.radius));
            });
        });
    };
    that.addStation = function(station_list) {

        for (var i = 0; i < station_list.length; i++) {

            // 추가 할역을 가져오기
            var new_station = station_list[i];

            // group을 추가
            var group = that.svg_station.append("g").data([new_station]);

            // group에대한 변수 추가
            group.attr("idx", new_station.idx)
                .style("cursor", "pointer");

            // 원형 추가
            group.append("circle").data([new_station])
                .attr("r", station => (station.radius * Visualsub.scale))
                .attr("cx", 0)
                .attr("cy", 0)
                .style("fill", station => station.color);

            // 역 문구 추가
            group.append("text").data([new_station])
                .style("font-size", (12 * Visualsub.scale)  + "px")
                .style("fill", "#000")
                .attr("x", station => stationNameCentering(station))
                .attr("y", station => stationNameVerticalAlign(station))
                .text(station => station.name);

            // event 추가
            group.on('click', function(click_station) {

                // 선 모두 숨기기
                Visualsub.svg_line.selectAll("path").remove();

                // 중앙놈 움직이고
                Visualsub.moveTo(d3.select(this), click_station, {x:0, y:0}, 0);

                // 중앙놈 기준으로 나머지 움직이면 됨
                that.svg_station.selectAll("g").each(function(other_station, i) {

                    // 중앙놈이면 skip~!
                    if (other_station.idx == click_station.idx) return;

                    // tan(angle) = opposite/adjacent
                    // angle = arctan(opposite/adjacent)
                    var adjacent    = Math.abs(Math.abs(click_station.x) - Math.abs(other_station.x));
                    var opposite    = Math.abs(Math.abs(click_station.y) - Math.abs(other_station.y));
                    var angle       = Math.atan(opposite/adjacent);
                    var adjustAngle = Math.quadrantAdjust(click_station, other_station, angle);
                    var radius      = stationDistance(click_station, other_station);

                    // polor coordinate --> cartesian coordinates
                    var x = (radius * Math.cos( Math.radians(adjustAngle) ))
                    var y = (radius * Math.sin( Math.radians(adjustAngle) ))

                    // 역을 움직히자!
                    Visualsub.moveTo(d3.select(this), other_station, {"x": x, "y": y}, 1);
                });
            });
        }
        // end for loop

        // 위추로 이동
        Visualsub.rerender();
    };
    that.addPath = function(lines) {

        // line d 계산
        var line = d3.line().x( d => d.x ).y(d => d.y).curve(d3.curveCardinal);

        // 각 line loop
        for(var key in lines) {

            // line 정보
            var pathway = lines[key];

            // pathway 만들기
            that.svg_line.append('path')
                    .attr("stroke", stationColor(key))
                    .attr("stroke-width", 3)
                    .attr("fill", "none")
                    .attr("d", line(pathway));
        }
    };
    return that;
})();
