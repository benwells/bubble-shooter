function message(text) {
  this.text = text;
  this.color = 'green';
  this.fontSize = 1;
  this.fontMax = 56;
  this.fontStyle = 'sans-serif';
  this.x = 780/2;
  this.y = 420/4;
  this.draw = function (context2) {
    context2.font = this.fontSize + "px " + this.fontStyle;
    context2.fillStyle = this.color;
    context2.textBaseline = "top";
    context2.textAlign="center";
    context2.fillText(this.text, this.x, this.y);
  };
  this.update = function () {
    if (this.fontSize <= this.fontMax) {
      this.fontSize += 4;
    }
    else {
      this.y += 3;
    }
  };
}
