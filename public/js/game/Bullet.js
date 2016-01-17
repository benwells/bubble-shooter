/**
 * Bullet Object with default props
 * @param {[object]} opts [key value pair object of properties]
 */
function Bullet(opts) {
  ObjectBase.call(this);
  this.active = true;
  this.yVelocity = 0;
  this.xVelocity = 0;
  this.width = 3;
  this.height = 3;
  this.color = "white";
  this.context = {};
  this.x = 0;
  this.y = 0;

  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Bullet.prototype = new ObjectBase();
Bullet.prototype.constructor = Bullet;
var BulletProto = Bullet.prototype;

/**
 * inBounds accepts the width and height of the game screens and
 * determines if the bullet is still inbound or not based on the
 * bullet x and y values
 *
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game scree height]
 * @return {[boolean]}   [true if bullet is in bounds, else false if not]
 */
BulletProto.inBounds = function (w, h) {
  var _this = this,
      x     = _this.x,
      y     = _this.y;
  return x >= 0 && x <= w && y >= 0 && y <= h;
};

/**
 * draw handles drawing the bullet to the canvas element
 * @return {[none]}
 */
BulletProto.draw = function () {
  var context = this.context;
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
};

/**
 * update increments the bullet position based on the velocity props and also
 * used inBounds() to test if the bullet is still active or not.
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} w [game screen height]
 */
BulletProto.update = function (w, h) {
  this.x += this.xVelocity;
  this.y += this.yVelocity;
  this.active = this.active && this.inBounds(w, h);
};
