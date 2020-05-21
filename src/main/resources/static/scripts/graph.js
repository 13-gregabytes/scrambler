window.Graph = {};

Graph.solveData = {};
Graph.graphData = {};

Graph.buildGraph = function buildGraph() {
    cube.retrieveSolves(Graph.processSolveData);
};

Graph.processSolveData = function processSolveData(responseB64) {
    let type = cube.method.toUpperCase();

    let responseString = atob(responseB64);

    Graph.solveData[type] = JSON.parse(responseString);

    let data = [];
    let avg = [];

    let _i = 1;

    let running5 = [];

    for (let i in Graph.solveData[type]) {
        let t = Graph.solveData[type][i].time;
        let m = t.slice(0, 2);
        let s = t.slice(3, 5);
        let c = t.slice(6, 9);

        let v = (c * 1) + (s * 1000) + (m * 60 * 1000);

        data.push(v);

        running5.push(v);

        if (running5.length == 5) {
            let _5 = JSON.parse(JSON.stringify(running5));

            _5.sort();
            _5.shift();
            _5.pop();

            let sum = 0;
            _5.forEach(function(cell) { sum += cell });

            avg.push(sum / _5.length);

            running5.shift();
        } else {
            avg.push(NaN);
        }
    }

    Graph.graphData[type] = data;
    Graph.graphData[type + " Avg"] = avg;
    Graph.processGraphData();
}

Graph.processGraphData = function processGraphData() {
    let datasets = [];

    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    let cnt = 0;

    [cube.method.toUpperCase(), cube.method.toUpperCase() + " Avg" ].forEach(function(i) {
        if (Graph.graphData[i].length > cnt)
            cnt = Graph.graphData[i].length;

        for (let j in Graph.graphData[i]) {
            if (Graph.graphData[i][j] < min)
                min = Graph.graphData[i][j];

            if (Graph.graphData[i][j] > max)
                max = Graph.graphData[i][j];
        }

        let _r = (i == "ROUX") ? 255 : Math.round(Math.random() * 255);
        let _g = Math.round(Math.random() * 255);
        let _b = (i == "CFOP") ? 255 : Math.round(Math.random() * 255);

        let color = "rgb(" + _r + ", " + _g + ", " + _b + ")";

        let set = {
            "label": i,
            "data": Graph.graphData[i],
            "fill": false,
            "backgroundColor": color,
            "borderColor": color,
            "lineTension": 0.1
        };

        datasets.push(set);
    });

    let labels = [];

    for (let i = 1; i <= cnt; i++) {
        labels.push(i);
    }

    let mintime = new Date(min);
    min = mintime.setSeconds(0);
    min = mintime.setMilliseconds(0);
    min = 0;

    let maxtime = new Date(max);
    max = maxtime.setSeconds(0);
    max = maxtime.setMilliseconds(0);
    max = maxtime.setMinutes(maxtime.getMinutes() + 1)

    let ctx = document.getElementById('solveChart');
    let myChart = new Chart(ctx, {
        "type": "line",
        "data": {
            "datasets": datasets,
            "labels": labels
        },
        "options": {
            "responsive": false,
            "scales": {
                "xAxes": [{
                    "display": true
                }],
                "yAxes": [{
                    "display": true,
                    "ticks": {
                        "beginAtZero": false,
                        "min": min,
                        "max": max,
                        "callback": function(v) {
                            let _d = new Date(v);
                            let _m = _d.getMinutes();
                            let _s = _d.getSeconds();
                            let _n = _d.getMilliseconds();

                            return ((_m < 10) ? "0" + _m : _m) + ":" + ((_s < 10) ? "0" + _s : _s) + "." + ((_n < 10) ? "0" + _n : _n);
                        }
                    }
                }]
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        let returnArray = [];

                        let _a = tooltipItem[0].datasetIndex;

                        if (_a == 0) {
                            _a = cube.getSolveMethod().toUpperCase();

                            let _o = Graph.solveData[_a][tooltipItem[0].index];

                            let _d = new Date(_o.date);

                            returnArray.push(cube.method.toUpperCase() + " " +  tooltipItem[0].label);
                            returnArray.push(
                                ((_d.getDate() < 10) ? "0" + _d.getDate() : _d.getDate()) +
                                "/" +
                                (((_d.getMonth() + 1) < 10) ? "0" + (_d.getMonth() + 1) : (_d.getMonth() + 1)) +
                                "/" +
                                ((_d.getFullYear() < 10) ? "0" + _d.getFullYear() : _d.getFullYear()) +
                                " " +
                                ((_d.getHours() < 10) ? "0" + _d.getHours() : _d.getHours()) +
                                ":" +
                                ((_d.getMinutes() < 10) ? "0" + _d.getMinutes() : _d.getMinutes())
                            );
                        } else {
                            returnArray.push(cube.method.toUpperCase() + " Average " +  tooltipItem[0].label);
                        }

                        return returnArray;
                    },
                    label: function(tooltipItem, data) {
                        let _d = new Date(parseInt(tooltipItem.value));
                        let _m = _d.getMinutes();
                        let _s = _d.getSeconds();
                        let _n = _d.getMilliseconds();

                        return ((_m < 10) ? "0" + _m : _m) + ":" + ((_s < 10) ? "0" + _s : _s) + "." + ((_n < 10) ? "0" + _n : _n);
                    }
                }
            }
        }
    });

    // let config = {
    //     "type": "line",
    //     "data": {
    //         "labels": ["January", "February", "March", "April", "May", "June", "July"],
    //         "datasets": [{
    //             "label": "My First dataset",
    //             "backgroundColor": "rgb(255, 99, 132)",
    //             "borderColor": "rgb(255, 99, 132)",
    //             "data": [83, -68, -69, 85, 99, 30, 58],
    //             "fill": false
    //         }, {
    //             "label": "My Second dataset",
    //             "fill": false,
    //             "backgroundColor": "rgb(54, 162, 235)",
    //             "borderColor": "rgb(54, 162, 235)",
    //             "data": [0, -43, 86, -83, -6, 53, -66]
    //         }]
    //     },
    //     "options": {
    //         "responsive": true,
    //         "title": {"display": true, "text": "Chart.js Line Chart"},
    //         "tooltips": {"mode": "index", "intersect": false},
    //         "hover": {"mode": "nearest", "intersect": true},
    //         "scales": {
    //             "xAxes": [{"display": true, "scaleLabel": {"display": true, "labelString": "Month"}}],
    //             "yAxes": [{"display": true, "scaleLabel": {"display": true, "labelString": "Value"}}]
    //         }
    //     }
    // };
};
