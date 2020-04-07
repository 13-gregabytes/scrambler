window.LastLayer = {};

LastLayer.go = function go() {
    LastLayer.drawOLL("Sune",
        ["B1", "U2", "R1", "U4", "U5", "U6", "U7", "U8", "F3"],
        ["R", "U", "R'", "U", "R", "U2", "R'"]
    );
    LastLayer.drawOLL("Anti-Sune",
        ["L1","U2", "U3", "U4", "U5", "U6", "U8", "R3", "F1"],
        ["R", "U2", "R'", "U'", "R", "U'", "R'"]
    );
    LastLayer.drawOLL("OCLL1",
        ["B1","B3", "U2", "U4", "U5", "U6", "U8", "F1", "F3"],
        ["F", "(R", "U", "R'", "U')3", "F'"],
        ["R", "U2", "R'", "U'", "R", "U", "R'", "U'", "R", "U'", "R'"]
    );
    LastLayer.drawOLL("OCLL2",
        ["B3", "L1", "U2", "U4", "U5", "U6", "L3", "U8", "F3"],
        ["R", "U2", "R2", "U'", "R2", "U'", "R2", "U2", "R"]
    );
    LastLayer.drawOLL("OCLL5",
        ["L1", "U2", "U3", "U4", "U5", "U6", "U7", "U8", "F3"],
        ["F'", "L", "F", "R'", "F'", "L'", "F", "R"],
        ["F'", "(r", "U", "R'", "U')", "r'", "F", "R"]
    );
    LastLayer.drawOLL("OCLL4",
        ["B1", "U2", "U3", "U4", "U5", "U6", "U8", "U9", "F1"],
        ["F", "R", "F'", "L", "F", "R'", "F'", "L'"],
        ["(r", "U", "R'", "U')", "(r'", "F", "R", "F')"]
    );
    LastLayer.drawOLL("OCLL3",
        ["U1", "U2", "U3", "U4", "U5", "U6", "U8", "F1", "F3"],
        ["R2", "D", "R'", "U2", "R", "D'", "R'", "U2", "R'"]
    );

    $("body").append("<hr>");

    LastLayer.drawPLL("Ua",
        ["B1:B", "B2:B", "B3:B", "L1:R", "L2:G", "L3:R", "R1:O", "R2:R", "R3:O", "F1:G", "F2:O", "F3:G"],
        ["M2", "U", "M", "U2", "M'", "U", "M2"],
        ["R", "U'", "R", "U", "R", "U", "R", "U'", "R'", "U'", "R2"]
    );
    LastLayer.drawPLL("Ub",
        ["B1:B", "B2:B", "B3:B", "L1:R", "L2:O", "L3:R", "R1:O", "R2:G", "R3:O", "F1:G", "F2:R", "F3:G"],
        ["M2", "U'", "M", "U2", "M'", "U'", "M2"],
        ["R2", "U", "R", "U", "R'", "U'", "R'", "U'", "R'", "U", "R'"]
    );
    LastLayer.drawPLL("Z",
        ["B1:B", "B2:R", "B3:B", "L1:R", "L2:B", "L3:R", "R1:O", "R2:G", "R3:O", "F1:G", "F2:O", "F3:G"],
        ["M", "U'", "(M2", "U')2", "M", "U2", "M2"],
        ["M2", "U", "M2", "U", "M'", "U2", "M2", "U2", "M'", "U2"]
    );
    LastLayer.drawPLL("H",
        ["B1:B", "B2:G", "B3:B", "L1:R", "L2:O", "L3:R", "R1:O", "R2:R", "R3:O", "F1:G", "F2:B", "F3:G"],
        ["M2", "U", "M2", "U2", "M2", "U", "M2"]
    );
};

LastLayer.getTemplate = function getTemplate() {
    if (!LastLayer.template)
        LastLayer.template = $(".templateArea > .template");

    return LastLayer.template;
};

LastLayer.drawOLL = function draw(pattern, squares, solve, altsolve) {
    let cube = LastLayer.getTemplate().clone().removeClass("template").addClass("card oll").addClass(pattern);

    cube.find(".title .text").html(pattern);

    let solvetext = solve.join(" ").toUpperCase();
    solvetext += ((altsolve != undefined) ? ("<br><br>" + altsolve.join(" ")) : "");

    cube.find(".solve .text").html(solvetext);

    for (let s in squares) {
        cube.find("." + squares[s]).addClass("Y");
    }

    cube.appendTo("body");
};

LastLayer.drawPLL = function draw(pattern, squares, solve, altsolve) {
    let cube = LastLayer.getTemplate().clone().removeClass("template").addClass("card pll").addClass(pattern);

    cube.find(".title .text").html(pattern);

    let solvetext = solve.join(" ").toUpperCase();
    solvetext += ((altsolve != undefined) ? ("<br><br>" + altsolve.join(" ")) : "");

    cube.find(".solve .text").html(solvetext);

    for (let s in squares) {
        let parts = squares[s].split(":");
        let square = parts[0];
        let color = parts[1];
        cube.find("." + square).addClass(color);
    }

    cube.find(".cube").append("<canvas width='166' height='166'>");

/*
ctx.clearRect(0,0,1000,1000)

ctx.beginPath();
ctx.moveTo(27, 83);
ctx.lineTo(139, 83);
ctx.lineWidth = 3;
ctx.strokeStyle = "#0000FF";
ctx.stroke();

ctx.beginPath();
ctx.arc(27, 83, 5, 0, 2 * Math.PI);
ctx.fillStyle = "#FF0000";
ctx.fill();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = "#000000";
ctx.arc(27, 83, 5, 0, 2 * Math.PI);
ctx.stroke();

ctx.beginPath();
ctx.arc(139, 83, 5, 0, 2 * Math.PI);
ctx.fillStyle = "#00FF00";
ctx.fill();

ctx.beginPath();
ctx.lineWidth = 1;
ctx.strokeStyle = "#000000";
ctx.arc(139, 83, 5, 0, 2 * Math.PI);
ctx.stroke();
*/

    cube.appendTo("body");
};
