function Explosion (opts) {
  ObjectBase.call(this);

  this.color = 'white';
  this.xVelocity = 0;
  this.yVelocity = 25;

  this.setOpts(opts);
}

//inheritance from ObjectBase Class
// Enemy.prototype = Object.create(ObjectBase.prototype);
Explosion.prototype = new ObjectBase();
Explosion.prototype.constructor = Explosion;

Explosion.prototype.draw = function(canvas) {
  canvas.fillStyle = this.color;
  canvas.fillRect(this.x, this.y, this.width, this.height);
  canvas.fillRect(this.x+20, this.y, this.width, this.height);
  canvas.fillRect(this.x+40, this.y, this.width, this.height);
  canvas.fillRect(this.x+60, this.y, this.width, this.height);
};

Explosion.prototype.update = function () {
  this.x += this.xVelocity;
  this.y += this.yVelocity;
};
