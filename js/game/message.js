function Message(text) {
  this.active = true;
  this.text = text;
  this.color = 'green';
  this.fontSize = 1;
  this.fontMax = 56;
  this.fontStyle = 'sans-serif';
  this.x = 780/2;
  this.y = 420/4;
}

Message.prototype.draw = function (context2) {
  context2.font = this.fontSize + "px " + this.fontStyle;
  context2.fillStyle = this.color;
  context2.textBaseline = "top";
  context2.textAlign="center";
  context2.fillText(this.text, this.x, this.y);
};

Message.prototype.update = function (w, h) {
  if (this.inBounds(w, h)) {
    if (this.fontSize <= this.fontMax) {
      this.fontSize += 4;
    }
    else {
      this.y += 3;
    }
  }
  else {
    this.active = false;
  }
};

Message.prototype.inBounds = function (w, h) {
  return this.y <= h;
  // return this.x >= 0 && this.x <= w && this.y >= 0 && this.y <= h;
};
