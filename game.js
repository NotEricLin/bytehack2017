//Initialize PIXI by creating a renderer and stage
var renderer = PIXI.autoDetectRenderer(640, 480);
var stage = new PIXI.Container();

//Adds renderer to the website
document.body.appendChild(renderer.view);


//Load all the images needed for the game
PIXI.loader
  .add("media/ldr_bg1.png")
  .load(setup);

//Declare sprite variables
var bg;

//This function runs when all the images have been loaded
function setup() {
  //Create background sprite
  bg = new PIXI.extras.TilingSprite(
    PIXI.loader.resources["media/ldr_bg1.png"].texture,
    640, 480);
  bg.tilePosition.x = 0;
  bg.tilePosition.y = 0;

  //Add the sprite to the stage
  stage.addChild(bg);

  //Makes a render loop - call update() 60 times a second
  requestAnimationFrame(update);
}
 function update() {
   bg.tilePosition.x -= 0.64;
   renderer.render(stage);
   requestAnimationFrame(update);
 }
