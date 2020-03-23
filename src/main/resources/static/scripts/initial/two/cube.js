window.cube = {};

cube.faces = {};

cube.matrix = {};

cube.matrix.rotate90 = {
    "x": {"1": 0, "2": -1},
    "y": {"1": 1, "2": 0},
    "addX": 1,
    "addY": 0
};

cube.matrix.rotate180 = {
    "x": {"1": -1, "2": 0},
    "y": {"1": 0, "2": -1},
    "addX": 1,
    "addY": 1
};

cube.matrix.rotate270 = {
    "x": {"1": 0, "2": 1},
    "y": {"1": -1, "2": 0},
    "addX": 0,
    "addY": 1
};

cube.createFace = function createFace(face, colour) {
    let a = {};

    for (let x = 0; x < 2; x++) {
        a[x] = {};

        for (let y = 0; y < 2; y++) {
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

    $(".piece").height($(".piece").width());

    cube.resetCube();

    cube.display();
};

cube.display = function display() {
    let parent = $("#display");
    parent.hide();

    $(".piece").removeClass("w o g r b y");

    for (let y = 0; y <= 1; y++) {
        for (let x = 0; x <= 1; x++) {
            let a = x + 1;
            let b = (y - 1) * -1;
            let c = (2 * b) + a;

            let text = "(" + x + "," + y + ")<br>[" + c + "]";

            $("#U" + x + "" + y).addClass(cube.faces.u[x][y]).html("U" + text);
            let uRotate = cube.rotate(cube.faces.u, "rotate90", true);
            $("#U" + x + "" + y + "90").addClass("faded").addClass(uRotate[x][y].colour).html("U" + uRotate[x][y].text);
            uRotate = cube.rotate(cube.faces.u, "rotate270", true);
            $("#U" + x + "" + y + "270").addClass("faded").addClass(uRotate[x][y].colour).html("U" + uRotate[x][y].text);
            uRotate = cube.rotate(cube.faces.u, "rotate180", true);
            $("#U" + x + "" + y + "180").addClass("faded").addClass(uRotate[x][y].colour).html("U" + uRotate[x][y].text);

            $("#L" + x + "" + y).addClass(cube.faces.l[x][y]).html("L" + text);
            let lRotate = cube.rotate(cube.faces.l, "rotate180", true);
            $("#L" + x + "" + y + "180").addClass("faded").addClass(lRotate[x][y].colour).html("L" + lRotate[x][y].text);

            $("#F" + x + "" + y).addClass(cube.faces.f[x][y]).html("F" + text);
            let fRotate = cube.rotate(cube.faces.f, "rotate180", true);
            $("#F" + x + "" + y + "180").addClass("faded").addClass(fRotate[x][y].colour).html("F" + fRotate[x][y].text);

            $("#R" + x + "" + y).addClass(cube.faces.r[x][y]).html("R" + text);
            let rRotate = cube.rotate(cube.faces.r, "rotate180", true);
            $("#R" + x + "" + y + "180").addClass("faded").addClass(rRotate[x][y].colour).html("R" + rRotate[x][y].text);

            $("#B" + x + "" + y).addClass(cube.faces.b[x][y]).html("B" + text);
            let bRotate = cube.rotate(cube.faces.b, "rotate180", true);
            $("#B" + x + "" + y + "180").addClass("faded").addClass(bRotate[x][y].colour).html("B" + bRotate[x][y].text);

            $("#D" + x + "" + y).addClass(cube.faces.d[x][y]).html("D" + text);
            let dRotate = cube.rotate(cube.faces.d, "rotate90", true);
            $("#D" + x + "" + y + "90").addClass("faded").addClass(dRotate[x][y].colour).html("D" + dRotate[x][y].text);
            dRotate = cube.rotate(cube.faces.d, "rotate270", true);
            $("#D" + x + "" + y + "270").addClass("faded").addClass(dRotate[x][y].colour).html("D" + dRotate[x][y].text);
            dRotate = cube.rotate(cube.faces.d, "rotate180", true);
            $("#D" + x + "" + y + "180").addClass("faded").addClass(dRotate[x][y].colour).html("D" + dRotate[x][y].text);
        }
    }

    parent.show();
};

cube.rotate = function rotate(face, rotationMatrix, displayOnly) {
    let hold = JSON.parse(JSON.stringify(face));

    for (let x = 0; x <= 1; x++) {
        for (let y = 0; y <= 1; y++) {
            let oldCoords = { "x": x, "y": y }

            let newCoords = cube.multiply(oldCoords, rotationMatrix);

            let a = x + 1;
            let b = (y - 1) * -1;
            let c = (2 * b) + a;

            let value = (displayOnly) ? { "colour": face[oldCoords.x][oldCoords.y], "text": "(" + x + "," + y + ")[" + c + "]" } : face[oldCoords.x][oldCoords.y];

            hold[newCoords.x][newCoords.y] = value;
        }
    }

    return JSON.parse(JSON.stringify(hold));
};

cube.multiply = function multiply(oldCoords, rotationMatrix) {
    let newCoords = {};

    let rm = cube.matrix[rotationMatrix];

    newCoords.x = (rm["x"][1] * oldCoords["x"]) + (rm["x"][2] * oldCoords["y"]);
    newCoords.y = (rm["y"][1] * oldCoords["x"]) + (rm["y"][2] * oldCoords["y"]);

    newCoords.x += rm.addX;
    newCoords.y += rm.addY;

    return newCoords;
};
