function Enemy(info) {
  info = info || {};
  info.points = 10;
  info.active = true;
  info.age = Math.floor(Math.random() * 128);

  info.color = "#A2B";
  info.y = info.cHeight / 4 + Math.random() * info.cHeight / 2;
  info.xVelocity = 3;
  info.yVelocity = 0;
  info.radius = 20;


  info.inBounds = function (w, h) {
    return info.x >= 0 && info.x <= w && info.y >= 0 && info.y <= h;
  };

  info.draw = function (canvas) {
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

  info.update = function (w, h) {
    info.x -= info.xVelocity;
    info.y += info.yVelocity;

    //controls the "back and forth" motion of enemy
    info.yVelocity = 3 * Math.sin(info.age * Math.PI / 64);

    info.age++;

    info.active = info.active && info.inBounds(w, h);
  };

  info.explode = function (canvas) {
    // info.color = "white";
    info.active = false;

    //return an explosion object
    return {
      width: this.width / 2,
      height: this.height / 2,
      x: this.x,
      y: this.y
    };
  }

  return info;
}; //end Enemy function