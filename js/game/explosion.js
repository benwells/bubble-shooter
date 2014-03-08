function explosion (info) {
  info = info || {};
  info.color = 'white';
  info.xVelocity = 0;
  info.yVelocity = 25;
  info.draw = function(canvas) {
    canvas.fillStyle = info.color;
    canvas.fillRect(info.x, info.y, info.width, info.height);
    canvas.fillRect(info.x+20, info.y, info.width, info.height);
    canvas.fillRect(info.x+40, info.y, info.width, info.height);
    canvas.fillRect(info.x+60, info.y, info.width, info.height);
  };
  info.update = function () {
    info.x += info.xVelocity;
    info.y += info.yVelocity;
  };
  return info;
}