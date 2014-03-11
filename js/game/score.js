function Score() {
  this.color = 'green';
  this.fontSize = 22;
  this.fontStyle = 'sans-serif';
  this.label = "Score: ";
  this.score = 0;
  this.x = 780 - 10;
  this.y = 420;
}

Score.prototype.draw = function (context2) {
  context2.font = this.fontSize + "px " + this.fontStyle;
  context2.fillStyle = this.color;
  context2.textBaseline = "bottom";
  context2.textAlign="right";
  context2.fillText(this.label + this.score, this.x, this.y);
};
