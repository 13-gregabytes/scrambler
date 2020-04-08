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

    $("body").append("<a id='pll-section'><hr></a>");

    LastLayer.drawPLL("Ua",
        ["B1:B", "B2:B", "B3:B", "L1:R", "L2:G", "L3:R", "R1:O", "R2:R", "R3:O", "F1:G", "F2:O", "F3:G"],
        ["M2", "U", "M", "U2", "M'", "U", "M2"],
        ["R", "U'", "R", "U", "R", "U", "R", "U'", "R'", "U'", "R2"],
        ["6:4", "4:8", "8:6"]
    );
    LastLayer.drawPLL("Ub",
        ["B1:B", "B2:B", "B3:B", "L1:R", "L2:O", "L3:R", "R1:O", "R2:G", "R3:O", "F1:G", "F2:R", "F3:G"],
        ["M2", "U'", "M", "U2", "M'", "U'", "M2"],
        ["R2", "U", "R", "U", "R'", "U'", "R'", "U'", "R'", "U", "R'"],
        ["4:6", "8:4", "6:8"]
    );
    LastLayer.drawPLL("Z",
    ["B1:B", "B2:R", "B3:B", "L1:R", "L2:B", "L3:R", "R1:O", "R2:G", "R3:O", "F1:G", "F2:O", "F3:G"],
    ["M", "U'", "(M2", "U')2", "M", "U2", "M2"],
    ["M2", "U", "M2", "U", "M'", "U2", "M2", "U2", "M'", "U2"],
    ["4:2", "8:6"]
    );
    LastLayer.drawPLL("H",
        ["B1:B", "B2:G", "B3:B", "L1:R", "L2:O", "L3:R", "R1:O", "R2:R", "R3:O", "F1:G", "F2:B", "F3:G"],
        ["M2", "U", "M2", "U2", "M2", "U", "M2"],
            undefined,
            ["2:8", "4:6"]
    );
    LastLayer.drawPLL("E",
        ["B1:R", "B2:B", "B3:O", "L1:G", "L2:R", "L3:B", "R1:G", "R2:O", "R3:B", "F1:R", "F2:G", "F3:O"],
        ["x'", "(R", "U'", "R'", "D)", "(R", "U", "R'", "D')", "(R", "U", "R'", "D)", "(R", "U'", "R'", "D')", "x"],
            undefined,
            ["1:7", "3:9"]
    );

    $("body").append("<hr>");

    LastLayer.drawPLL("Edge flip",
        ["B1:B", "B2:B", "B3:B", "L1:R", "L2:Y", "L3:R", "R1:O", "R2:Y", "R3:O", "F1:G", "F2:G", "F3:G", "U4:R", "U6:O"],
        ["(R", "E", "R2", "E2", "R)", "U2<br>", "(R'", "E2", "R2", "E'", "R')", "U2"]
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

LastLayer.drawPLL = function draw(pattern, squares, solve, altsolve, moves) {
    let cube = LastLayer.getTemplate().clone().removeClass("template").addClass("card pll").addClass(pattern);

    cube.find(".title .text").html(pattern);

    let solvetext = solve.join(" ");
    solvetext += ((altsolve != undefined) ? ("<br><br>" + altsolve.join(" ")) : "");

    cube.find(".solve .text").html(solvetext);

    for (let s in squares) {
        let parts = squares[s].split(":");
        let square = parts[0];
        let color = parts[1];
        cube.find("." + square).addClass(color);
    }

    let canvas = $("<canvas width='166' height='166'>");

    cube.find(".cube").append(canvas);

    if (moves)
        LastLayer.drawMoves(moves, canvas);

    cube.appendTo("body");
};

LastLayer.drawMoves = function drawMoves(moves, canvas) {
    let ctx = canvas[0].getContext("2d");

    ctx.clearRect(0,0,1000,1000)

    let xScew = 7;
    let yScew = 7;

    let coords = {
        "1": { "x": 27  - xScew, "y": 27 - yScew  },
        "2": { "x": 83  - xScew, "y": 27 - yScew  },
        "3": { "x": 137 - xScew, "y": 27 - yScew  },

        "4": { "x": 27  - xScew, "y": 83 - yScew  },
        "5": { "x": 83  - xScew, "y": 83 - yScew  },
        "6": { "x": 137 - xScew, "y": 83 - yScew  },

        "7": { "x": 27  - xScew, "y": 137 - yScew },
        "8": { "x": 83  - xScew, "y": 137 - yScew },
        "9": { "x": 137 - xScew, "y": 137 - yScew }
    };

    for (let m in moves) {
        let move = moves[m].split(":");
        let start = move[0];
        let end = move[1];

        let startX = coords[start].x;
        let startY = coords[start].y;

        let endX = coords[end].x;
        let endY = coords[end].y;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#0000FF";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(startX, startY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#00FF00";
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.arc(startX, startY, 5, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(endX, endY, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#FF0000";
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#000000";
        ctx.arc(endX, endY, 5, 0, 2 * Math.PI);
        ctx.stroke();

        coords[start].x = startX + (xScew * 2);
        coords[start].y = startY + (yScew * 2);

        coords[end].x = endX + (xScew * 2);
        coords[end].y = endY + (yScew * 2);
    }
};
