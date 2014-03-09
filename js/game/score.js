function score() {
  this.label = "Score: ";
  this.score = 0;
  this.color = 'green';
  this.fontSize = 22;
  this.fontStyle = 'sans-serif';
  this.x = 780 - 10;
  this.y = 420;

  this.draw = function (context2) {
    context2.font = this.fontSize + "px " + this.fontStyle;
    context2.fillStyle = this.color;
    context2.textBaseline = "bottom";
    context2.textAlign="right";
    context2.fillText(this.label + this.score, this.x, this.y);
  };
  this.update = function () {
    // if (this.fontSize <= this.fontMax) {
    //   this.fontSize += 4;
    // }
    // else {
    //   this.y += 3;
    // }
  };
}
