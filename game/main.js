//Initialize PIXI by creating a renderer and stage
var app = new PIXI.Application({width: 640, height: 480});

//Alias for loader resources (basically a shortcut)
var loader = app.loader;

//Adds renderer to the website
document.body.appendChild(app.view);

//Load all the images needed for the game
loader
  .add('bg1', "game/media/ldr_bg1.png")
  .add('lion1', "game/media/ldr_lion1.png")
  .load(setup);

//Variable for key listeners
const keys = {};


//This function runs when all the images have been loaded
function setup() {
  //Create background sprite
  bg = new PIXI.extras.TilingSprite(
    loader.resources["bg1"].texture,
    640, 480);
  bg.vx = 0.64;

  //Sprites for objects
  lion.setup();

  //Add the sprite to the stage
  app.stage.addChild(bg)
    .addChild(lion.sprite);

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


count = 0; //variable for loop within menu function for text
//Text that will gently flash on screen
var text = new PIXI.Text("Press spacebar to start",
{align : 'center', fill : '#FFFFFF', fontSize : 18, fontWeight: 'bold'});
text.anchor = {x: 0.5, y: 1};
text.position = {x: 320, y: 440};

//Runs when user is on menu screen
function menu(){
  //Move the background
  bg.tilePosition.x -= bg.vx;

  app.stage.addChild(text);
  //Makes the text flash over time
  if (count < 120) { count++; }
  else { count = 0; }
  if (count < 61) { text.alpha = count / 60.0; }
  else { text.alpha = (60 - (count - 60)) / 60.0; }

  if (keys.space.isDown == true) {
    text.visible = false;
    //Make lion stand inside of the benches
    lion.sprite.y -= 100;
    gameState = play;
  }
}


//Runs when user is playing the game
function play(){
  //This code makes the background speed gently speed up
  if (bg.vx < 2) {
    bg.vx = bg.vx*1.1;
  } else if (bg.vx > 2) {
    bg.vx = 2;
  }

  //Do play functions of the objects
  lion.play();

  //Move the background
  bg.tilePosition.x -= bg.vx;
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
