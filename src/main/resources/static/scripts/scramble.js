window.cube = {};

cube.onload = function onload() {
    $("body").on("keypress", function(event) { cube.startStopClock(event) });

    ajax.get("http://localhost:8080/scramble/.json?=333", undefined, function (json) {
        let scrambleJSON = JSON.parse(json)
        let scramble = scrambleJSON[0].scrambles[0];
        let puzzle = scrambleJSON[0].scrambler;

        let scrambleDiv = $("#scramble");

        scrambleDiv.append($("<span>").addClass("totalScramble").text(scramble).hide());

        let scrambleArray = scramble.split(" ");
        let scrambleSoFar = [];
        for (let a in scrambleArray) {
            let turn = scrambleArray[a];

            scrambleSoFar.push(turn);

            let span = $("<span>").text(turn);

            let click = function(string) {
                return function() { cube.getImage(puzzle, string); };
            }(scrambleSoFar.join(" "));

            span.on("click", click);

            scrambleDiv.append(span);
        }

        cube.getImage(puzzle, scramble);
    });

    cube.getTimesFromLocalStorage();
};

cube.getImage = function getImage(puzzle, scramble) {
    ajax.get("http://localhost:8080/view/" + puzzle + ".svg?scramble=" + scramble, undefined, function (svg) {
        $("#image").html(svg);
    });
};

cube.getTimesFromLocalStorage = function getTimesFromLocalStorage() {
    let times = localStorage.getItem("timings");
    let timesArray;

    if (times && (timesArray = JSON.parse(times))) {
        cube.populateTimesDiv(timesArray);
    }
};

cube.populateTimesDiv = function populateTimesDiv(timesArray) {
    let list = $("ol.timesList");

    if (!list.length)
        list = $("<ol>").addClass("timesList").prop("reversed", true);

    for (let x in timesArray) {
        let time = timesArray[x];
        let tspan = $("<span>").text(time.time).addClass("solveTime");
        let sspan = $("<span>").text(time.scramble).addClass("solveScramble").hide();
        let li = $("<li>").addClass("solveItem").append(tspan).append(sspan);

        list.prepend(li);
    }

    $("#times").html("");
    $("#times").append(list);

    cube.calculateAverages();
};

cube.calculateAverages = function calculateAverages() {
    let objArray = JSON.parse(JSON.stringify(cube.collectTimesToArray()));

    let timeArray = [];
    objArray.forEach(function (val) {
        timeArray.push(cube.convertTimeStringToMillis(val.time));
    });

    let bestArray = JSON.parse(JSON.stringify(timeArray));
    let worstArray = JSON.parse(JSON.stringify(timeArray));

    bestArray.sort(function(a, b) { return a - b; });
    worstArray.sort(function(a, b) { return b - a; });

    $("#averages").html("");


    if (timeArray.length > 0) {
        $("#averages").append($("<div>").html("Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(timeArray, timeArray.length))));
    }

    if (timeArray.length > 2) {
        $("#averages").append($("<div>").html("Best 3 Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(bestArray, 3))));
        $("#averages").append($("<div>").html("Worst 3 Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(worstArray, 3))));
    }

    if (timeArray.length > 4) {
        $("#averages").append($("<div>").html("Best 5 Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(bestArray, 5))));
        $("#averages").append($("<div>").html("Worst 5 Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(worstArray, 5))));
    }

    if (timeArray.length > 9) {
        $("#averages").append($("<div>").html("Best 10 Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(bestArray, 10))));
        $("#averages").append($("<div>").html("Worst 10 Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(worstArray, 10))));
    }
};

cube.calculateAveragesWork = function calculateAveragesWork(theArray, numberToAvg) {
    let avg = 0;
    let cnt = 0;

    theArray.forEach(function (val) {
        if (cnt < numberToAvg)
            avg += val;

        cnt++;
    });

    avg = avg / numberToAvg;

    return avg;
};

cube.collectTimesToArray = function collectTimesToArray() {

    let timeArray = [];

    $(".solveItem").each(function () {
        let self = $(this);
        let timeObj = { "time": self.find(".solveTime").text(), "scramble": self.find(".solveScramble").text() };

        timeArray.unshift(timeObj);
    });

    return timeArray;
};

cube.setTimesToLocalStorage = function setTimesToLocalStorage() {
    let timeArray = cube.collectTimesToArray();
    if (timeArray.length && localStorage.setItem("timings", JSON.stringify(timeArray)));
};

cube.startStopClock = function startStopClock(event) {

    if (event.code == "Space") {
        if (cube.clockStopped)
            cube.resetClock();
        else if (cube.clockInterval == undefined) {
            let clockDiv = $("#clock");

            cube.clockInterval = setInterval(function clockStuff() {
                let t = (new Date).getTime();

                if (!cube.clockStart)
                    cube.clockStart = t;

                let elapsed = t - cube.clockStart;

                clockDiv.html(cube.convertMillisToTimeString(elapsed));
            }, 10);
        } else {
            clearInterval(cube.clockInterval);
            cube.clockInterval = undefined;
            cube.clockStopped = true;

            cube.populateTimesDiv([{ "scramble": $(".totalScramble").text(), "time": $("#clock").text()}]);
            cube.setTimesToLocalStorage();
        }
    }
};

cube.resetClock = function resetClock() {
    cube.clockStopped = false;
    clearInterval(cube.clockInterval);
    cube.clockInterval = undefined;
    cube.clockStart = undefined;

    $("#clock").html("00:00.00");
};

cube.convertTimeStringToMillis = function convertTimeStringToMillis(toConvert) {
    let parts = toConvert.split(":");
    let secMills = parts[1].split(".");

    let minutes = parts[0];
    let seconds = secMills[0];
    let millis = secMills[1];

    return (minutes * 60 * 1000) + (seconds * 1000) + (millis * 10); // multiply millis by 10 because we only store first 2 digits
};

cube.convertMillisToTimeString = function convertMillisToTimeString(toConvert) {

    let seconds = Math.floor(toConvert / 1000);

    let millis = toConvert - (seconds * 1000);

    let minutes = Math.floor(seconds / 60);

    seconds = seconds - (minutes * 60);

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    millis = Math.floor(millis / 10);

    if (millis < 10)
        millis = "0" + millis;

    return  minutes + ":" + seconds + "." + millis;
};
