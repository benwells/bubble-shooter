/**
 * Enemy Object definition
 * @param {[object]} opts [properties to override defaults]
 */
function Enemy(opts) {
  ObjectBase.call(this);

  this.points = 10;
  this.active = true;
  this.age = Math.floor(Math.random() * 128);
  this.color = "#A2B";
  this.y = 0;
  this.xVelocity = 3;
  this.yVelocity = 0;
  this.radius = 20;
  this.context = {};

  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Enemy.prototype = new ObjectBase();
Enemy.prototype.constructor = Enemy;
var EnemyProto = Enemy.prototype;

/**
 * Determines if enemy is inbouds or not based on its position and the
 * game screen dimensions
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game screen height]
 * @return {[boolean]}   [true if object is inbounds]
 */
EnemyProto.inBounds = function (w, h) {
  return this.x >= 0 && this.x <= w && this.y >= 0 && this.y <= h;
};

/**
 * handles drawing the bubble shape to the canvas
 * @param  {[element]} canvas [a reference to the canvas element]
 */
EnemyProto.draw = function (canvas) {
  canvas.strokeStyle = this.color;
  canvas.lineWidth = 3;
  // canvas.fillRect(this.x, this.y, this.width, this.height);
  canvas.beginPath();
  canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true); // Outer circle
  canvas.stroke();
  canvas.beginPath();
  canvas.arc(this.x, this.y, this.radius - 5, Math.PI, 1.5 * Math.PI, false); // inner arc
  canvas.stroke();
};

/**
 * handles the movement of the enemy based on velocity props
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game screen height]
 */
EnemyProto.update = function (w, h) {
  this.x -= this.xVelocity;
  this.y += this.yVelocity;

  //controls the "back and forth" motion of enemy
  this.yVelocity = 3 * Math.sin(this.age * Math.PI / 64);
  this.age++;
  this.active = this.active && this.inBounds(w, h);
};

/**
 * Enemy explosion awesomeness
 * @param  {[element]} canvas [reference to canvas game screen]
 * @return {[object]} [new Explosion instance]
 */
EnemyProto.explode = function (canvas) {
  //when an enemy explodes, it is no longer active.
  this.active = false;

  //return an explosion object
  return new Explosion({
    width: this.width / 2,
    height: this.height / 2,
    x: this.x,
    y: this.y
  });
};
