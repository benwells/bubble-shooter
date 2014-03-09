function player(canvasContext) {
  this.canvas = canvasContext;
  this.color = "#00A";
  this.x = 40;
  this.y = 100;
  this.width = 40;
  this.height = 32;
  this.bullets = [];
  this.midpoint = function () {
    return {
      x: this.x + this.width / 2,
      y: this.y + this.height / 2
    };
  };
  this.draw = function (canvas) {
    this.canvas.drawImage(document.getElementById('shipImg'),this.x, this.y, this.width, this.height);
  };
  this.shoot = function () {
    var bulletPosition = this.midpoint();
    this.bullets.push(Bullet({
      speed: 20,
      x: bulletPosition.x,
      y: bulletPosition.y
    }));
  };
}
