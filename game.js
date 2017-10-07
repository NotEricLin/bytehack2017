var renderer = PIXI.autoDetectRenderer(256, 256);

document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
renderer.render(stage);