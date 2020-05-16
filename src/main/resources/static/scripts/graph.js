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
    let runningSum = 0;

    for (let i in Graph.solveData[type]) {
        let t = Graph.solveData[type][i].time;
        let m = t.slice(0, 2);
        let s = t.slice(3, 5);
        let c = t.slice(6, 9);

        let v = (c * 1) + (s * 1000) + (m * 60 * 1000);

        data.push(v);

        avg.push((runningSum += v) / _i++);
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
                        let _a = tooltipItem[0].datasetIndex;

                        if (_a == 0)
                            _a = "CFOP";
                        else if (_a == 1)
                            _a = "ROUX";

                        let _o = Graph.solveData[_a][tooltipItem[0].index];

                        let _d = new Date(_o.date);

                        return [
                            tooltipItem[0].label,
                            ((_d.getDate() < 10) ? "0" + _d.getDate() : _d.getDate()) +
                            "/" +
                            (((_d.getMonth() + 1) < 10) ? "0" + (_d.getMonth() + 1) : (_d.getMonth() + 1)) +
                            "/" +
                            ((_d.getFullYear() < 10) ? "0" + _d.getFullYear() : _d.getFullYear()) +
                            " " +
                            ((_d.getHours() < 10) ? "0" + _d.getHours() : _d.getHours()) +
                            ":" +
                            ((_d.getMinutes() < 10) ? "0" + _d.getMinutes() : _d.getMinutes())
                        ];
                      /*
                      tooltipItem
                        0:
                            datasetIndex:

                            index: 24
                            label: "25"
                            value: "336047"
                            x: 559.1162364130435
                            xLabel: 25
                            y: 32
                            yLabel: 336047
                       */
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
