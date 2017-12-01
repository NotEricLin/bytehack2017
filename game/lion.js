var lion = {};

lion.setup = function(){
  //This contains all the lion dancer sprites
  lion.sprite = new PIXI.Sprite(loader.resources["lion1"].texture);
  lion.sprite.position.x = 20
  lion.sprite.position.y = 290
}

//Jump parabola variables
var jump = {};
jump.a = 235/522;
jump.b = -8615/522;
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
    //TODO make it jump smoothly
    if (jump.frame == -1) jump.frame = 0;
    if (jump.frame == 30) jump.frame = 31;
  }
  if (keys.down.isDown) {
    if(jump.frame == 30) jump.frame = -10;
  }

  //Set y according to currentJumpFrame
  if (jump.frame > -1 && jump.frame != 30){
    lion.sprite.position.y = (Math.pow(jump.frame, 2)*jump.a + jump.frame*jump.b + jump.c);
    jump.frame++;
  }
  if (jump.frame < -1 && jump.frame != -1) {
    lion.sprite.position.y = 215 + 25/2*jump.frame;
    jump.frame++
  }
  if(jump.frame > 30){
    var frame = jump.frame - 31;
    lion.sprite.position.y = (Math.pow(frame, 2)*(3/32) + frame*-15/2 + 90);
    if(lion.sprite.position.y < 90) {jump.frame = 30; lion.sprite.y = 90;}
  }
}
