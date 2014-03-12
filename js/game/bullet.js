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
//inheritance from ObjectBase Class
// Bullet.prototype = Object.create(ObjectBase.prototype);
Bullet.prototype = new ObjectBase();
Bullet.prototype.constructor = Bullet;
var BulletProto = Bullet.prototype;

//class methods
BulletProto.inBounds = function (w, h) {
  var _this = this,
      x     = _this.x,
      y     = _this.y;
  return x >= 0 && x <= w && y >= 0 && y <= h;
};

BulletProto.draw = function () {
  var context = this.context;
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
};

BulletProto.update = function (w, h) {
  this.x += this.xVelocity;
  this.y += this.yVelocity;
  this.active = this.active && this.inBounds(w, h);
};
