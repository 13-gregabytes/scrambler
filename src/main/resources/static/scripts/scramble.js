window.cube = {};
cube.onload = function onload() {
    ajax.get("http://localhost:8080/scramble/.json?=333", undefined, function (json) {
        let scrambleJSON = JSON.parse(json)
        let scramble = scrambleJSON[0].scrambles[0];
        let puzzle = scrambleJSON[0].scrambler;

        let scrambleDiv = $("#scramble");

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
    ajax.get("http://localhost:8080/view/" + puzzle + ".svg?scramble=" + scramble, undefined, function (svg) {
        $("#image").html(svg);
    });
};
