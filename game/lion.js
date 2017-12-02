var lion = {};

lion.setup = function(){
  //This contains all the lion dancer sprites
  lion.sprite = new PIXI.Sprite(loader.resources["lion1"].texture);
  lion.sprite.position.x = 20
  lion.sprite.position.y = 290
}

//Jump parabola variables
var jump = {};
jump.a = 1/3;
jump.b = -40/3;
jump.c = 190;
jump.frame = -1;

lion.play = function(){
  //Lion speed
  lion.sprite.vx = 5;

  //Move sprite with keyboard
  if (keys.right.isDown && lion.sprite.x < 540) {
    lion.sprite.position.x += lion.sprite.vx;
  }
  if (keys.left.isDown && lion.sprite.x > 0) {
    lion.sprite.position.x -= lion.sprite.vx;
  }
  if (keys.up.isDown) {
    if (jump.frame == -1) jump.frame = 0;
    if (jump.frame == 30) jump.frame = 71;
  }
  if (keys.down.isDown) {
    if(jump.frame == 30) jump.frame = -10;
  }

  //Set y according to currentJumpFrame
  if (jump.frame > -1 && jump.frame < 30 && jump.frame != 30){
    jump.frame++;
    lion.sprite.position.y = (Math.pow(jump.frame, 2)*jump.a + jump.frame*jump.b + 190);
  }
  if (jump.frame < -1 && jump.frame != -1) {
    lion.sprite.position.y = 215 + 25/2*jump.frame;
    jump.frame++;
  }
  if (jump.frame > 30 && jump.frame < 72 && jump.frame != 30){
    lion.sprite.position.y = (Math.pow(jump.frame, 2)*(1/3) + jump.frame*-34 + (2471/3));
    jump.frame--;
  }
}
