function Enemy(info) {
  info = info || {};
  info.points = 10;
  info.active = true;
  info.age = Math.floor(Math.random() * 128);

  info.color = "#A2B";
  info.y = info.cHeight / 4 + Math.random() * info.cHeight / 2;
  info.xVelocity = 3;
  info.yVelocity = 0;
  info.width = 20;
  info.height = 20;

  info.inBounds = function(w, h) {
    return info.x >= 0 && info.x <= w && info.y >= 0 && info.y <= h;
  };

  info.draw = function(canvas) {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };

  info.update = function(w, h) {
    info.x -= info.xVelocity;
    info.y += info.yVelocity;

    //controls the "back and forth" motion of enemy
    info.yVelocity = 3 * Math.sin(info.age * Math.PI / 64); 

    info.age++;

    info.active = info.active && info.inBounds(w, h);
  };

  info.explode = function(){
    info.color = "#000"
    // info.y += 200;
    info.active = false;
  }

  return info;
}; //end Enemy function