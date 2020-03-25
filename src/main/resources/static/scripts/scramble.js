window.cube = {};

cube.baseURL = "http://localhost:8080";
// cube.baseURL = "https://monkeyspaz.com/scrambler";

cube.onload = function onload() {
    $("body").on("keypress", function (event) {
        cube.startStopClock(event)
    });

    cube.getScramble();

    cube.getSolvesFromLocalStorage();
};

cube.getScramble = function getScramble() {
    ajax.get(cube.baseURL + "/scramble/.json?=333", undefined, function (json) {
        let scrambleJSON = JSON.parse(json)
        let scramble = scrambleJSON[0].scrambles[0];
        let puzzle = scrambleJSON[0].scrambler;

        let scrambleDiv = $("#scramble");

        scrambleDiv.html("");

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
};

cube.getImage = function getImage(puzzle, scramble) {
    ajax.get(cube.baseURL + "/view/" + puzzle + ".svg?scramble=" + scramble, undefined, function (svg) {
        $("#image").html(svg);
    });
};

cube.getSolvesFromLocalStorage = function getSolvesFromLocalStorage() {
    let solves = localStorage.getItem("solves");
    let solvesArray;

    if (solves && (solvesArray = JSON.parse(solves))) {
        cube.populateSolvesDiv(solvesArray);
    }
};

cube.populateSolvesDiv = function populateSolvesDiv(solvesArray) {
    let list = $("ol.solvesList");

    if (!list.length)
        list = $("<ol>").addClass("solvesList").prop("reversed", true);

    for (let x in solvesArray) {
        let solve = solvesArray[x];

        let solveStr = JSON.stringify(solve);
        let solveBase64 = btoa(solveStr);

        let tspan = $("<span>").text(solve.time).addClass("solveTime");
        let infoSpan = $("<span>").text(solveBase64).addClass("solveInfo").hide();
        let delSpan = $("<i>").addClass("fa fa-times-circle").on("click", function() {
            alert("Going to delete this in a future version");
        });

        let li = $("<li>").addClass("solveItem").append(tspan).append(infoSpan).append(delSpan);

        list.prepend(li);
    }

    $("#solves").html("");
    $("#solves").append(list);

    cube.calculateAverages();
};

cube.calculateAverages = function calculateAverages() {
    let objArray = JSON.parse(JSON.stringify(cube.collectSolvesToArray()));

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

cube.collectSolvesToArray = function collectSolvesToArray() {

    let timeArray = [];

    $(".solveItem").each(function () {
        let self = $(this);
        let solveObj = {
            "time": self.find(".solveTime").text(),
            "scramble": self.find(".solveInfo").text(),
            "date": self.find(".solveDate").text()
        };

        timeArray.unshift(solveObj);
    });

    return timeArray;
};

cube.setSolvesToLocalStorage = function setSolvesToLocalStorage() {
    let solvesArray = cube.collectSolvesToArray();
    if (solvesArray.length && localStorage.setItem("solves", JSON.stringify(solvesArray)));
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

            let solveObj = {
                "scramble": $(".totalScramble").text(),
                "time": $("#clock").text(),
                "date": (new Date()).getTime()
            };
            cube.populateSolvesDiv([solveObj]);
            cube.setSolvesToLocalStorage();
        }
    }
};

cube.resetClock = function resetClock() {
    cube.clockStopped = false;
    clearInterval(cube.clockInterval);
    cube.clockInterval = undefined;
    cube.clockStart = undefined;

    $("#clock").html("00:00.00");

    cube.getScramble();
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
