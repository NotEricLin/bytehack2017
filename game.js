
//Initialize PIXI by creating a renderer and stage
var app = new PIXI.Application({width: 640, height: 480});

//Alias for loader resources (basically a shortcut)
var loader = app.loader;

//Adds renderer to the website
document.body.appendChild(app.view);

//Load all the images needed for the game
loader
  .add('bg1', "media/ldr_bg1.png")
  .add('lion1', "media/ldr_lion1.png")
  .load(setup);


//Declare sprite variables
const sprites = {};

//Variable for key listeners
const keys = {};


//This function runs when all the images have been loaded
function setup() {
  //Create background sprite
  sprites.bg = new PIXI.extras.TilingSprite(
    loader.resources["bg1"].texture,
    640, 480);
  sprites.bg.vx = 0.64;

  //This contains all the lion dancer sprites
  sprites.lion = new PIXI.Sprite(loader.resources["lion1"].texture);
  sprites.lion.position.x = 20
  sprites.lion.position.y = 290

  //Add the sprite to the stage
  app.stage.addChild(sprites.bg)
    .addChild(sprites.lion);

  //Create key listeners
  keys.up = keyboard(87);
  keys.left = keyboard(65);
  keys.down = keyboard(83);
  keys.right = keyboard(68);
  keys.space = keyboard(32);

  //Starts running the game!
  app.ticker.add(update);
  app.start();
}



//Current game state: play, menu, dead, etc.
var gameState = menu;

//This is where all the animation is handled centrally!
function update() {
  //Call the function for the current game state
  gameState();

  //Render game for this frame
  app.render();
}


var count = 0; //variable for loop within menu function for text
//Text that will gently flash on screen
var text = new PIXI.Text("Press spacebar to start",
{align : 'center', fill : '#FFFFFF', fontSize : 18, fontWeight: 'bold'});
text.anchor = {x: 0.5, y: 1};
text.position = {x: 320, y: 440};

//Runs when user is on menu screen
function menu(){
  //Move the background
  sprites.bg.tilePosition.x -= sprites.bg.vx;

  app.stage.addChild(text);
  //Makes the text flash over time
  if (count < 120) { count++; }
  else { count = 0; }
  if (count < 61) { text.alpha = count / 60.0; }
  else { text.alpha = (60 - (count - 60)) / 60.0; }

  if (keys.space.isDown == true) {
    app.ticker.addOnce(function(){
      text.visible = false;
      //Make lion stand inside of the benches
      sprites.lion.y -= 100;
    });
    gameState = play;
  }
}

//Variable for frame that is currently jumping at
var currentJumpFrame;
var isJumping = false;

//Jump parabola variables
var jump = {};
jump.a = 480/68;
jump.b = 195060/17;
jump.c = 190;
jump.frame = -1;

//Runs when user is playing the game
function play(){
  //This code makes the background speed gently speed up
  if (sprites.bg.vx < 2) {
    sprites.bg.vx = sprites.bg.vx*1.1;
  } else if (sprites.bg.vx > 2) {
    sprites.bg.vx = 2;
  }

  //Lion speed
  sprites.lion.vx = 5;

  //Move sprite with keyboard
  if (keys.right.isDown && sprites.lion.x < 540) {
    sprites.lion.position.x += sprites.lion.vx;
  }
  if (keys.left.isDown && sprites.lion.x > 0) {
    sprites.lion.position.x -= sprites.lion.vx;
  }
  if (keys.up.isDown) {
    //TODO make it jump smoothly
    if (jump.frame = -1 && sprites.lion.y = 190) jump.frame = 0;
  }
  if (keys.down.isDown) {
    jump.frame = -1;
  }

  //Set y according to currentJumpFrame
  if(jump.frame != -1 && jump.frame != 60){
    lion.position.y = (Math.pow(jump.frame, 2)*jump.a + jump.frame*jump.b + jump.c);
    jump.frame++;
  }

  //Move the background
  sprites.bg.tilePosition.x -= sprites.bg.vx;
}


//Function to handle keyboard events
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}
