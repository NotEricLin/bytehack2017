var renderer = PIXI.autoDetectRenderer(640, 480);

document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
renderer.render(stage);
