//Initialize PIXI by creating a renderer and stage
var app = new PIXI.Application({width: 640, height: 480});

//Alias for loader resources
var rsc = PIXI.loader.resources;

//Adds renderer to the website
document.body.appendChild(app.view);

//Load all the images needed for the game
PIXI.loader
  .add('bg1', "media/ldr_bg1.png")
  .add('lion1', "media/ldr_lion1.png")
  .load(setup);

//Declare sprite variables
var sprites = {};

//This function runs when all the images have been loaded
function setup() {
  //Create background sprite
  sprites.bg = new PIXI.extras.TilingSprite(
    rsc["bg1"].texture,
    640, 480);
  sprites.bg.tilePosition.x = 0;
  sprites.bg.tilePosition.y = 0;

  //This contains all the lion dancer sprites
  sprites.lion = new PIXI.Sprite(rsc["lion1"].texture);
  sprites.lion.position.x = 20
  sprites.lion.position.y = 50

  //Add the sprite to the stage
  app.addChild(sprites.bg, sprites.lion);

  //Makes a render loop - call update() 60 times a second
  requestAnimationFrame(update);
}
 function update() {
  //Move the background
   sprites.bg.tilePosition.x -= 0.64;

   //Render game for this frame
   app.render(stage);
   requestAnimationFrame(update);
 }
