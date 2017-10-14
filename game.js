/**
  Ok so I know that I ask a lot out of you guys when I talk about making this
  game, but not many of you have nearly as much experience as I have.
  I've tried to make everything more convenient by commenting before as many
  blocks of code as I can.

  Comments begin with a double slash (i.e. //) and have plain text in them.
  Whatever text you put in there doesn't get run by the computer, even if its
  actual code, so it's pretty convenient. In fact, this whole block is a huge
  comment oAo

  You guys don't have to be experts to contribute, I don't want to be the
  busybody running the whole project by myself without leaving room for
  teamwork, so please come to me if you need any kind of help whatsoever.


  Here is a list of resources so everybody can all get in together on developing
  this game :)

    - Alex


  Learn Git in 15 minutes!!!
    https://try.github.io/levels/1/challenges/1

  Some basic Git + github guide
    http://product.hubspot.com/blog/git-and-github-tutorial-for-beginners

  A couple more GitHub tutorials (quick reads, I promise!)
      https://guides.github.com/
      I REALLY RECOMMEND STARTING WITH THIS ONE:
      https://guides.github.com/introduction/getting-your-project-on-github/

  Learn Javascript:
    https://www.javascript.com/

  PIXI.js tutorial (scroll down the page):
    https://github.com/kittykatattack/learningPixi

  PIXI.js documentation (you can look for objects referenced from PIXI to
  understand how they work and what they do through search, and find new things
  that may make your life easier when doing something in particular)
    http://pixijs.download/release/docs/
    For example, you can understand how Sprites work by looking at the sprite
    article at: http://pixijs.download/release/docs/PIXI.Sprite.html

  Collection of examples (with code!) in PIXI:
    https://pixijs.github.io/examples/
*/

PIXI.utils.skipHello();

//Initialize PIXI by creating a renderer and stage
var app = new PIXI.Application({width: 640, height: 480});

//Alias for loader resources
var loader = app.loader;

//Adds renderer to the website
document.body.appendChild(app.view);

//Load all the images needed for the game
loader
  .add('bg1', "media/ldr_bg1.png")
  .add('fg1', "media/ldr_fg1.png")
  .add('clouds', "media/clouds.png")
  .add('lion1', "media/ldr_lion1.png")
  .load(setup);


//Declare sprite variables
const sprites = {};

//Variable for key listeners
const keys = {};

window.addEventListener("keydown", event => {
  keys[event.keyCode] = true;
});

window.addEventListener("keyup", event => {
  keys[event.keyCode] = false;
});

//This function runs when all the images have been loaded
function setup() {
  //Create background sprite
  sprites.bg = new PIXI.extras.TilingSprite(
    loader.resources["bg1"].texture,
    640, 480);
  sprites.bg.vx = 0;
  sprites.fg = new PIXI.extras.TilingSprite(
    loader.resources["fg1"].texture,
    640, 140);
  sprites.fg.position.y = 340;
  sprites.clouds = new PIXI.extras.TilingSprite(
    loader.resources["clouds"].texture,
    640, 45);

  //This contains all the lion dancer sprites
  sprites.lion = new PIXI.Sprite(loader.resources["lion1"].texture);
  sprites.lion.position.x = 20
  sprites.lion.position.y = 290

  //Add the sprite to the stage
  app.stage.addChild(sprites.bg)
  app.stage.addChild(sprites.clouds)
  app.stage.addChild(sprites.fg)
  app.stage.addChild(sprites.lion);

  //Starts running the game!
  app.ticker.add(update);
  app.start();
}



//Current game state: play, menu, dead, etc.
var gameState = play;

//This is where all the animation is handled centrally!
function update() {
  //Call the function for the current game state
  gameState();

  //Render game for this frame
  app.render();
}

//Runs when user is on menu screen
function menu(){
  //TODO implement code to show a play button and a logo, maybe?
}

//Runs when user is playing the game
function play(){
  const maxVelocity = 3.28;
  const acc = 0.2;
  const spriteDirection = sprites.bg.vx / Math.abs(sprites.bg.vx || 1);

  if (keys[39]) {
    // accelerate right
    sprites.bg.vx = Math.min(sprites.bg.vx + acc, maxVelocity);
  } else if (keys[37]) {
    // accelerate left
    sprites.bg.vx = Math.max(sprites.bg.vx - acc, -maxVelocity);
  } else {
    // decelerate
    sprites.bg.vx = spriteDirection *
      Math.max(Math.abs(sprites.bg.vx) - acc, 0);
  }

  // Move the background
  sprites.bg.tilePosition.x -= sprites.bg.vx;

  // Move the foreground
  sprites.fg.tilePosition.x -= sprites.bg.vx * 2;
  // Move the clouds
  sprites.clouds.tilePosition.x -= sprites.bg.vx / 6;
}
