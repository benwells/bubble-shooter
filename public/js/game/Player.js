/**
 * Player object definition
 * @param {[object]} opts [properties to override defaults]
 */
function Player(opts) {
  ObjectBase.call(this);

  this.canvas = {};
  this.color = "#00A";
  this.y = 100;
  this.x = 40;
  this.width = 40;
  this.height = 32;
  this.bullets = [];

  this.setOpts(opts);
}


/**
 * inheritance from ObjectBase Class
 */
Player.prototype = new ObjectBase();
Player.prototype.constructor = Player;
var PlayerProto = Player.prototype;

/**
 * draws the player to the canvas
 */
PlayerProto.draw = function (canvas) {
  this.canvas.drawImage(document.getElementById('shipImg'),this.x, this.y, this.width, this.height);
};

/**
 * Determines midpoint of the player, for collision detection.
 * @return {[object]} [object containing x and y coordinates of midpoint]
 */
PlayerProto.midpoint = function () {
  return {
    x: this.x + this.width / 2,
    y: this.y + this.height / 2
  };
};

/**
 * Creates bullets when the user shoots (spacebar)
 */
PlayerProto.shoot = function () {
  var _this = this;
  var bulletPosition = _this.midpoint();

  _this.bullets.push(new Bullet({
    xVelocity: 20,
    x: bulletPosition.x,
    y: bulletPosition.y,
    context: _this.canvas
  }));
};
