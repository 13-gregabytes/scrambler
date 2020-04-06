window.oll = {};

oll.go = function go() {
    let array = ["R", "U", "R'", "U", "R", "U2", "R'"];
    let color = ["back1", "top2", "right1", "top4", "top5", "top6", "top7", "top8", "front3"];

    let pattern = "sune";

    oll.getTemplate().clone().removeClass("template").addClass(pattern).appendTo("body");

    let cube = $("." + pattern);

    cube.find(".solve .text").html(array.join(" "));

    for (let c in color) {
        cube.find("." + color[c]).css("background-color", "yellow");
    }
};

oll.getTemplate = function getTemplate() {
    if (!oll.template)
        oll.template = $(".templateArea > .template");

    return oll.template;
};