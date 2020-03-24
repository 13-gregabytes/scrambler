window.cube = {};

cube.allowedMoves = 63; // 111111

cube.allowed = {};
cube.allowed.U = 1;  // 000001
cube.allowed.D = 2;  // 000010
cube.allowed.L = 4;  // 000100
cube.allowed.R = 8;  // 001000
cube.allowed.F = 16; // 010000
cube.allowed.B = 32; // 100000

cube.moves = [ "x", "L", "R", "F", "B", "U", "D", "Li", "Ri", "Fi", "Bi", "Ui", "Di", "L2", "R2", "F2", "B2", "U2", "D2" ];

cube.faces = {};

cube.matrix = {};

cube.matrix.rotate90 = {
    "x": {"1": 0, "2": -1},
    "y": {"1": 1, "2": 0}
};

cube.matrix.rotate180 = {
    "x": {"1": -1, "2": 0},
    "y": {"1": 0, "2": -1}
};

cube.matrix.rotate270 = {
    "x": {"1": 0, "2": 1},
    "y": {"1": -1, "2": 0}
};

cube.createFace = function createFace(face, colour) {
    let a = {};

    for (let x = -1; x < 2; x++) {
        a[x] = {};

        for (let y = -1; y < 2; y++) {
            a[x][y] = colour;
        }
    }

    cube.faces[face] = a;
}

cube.resetCube = function resetCube() {
    cube.createFace("u", "w");
    cube.createFace("d", "y");
    cube.createFace("l", "o");
    cube.createFace("r", "r");
    cube.createFace("f", "g");
    cube.createFace("b", "b");
};

cube.action = function action(arg) {

    $(window).on("resize", function(event) { cube.resize(); });
    $("body").on("keypress", function(event) { cube.startStopClock(event) });

    $(".move").height($(".move").width() / 2);
    $(".piece").height($(".piece").width());

    $(".move").html("");
    $(".piece").removeClass("w o g r b y");

    cube.resetCube();

    cube.shuffle(arg);
};

cube.shuffle = function shuffle(arg) {
    let moves = cube.getSequence(arg);

    cube.shuffleWork(moves, arg, 0);
};

cube.shuffleWork = function shuffleWork(moves, arg, index) {
    let moveDivs = $(".move");

    if (moves.length) {
        let move = moves.shift();

        if (move != "x") {
            while (move.length < 3)
                move += " ";

            let text = $("<div>").addClass("text");
            text.html(move.replace(/ /g, "&nbsp;"));
            $(moveDivs[index]).append(text);

            cube.turn(move);
            cube.display();
        }

        setTimeout(function() { cube.shuffleWork(moves, arg, ++index); }, 100);
    }
};

cube.getSequence = function getSequence(arg) {
    let shuffleArray = [];
    let numberOfMoves = 21;

    if (arg instanceof Array) {
        shuffleArray = arg;
        numberOfMoves = 0;
    }

    if (!isNaN(arg))
        numberOfMoves = arg;

    for (let i = 0; i < numberOfMoves;) {
        let rndm = Math.round(Math.random() * (cube.moves.length - 1));
        let move = cube.moves[rndm];

        if (shuffleArray.length == 0) {
            shuffleArray.push(move);
            cube.allowedMoves &= ~cube.allowed[move.charAt(0)];
            i++;
        } else {
            try {
                if ((cube.allowedMoves & cube.allowed[move.charAt(0)]) == cube.allowed[move.charAt(0)]) {
                    shuffleArray.push(move);
                    switch (move.charAt(0)) {
                        case "U":
                            cube.allowedMoves &= ~cube.allowed["U"];
                            cube.allowedMoves |= (cube.allowed["F"] | cube.allowed["B"] | cube.allowed["R"] | cube.allowed["L"]);
                            break;
                        case "D":
                            cube.allowedMoves &= ~cube.allowed["D"];
                            cube.allowedMoves |= (cube.allowed["F"] | cube.allowed["B"] | cube.allowed["R"] | cube.allowed["L"]);
                            break;
                        case "R":
                            cube.allowedMoves &= ~cube.allowed["R"];
                            cube.allowedMoves |= (cube.allowed["F"] | cube.allowed["B"] | cube.allowed["U"] | cube.allowed["D"]);
                            break;
                        case "L":
                            cube.allowedMoves &= ~cube.allowed["L"];
                            cube.allowedMoves |= (cube.allowed["F"] | cube.allowed["B"] | cube.allowed["U"] | cube.allowed["D"]);
                            break;
                        case "F":
                            cube.allowedMoves &= ~cube.allowed["F"];
                            cube.allowedMoves |= (cube.allowed["L"] | cube.allowed["R"] | cube.allowed["U"] | cube.allowed["D"]);
                            break;
                        case "B":
                            cube.allowedMoves &= ~cube.allowed["B"];
                            cube.allowedMoves |= (cube.allowed["L"] | cube.allowed["R"] | cube.allowed["U"] | cube.allowed["D"]);
                            break;
                        default:
                            break;
                    }
                    i++;
                }
            } catch (e) {
                console.error("Something is undefined.\n" + shuffleArray + "\n" + move + "\n" + cube.moves + "\n" + rndm);
            }
        }
    }

    return shuffleArray;
};

cube.turn = function turn(move) {
    let breakdown = move.split("");
    let double = breakdown[1] == "2";
    let prime = breakdown[1] == "i";

    switch (breakdown[0]) {
        case "U":
            if (prime) {
                cube.rotateFace(cube.faces.u, "rotate90");
                cube.rotateUi();
            } else {
                cube.rotateFace(cube.faces.u, "rotate270");
                cube.rotateU();
            }
            break;
        case "D":
            if (prime) {
                cube.rotateFace(cube.faces.d, "rotate90");
                cube.rotateDi();
            } else {
                cube.rotateFace(cube.faces.d, "rotate270");
                cube.rotateD();
            }
            break;
        case "R":
            if (prime) {
                cube.rotateFace(cube.faces.r, "rotate90");
                cube.rotateRi();
            } else {
                cube.rotateFace(cube.faces.r, "rotate270");
                cube.rotateR();
            }
            break;
        case "L":
            if (prime) {
                cube.rotateFace(cube.faces.l, "rotate90");
                cube.rotateLi();
            } else {
                cube.rotateFace(cube.faces.l, "rotate270");
                cube.rotateL();
            }
            break;
        case "F":
            if (prime) {
                cube.rotateFace(cube.faces.f, "rotate90");
                cube.rotateFi();
            } else {
                cube.rotateFace(cube.faces.f, "rotate270");
                cube.rotateF();
            }
            break;
        case "B":
            if (prime) {
                cube.rotateFace(cube.faces.b, "rotate90");
                cube.rotateBi();
            } else {
                cube.rotateFace(cube.faces.b, "rotate270");
                cube.rotateB();
            }
            break;
    }

    if (double)
        cube.turn(breakdown[0]);

    return cube.faces;
};


cube.rotateFace = function rotateFace(face, rotationMatrix) {
    let hold = JSON.parse(JSON.stringify(face));

    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            let oldCoords = { "x": x, "y": y }

            let newCoords = cube.multiply(oldCoords, rotationMatrix);

            hold[newCoords.x][newCoords.y] = face[oldCoords.x][oldCoords.y];
        }
    }

    for (let x = -1; x < 2; x++) {
        for (let y = -1; y < 2; y++) {
            face[x][y] = hold[x][y];
        }
    }

    return cube.faces;
};

cube.multiply = function multiply(oldCoords, rotationMatrix) {
    let newCoords = {};

    let rm = cube.matrix[rotationMatrix];

    newCoords.x = (rm["x"][1] * oldCoords["x"]) + (rm["x"][2] * oldCoords["y"]);
    newCoords.y = (rm["y"][1] * oldCoords["x"]) + (rm["y"][2] * oldCoords["y"]);

    return newCoords;
};

cube.rotateU = function rotateU() {
    let hold = [];

    hold.push( cube.faces.l[-1][1] );
    hold.push( cube.faces.l[0][1]  );
    hold.push( cube.faces.l[1][1]  );

    hold.push( cube.faces.f[-1][1] );
    hold.push( cube.faces.f[0][1]  );
    hold.push( cube.faces.f[1][1]  );

    hold.push( cube.faces.r[-1][1] );
    hold.push( cube.faces.r[0][1]  );
    hold.push( cube.faces.r[1][1]  );

    hold.push( cube.faces.b[-1][1] );
    hold.push( cube.faces.b[0][1]  );
    hold.push( cube.faces.b[1][1]  );

    hold.push(hold.shift());
    hold.push(hold.shift());
    hold.push(hold.shift());

    cube.faces.l[-1][1] = hold.shift();
    cube.faces.l[0][1]  = hold.shift();
    cube.faces.l[1][1]  = hold.shift();

    cube.faces.f[-1][1] = hold.shift();
    cube.faces.f[0][1]  = hold.shift();
    cube.faces.f[1][1]  = hold.shift();

    cube.faces.r[-1][1] = hold.shift();
    cube.faces.r[0][1]  = hold.shift();
    cube.faces.r[1][1]  = hold.shift();

    cube.faces.b[-1][1] = hold.shift();
    cube.faces.b[0][1]  = hold.shift();
    cube.faces.b[1][1]  = hold.shift();

    return cube.faces;
};

cube.rotateUi = function rotateUi() {
    // 3 clockwise = 1 anticlockwise
    cube.rotateU();
    cube.rotateU();
    cube.rotateU();

    return cube.faces;
};

cube.rotateDi = function rotateDi() {
    let hold = [];

    hold.push( cube.faces.l[-1][-1] );
    hold.push( cube.faces.l[0][-1]  );
    hold.push( cube.faces.l[1][-1]  );

    hold.push( cube.faces.f[-1][-1] );
    hold.push( cube.faces.f[0][-1]  );
    hold.push( cube.faces.f[1][-1]  );

    hold.push( cube.faces.r[-1][-1] );
    hold.push( cube.faces.r[0][-1]  );
    hold.push( cube.faces.r[1][-1]  );

    hold.push( cube.faces.b[-1][-1] );
    hold.push( cube.faces.b[0][-1]  );
    hold.push( cube.faces.b[1][-1]  );

    hold.push(hold.shift());
    hold.push(hold.shift());
    hold.push(hold.shift());

    cube.faces.l[-1][-1] = hold.shift();
    cube.faces.l[0][-1]  = hold.shift();
    cube.faces.l[1][-1]  = hold.shift();

    cube.faces.f[-1][-1] = hold.shift();
    cube.faces.f[0][-1]  = hold.shift();
    cube.faces.f[1][-1]  = hold.shift();

    cube.faces.r[-1][-1] = hold.shift();
    cube.faces.r[0][-1]  = hold.shift();
    cube.faces.r[1][-1]  = hold.shift();

    cube.faces.b[-1][-1] = hold.shift();
    cube.faces.b[0][-1]  = hold.shift();
    cube.faces.b[1][-1]  = hold.shift();

    return cube.faces;
};

cube.rotateD = function rotateD() {
    // 3 clockwise = 1 anticlockwise
    cube.rotateDi();
    cube.rotateDi();
    cube.rotateDi();

    return cube.faces;
};

cube.rotateR = function rotateR() {
    let hold = [];

    hold.push( cube.faces.u[1][1]   );
    hold.push( cube.faces.u[1][0]   );
    hold.push( cube.faces.u[1][-1]  );

    hold.push( cube.faces.f[1][1]   );
    hold.push( cube.faces.f[1][0]   );
    hold.push( cube.faces.f[1][-1]  );

    hold.push( cube.faces.d[1][1]   );
    hold.push( cube.faces.d[1][0]   );
    hold.push( cube.faces.d[1][-1]  );

    hold.push( cube.faces.b[-1][-1] );
    hold.push( cube.faces.b[-1][0]  );
    hold.push( cube.faces.b[-1][1]  );

    hold.push(hold.shift());
    hold.push(hold.shift());
    hold.push(hold.shift());

    cube.faces.u[1][1]  = hold.shift();
    cube.faces.u[1][0]  = hold.shift();
    cube.faces.u[1][-1] = hold.shift();

    cube.faces.f[1][1]  = hold.shift();
    cube.faces.f[1][0]  = hold.shift();
    cube.faces.f[1][-1] = hold.shift();

    cube.faces.d[1][1]  = hold.shift();
    cube.faces.d[1][0]  = hold.shift();
    cube.faces.d[1][-1] = hold.shift();

    cube.faces.b[-1][-1] = hold.shift();
    cube.faces.b[-1][0]  = hold.shift();
    cube.faces.b[-1][1]  = hold.shift();

    return cube.faces;
};

cube.rotateRi = function rotateRi() {
    // 3 clockwise = 1 anticlockwise
    cube.rotateR();
    cube.rotateR();
    cube.rotateR();

    return cube.faces;
};


cube.rotateLi = function rotateLi() {
    let hold = [];

    hold.push( cube.faces.u[-1][1]  );
    hold.push( cube.faces.u[-1][0]  );
    hold.push( cube.faces.u[-1][-1] );

    hold.push( cube.faces.f[-1][1]  );
    hold.push( cube.faces.f[-1][0]  );
    hold.push( cube.faces.f[-1][-1] );

    hold.push( cube.faces.d[-1][1]  );
    hold.push( cube.faces.d[-1][0]  );
    hold.push( cube.faces.d[-1][-1] );

    hold.push( cube.faces.b[1][-1]  );
    hold.push( cube.faces.b[1][0]   );
    hold.push( cube.faces.b[1][1]   );

    hold.push(hold.shift());
    hold.push(hold.shift());
    hold.push(hold.shift());

    cube.faces.u[-1][1]  = hold.shift();
    cube.faces.u[-1][0]  = hold.shift();
    cube.faces.u[-1][-1] = hold.shift();

    cube.faces.f[-1][1]  = hold.shift();
    cube.faces.f[-1][0]  = hold.shift();
    cube.faces.f[-1][-1] = hold.shift();

    cube.faces.d[-1][1]  = hold.shift();
    cube.faces.d[-1][0]  = hold.shift();
    cube.faces.d[-1][-1] = hold.shift();

    cube.faces.b[1][-1]   = hold.shift();
    cube.faces.b[1][0]    = hold.shift();
    cube.faces.b[1][1]    = hold.shift();

    return cube.faces;
};

cube.rotateL = function rotateL() {
    // 3 clockwise = 1 anticlockwise
    cube.rotateLi();
    cube.rotateLi();
    cube.rotateLi();

    return cube.faces;
};

cube.rotateF = function rotateF() {
    let hold = [];

    hold.push( cube.faces.u[1][-1]  );
    hold.push( cube.faces.u[0][-1]  );
    hold.push( cube.faces.u[-1][-1] );

    hold.push( cube.faces.l[1][1]   );
    hold.push( cube.faces.l[1][0]   );
    hold.push( cube.faces.l[1][-1]  );

    hold.push( cube.faces.d[-1][1]  );
    hold.push( cube.faces.d[0][1]   );
    hold.push( cube.faces.d[1][1]   );

    hold.push( cube.faces.r[-1][-1] );
    hold.push( cube.faces.r[-1][0]  );
    hold.push( cube.faces.r[-1][1]  );

    hold.push(hold.shift());
    hold.push(hold.shift());
    hold.push(hold.shift());

    cube.faces.u[1][-1]  = hold.shift();
    cube.faces.u[0][-1]  = hold.shift();
    cube.faces.u[-1][-1] = hold.shift();

    cube.faces.l[1][1]   = hold.shift();
    cube.faces.l[1][0]   = hold.shift();
    cube.faces.l[1][-1]  = hold.shift();

    cube.faces.d[-1][1]  = hold.shift();
    cube.faces.d[0][1]   = hold.shift();
    cube.faces.d[1][1]   = hold.shift();

    cube.faces.r[-1][-1] = hold.shift();
    cube.faces.r[-1][0]  = hold.shift();
    cube.faces.r[-1][1]  = hold.shift();

    return cube.faces;
};

cube.rotateFi = function rotateFi() {
    // 3 clockwise = 1 anticlockwise
    cube.rotateF();
    cube.rotateF();
    cube.rotateF();

    return cube.faces;
};


cube.rotateBi = function rotateBi() {
    let hold = [];

    hold.push( cube.faces.u[1][1]  );
    hold.push( cube.faces.u[0][1]  );
    hold.push( cube.faces.u[-1][1] );

    hold.push( cube.faces.l[-1][1]  );
    hold.push( cube.faces.l[-1][0]  );
    hold.push( cube.faces.l[-1][-1] );

    hold.push( cube.faces.d[-1][-1] );
    hold.push( cube.faces.d[0][-1]  );
    hold.push( cube.faces.d[1][-1]  );

    hold.push( cube.faces.r[1][-1] );
    hold.push( cube.faces.r[1][0]  );
    hold.push( cube.faces.r[1][1]  );

    hold.push(hold.shift());
    hold.push(hold.shift());
    hold.push(hold.shift());

    cube.faces.u[1][1]   = hold.shift();
    cube.faces.u[0][1]   = hold.shift();
    cube.faces.u[-1][1]  = hold.shift();

    cube.faces.l[-1][1]  = hold.shift();
    cube.faces.l[-1][0]  = hold.shift();
    cube.faces.l[-1][-1] = hold.shift();

    cube.faces.d[-1][-1] = hold.shift();
    cube.faces.d[0][-1]  = hold.shift();
    cube.faces.d[1][-1]  = hold.shift();

    cube.faces.r[1][-1]  = hold.shift();
    cube.faces.r[1][0]   = hold.shift();
    cube.faces.r[1][1]   = hold.shift();

    return cube.faces;
};

cube.rotateB = function rotateB() {
    // 3 clockwise = 1 anticlockwise
    cube.rotateBi();
    cube.rotateBi();
    cube.rotateBi();

    return cube.faces;
};

cube.display = function display() {
    let parent = $("#display");
    parent.hide();

    $(".piece").removeClass("w o g r b y");

    for (let y = -1; y <= 1; y++) {
        for (let x = -1; x <= 1; x++) {
            $("#U" + x + "" + y).addClass(cube.faces.u[x][y]);
            $("#L" + x + "" + y).addClass(cube.faces.l[x][y]);
            $("#F" + x + "" + y).addClass(cube.faces.f[x][y]);
            $("#R" + x + "" + y).addClass(cube.faces.r[x][y]);
            $("#B" + x + "" + y).addClass(cube.faces.b[x][y]);
            $("#D" + x + "" + y).addClass(cube.faces.d[x][y]);
        }
    }

    parent.show();
};


cube.resize = function resize() {

    $(".move").height($(".move").width() / 2);
    $(".piece").height($(".piece").width());

    // cube.display();
};

