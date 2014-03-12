function Enemy(opts) {
  // info = info || {};
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

//inheritance from ObjectBase Class
// Enemy.prototype = Object.create(ObjectBase.prototype);
Enemy.prototype = new ObjectBase();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.inBounds = function (w, h) {
  return this.x >= 0 && this.x <= w && this.y >= 0 && this.y <= h;
};

Enemy.prototype.draw = function (canvas) {
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

Enemy.prototype.update = function (w, h) {
  this.x -= this.xVelocity;
  this.y += this.yVelocity;

  //controls the "back and forth" motion of enemy
  this.yVelocity = 3 * Math.sin(this.age * Math.PI / 64);

  this.age++;

  this.active = this.active && this.inBounds(w, h);
};

Enemy.prototype.explode = function (canvas) {
  // info.color = "white";
  this.active = false;

  //return an explosion object
  return {
    width: this.width / 2,
    height: this.height / 2,
    x: this.x,
    y: this.y
  };
};
