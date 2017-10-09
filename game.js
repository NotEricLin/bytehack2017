//Initialize PIXI by creating a renderer and stage
var renderer = PIXI.autoDetectRenderer(640, 480);
var stage = new PIXI.Container();

//Adds renderer to the website
document.body.appendChild(renderer.view);


//Load all the images needed for the game
PIXI.loader
  .add("media/ldr_bg1.png")
  .load(setup);

//This function runs when all the images have been loaded
function setup() {
  //Create background sprite
  var bg = new PIXI.Sprite(
    PIXI.loader.resources["media/ldr_bg1.png"].texture
  );

  //Add the sprite to the stage
  stage.addChild(bg);
  bg.visible = true;

  //Render the game!
  renderer.render(stage);
}
