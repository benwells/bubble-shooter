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
//inheritance from ObjectBase Class
// Player.prototype = Object.create(ObjectBase.prototype);
Player.prototype = new ObjectBase();
Player.prototype.constructor = Player;

//Class Methods
Player.prototype.draw = function (canvas) {
  this.canvas.drawImage(document.getElementById('shipImg'),this.x, this.y, this.width, this.height);
};

Player.prototype.midpoint = function () {
  return {
    x: this.x + this.width / 2,
    y: this.y + this.height / 2
  };
};

Player.prototype.shoot = function () {
  var _this = this;
  var bulletPosition = _this.midpoint();

  _this.bullets.push(new Bullet({
    xVelocity: 20,
    x: bulletPosition.x,
    y: bulletPosition.y,
    context: _this.canvas
  }));
};
