window.oll = {};

oll.go = function go() {
    oll.draw("Sune", ["back1", "top2", "right1", "top4", "top5", "top6", "top7", "top8", "front3"], ["R", "U", "R'", "U", "R", "U2", "R'"]);
    oll.draw("Anti-Sune", ["left1","top2", "top3", "top4", "top5", "top6", "top8", "right3", "front1"], ["R", "U2", "R'", "U'", "R", "U'", "R'"]);
    oll.draw("OCLL1", ["back1","back3", "top2", "top4", "top5", "top6", "top8", "front1", "front3"], ["F", "(R", "U", "R'", "U')3", "F'"], ["R", "U2", "R'", "U'", "R", "U", "R'", "U'", "R", "U'", "R'"]);
    oll.draw("OCLL2", ["back3", "left1", "top2", "top4", "top5", "top6", "left3", "top8", "front3"], ["R", "U2", "R2", "U'", "R2", "U'", "R2", "U2", "R"]);
    oll.draw("OCLL5", ["left1", "top2", "top3", "top4", "top5", "top6", "top7", "top8", "front3"], ["F'", "L", "F", "R'", "F'", "L'", "F", "R"], ["F'", "(r", "U", "R'", "U')", "r'", "F", "R"]);
    oll.draw("OCLL4", ["back1", "top2", "top3", "top4", "top5", "top6", "top8", "top9", "front1"], ["F", "R", "F'", "L", "F", "R'", "F'", "L'"], ["(r", "U", "R'", "U')", "(r'", "F", "R", "F')"]);
    oll.draw("OCLL3", ["top1", "top2", "top3", "top4", "top5", "top6", "top8", "front1", "front3"], ["R2", "D", "R'", "U2", "R", "D'", "R'", "U2", "R'"]);
};

oll.getTemplate = function getTemplate() {
    if (!oll.template)
        oll.template = $(".templateArea > .template");

    return oll.template;
};

oll.draw = function draw(pattern, color, solve, altsolve) {
    oll.getTemplate().clone().removeClass("template").addClass("card").addClass(pattern).appendTo("body");

    let cube = $("." + pattern);

    cube.find(".title .text").html(pattern);

    let solvetext = solve.join(" ").toUpperCase();
    solvetext += ((altsolve != undefined) ? ("<br><br>" + altsolve.join(" ")) : "");

    cube.find(".solve .text").html(solvetext);

    for (let c in color) {
        cube.find("." + color[c]).css("background-color", "yellow");
    }
};
