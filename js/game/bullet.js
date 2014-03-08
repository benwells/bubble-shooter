function Bullet(info) {
  info.active = true;
  info.yVelocity = 0;
  info.xVelocity = info.speed;
  info.width = 3;
  info.height = 3;
  info.color = "white";

  info.inBounds = function (w, h) {
    return info.x >= 0 && info.x <= w && info.y >= 0 && info.y <= h;
  };

  info.draw = function (context) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  };

  info.update = function (w, h) {
    info.x += info.xVelocity;
    info.y += info.yVelocity;
    info.active = info.active && info.inBounds(w, h);
  };

  return info;
}