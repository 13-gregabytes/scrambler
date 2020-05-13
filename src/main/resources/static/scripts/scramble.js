window.cube = window.cube || {};

cube.baseURL = document.location.protocol + '//' + document.location.host + ((document.location.port) ? (':' + document.location.port) : '');

cube.puzzle = "333";
cube.solves = [];

cube.onload = function onload() {
    // $("body").prepend("<span>w= " + $("body").outerWidth() + "/ h= " + $("body").outerHeight() + "</span>")

    $("body").on("keypress touchend", function (event) {
        cube.startStopClock(event)
    });

    $("input[type='radio']").on("click", function() {
        cube.retrieveSolves();
    }).on("touchend", function() {
        return false;
    }).checkboxradio({icon: false});

    $("button").on("click", function() {
        cube.getScramble();
    }).on("keyup keydown keypress", function(event) {
        event.preventDefault();
        return false;
    }).button();

    cube.getScramble();
    cube.retrieveSolves();
};

cube.getScramble = function getScramble() {
    ajax.get(cube.baseURL + "/scrambler/scramble/.json?=" + cube.puzzle, undefined, cube.processScramble);
};

cube.processScramble = function processScramble(scrambleResponse) {
    let scrambleJSON = JSON.parse(scrambleResponse)
    let scramble = scrambleJSON[0].scrambles[0];
    let puzzle = scrambleJSON[0].scrambler;

    let scrambleDiv = $(".scramble");

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
};

cube.getImage = function getImage(puzzle, scramble) {
    if ((typeof puzzle) == "object")
        puzzle = cube.puzzle;

    ajax.get(cube.baseURL + "/scrambler/view/" + puzzle + ".svg?scramble=" + scramble, undefined, cube.displayImage);
};

cube.displayImage = function displayImage(svg) {
    $(".image").html(svg);
};

cube.saveSolves = function saveSolves() {
    let solvesArrayAsString = JSON.stringify(cube.solves);
    let solveMethod = cube.getSolveMethod();

    ajax.post(cube.baseURL + "/scrambler/save", { "solves": btoa(solvesArrayAsString), "solveMethod": solveMethod }, undefined);
};

cube.retrieveSolves = function retrieveSolves() {
    let solveMethod = cube.getSolveMethod();
    ajax.get(cube.baseURL + "/scrambler/retrieve", { "solveMethod": solveMethod }, cube.processSolves);
};

cube.processSolves = function processSolves(base64response) {
    let solvesArray = [];

    if (base64response) {
        let solvesStr = atob(base64response);
        solvesArray = JSON.parse(solvesStr);
    }

    cube.solves = cube.clone(solvesArray);
    cube.populateSolvesDiv();
};

cube.populateSolvesDiv = function populateSolvesDiv() {
    let list;

    if (cube.solves.length == 0)
        list = $("<span>").text("No stored " + cube.getSolveMethod() + " solves");
    else {
        list = $("<ol>").addClass("solvesList").prop("reversed", true);

        for (let x in cube.solves) {
            let solve = cube.solves[x];

            let solveStr = JSON.stringify(solve);
            let solveBase64 = btoa(solveStr);

            let tspan = $("<span>").text(solve.time).addClass("solveTime");
            let infoSpan = $("<span>").text(solveBase64).addClass("solveInfo").hide();
            let delSpan = $("<i>").addClass("fa fa-times-circle").on("click", function () {
                return (function (index) {
                    cube.solves.splice(index, 1);
                    cube.populateSolvesDiv();
                    cube.saveSolves();
                })(x);
            });
            let iSpan = $("<i>").addClass("fa fa-info-circle").on("click", function () {
                let s = atob($(this).siblings(".solveInfo").text());
                let o = JSON.parse(s);
                let date = new Date(o.date);
                let solve = o.time;
                let scramble = o.scramble
                let d = $("<div id='dialog' title=''>").html(date.toString().substring(0,21) + "<br><br>" + solve + "<br><br>" + scramble);
                d.dialog({
                    width: 500,
                    height: 200g
                });
            });

            let li = $("<li>").addClass("solveItem").append(tspan).append(infoSpan).append(delSpan).append(iSpan);

            list.prepend(li);
        }
    }

    $(".solves").html("");
    $(".solves").append(list);

    cube.calculateAverages();
};

cube.calculateAverages = function calculateAverages() {
    let objArray = cube.clone(cube.solves);

    let timeArray = [];
    objArray.forEach(function (val) {
        timeArray.push(cube.convertTimeStringToMillis(val.time));
    });

    let bestArray = JSON.parse(JSON.stringify(timeArray));

    bestArray.sort(function(a, b) { return a - b; });

    // remove the best and worst time
    bestArray.shift();
    bestArray.pop();

    let averagesDiv = $(".averages");
    averagesDiv.html("");

    if (timeArray.length > 0) {
        averagesDiv.append($("<div>").addClass("avg").html("Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(bestArray, bestArray.length))));

        let partAvg = Math.round(timeArray.length / 2);

        while (partAvg > 2) {
            let bestArray = JSON.parse(JSON.stringify(timeArray));
            let worstArray = JSON.parse(JSON.stringify(timeArray));

            bestArray.sort(function(a, b) { return a - b; });
            worstArray.sort(function(a, b) { return b - a; });

            bestArray.length = partAvg + 1;
            bestArray.shift();
            worstArray.length = partAvg + 1;
            worstArray.shift();

            averagesDiv.append($("<hr>").css("width", "90%"));

            averagesDiv.append($("<div>").addClass("avg").html("<span class='bestworst best'>Best " + partAvg + "</span> Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(bestArray, partAvg))));
            averagesDiv.append($("<div>").addClass("avg").html("<span class='bestworst worst'>Worst " + partAvg + "</span> Avg: " + cube.convertMillisToTimeString(cube.calculateAveragesWork(worstArray, partAvg))));

            partAvg = Math.round(partAvg / 2);
        }
    }
}

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

cube.startStopClock = function startStopClock(event) {

    if ((event.originalEvent instanceof KeyboardEvent) && (event.code != "Space")) {
        return;
    }

    if (cube.clockStopped)
        cube.resetClock();
    else if (cube.clockInterval == undefined) {
        let clockDiv = $(".clock");

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
            "time": $(".clock").text(),
            "date": (new Date()).getTime()
        };

        cube.solves.push(solveObj);
        cube.saveSolves();
        cube.populateSolvesDiv();
    }
};

cube.resetClock = function resetClock() {
    cube.clockStopped = false;
    clearInterval(cube.clockInterval);
    cube.clockInterval = undefined;
    cube.clockStart = undefined;

    $(".clock").html("00:00.00");

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

cube.clone = function clone(jsonObject) {
    return JSON.parse(JSON.stringify(jsonObject));
};

cube.getSolveMethod = function getSolveMethod() {
    return $('input[name="solveMethod"]:checked').val();
};
