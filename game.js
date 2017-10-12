//Initialize PIXI by creating a renderer and stage
var app = new PIXI.Application({width: 640, height: 480});

//Alias for loader resources
var rsc = app.loader.resources;

//Adds renderer to the website
document.body.appendChild(app.view);

//Load all the images needed for the game
app.loader
  .add('bg1', "media/ldr_bg1.png")
  .add('lion1', "media/ldr_lion1.png")
  .load(setup);

//Declare sprite variables
var bg, lion;

//This function runs when all the images have been loaded
function setup() {
  //Create background sprite
  bg = new PIXI.extras.TilingSprite(
    rsc["bg1"].texture,
    640, 480);
  bg.tilePosition.x = 0;
  bg.tilePosition.y = 0;

  //This contains all the lion dancer sprites
  lion = new PIXI.Sprite(rsc["lion1"].texture);
  lion.position.x = 20
  lion.position.y = 50

  //Add the sprite to the stage
  app.stage.addChild(bg)
    .addChild(lion);

  //Makes a render loop - call update() 60 times a second
  requestAnimationFrame(update);
}
 function update() {
  //Move the background
   bg.tilePosition.x -= 0.64;

   //Render game for this frame
   app.renderer.render();
   requestAnimationFrame(update);
 }
