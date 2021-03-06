/**
 * Explosion Object definition
 */
function Explosion (opts) {
  ObjectBase.call(this);

  this.color = 'white';
  this.xVelocity = 0;
  this.yVelocity = 25;

  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Explosion.prototype = new ObjectBase();
Explosion.prototype.constructor = Explosion;

/**
 * Draws explosion to the screen
 */
Explosion.prototype.draw = function(canvas) {
  var _this = this,
    x = _this.x,
    y = _this.y,
    width = _this.width,
    height = _this.height;

  canvas.fillStyle = _this.color;
  canvas.fillRect(x, y, width, height);
  canvas.fillRect(x+20, y, width, height);
  canvas.fillRect(x+40, y, width, height);
  canvas.fillRect(x+60, y, width, height);
};

/**
 * Updates explosion position on game screen
 */
Explosion.prototype.update = function () {
  var _this = this;
  _this.x += _this.xVelocity;
  _this.y += _this.yVelocity;
};
