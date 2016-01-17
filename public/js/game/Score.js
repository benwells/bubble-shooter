/**
 * Score object definition
 * @param {[object]} opts [object of props to override defaults]
 */
function Score(opts) {
  ObjectBase.call(this);

  this.color = 'green';
  this.fontSize = 18;
  this.fontStyle = 'sans-serif';
  this.scoreLabel = "Score: ";
  this.levelLabel = "Level: ";
  this.score = 0;
  this.level = 1;
  this.x = 780 - 10;
  this.y = 420;
  this.context = {};

  //set the options
  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Score.prototype = new ObjectBase();
Score.prototype.constructor = Score;
var ScoreProto = Score.prototype;


/**
 * Draws the score to the screen
 */
ScoreProto.draw = function () {
  var _this   = this,
      context = _this.context;

  context.font = _this.fontSize + "px " + _this.fontStyle;
  context.fillStyle = _this.color;
  context.textBaseline = "bottom";
  context.textAlign="right";
  context.fillText(this.scoreLabel + this.score + "  |  " + this.levelLabel + this.level, this.x, this.y);
};
