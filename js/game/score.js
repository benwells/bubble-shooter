function Score(opts) {

  this.color = 'green';
  this.fontSize = 22;
  this.fontStyle = 'sans-serif';
  this.label = "Score: ";
  this.score = 0;
  this.x = 780 - 10;
  this.y = 420;
  this.context = {};

  //set the options
  this.setOpts(opts);
}

Score.prototype.draw = function () {
  var _this   = this,
      context = _this.context;

  context.font = _this.fontSize + "px " + _this.fontStyle;
  context.fillStyle = _this.color;
  context.textBaseline = "bottom";
  context.textAlign="right";
  context.fillText(this.label + this.score, this.x, this.y);
};

Score.prototype.setOpts = function(opts) {
  for (var prop in opts) {
    this[prop] = opts[prop];
  }
};
