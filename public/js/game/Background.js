/**
 * Background object with default props
 */
function Background(opts) {
  ObjectBase.call(this);

  this.yVelocity = 0;
  this.xVelocity = 0;
  this.width = 0;
  this.height = 0;
  this.color = "white";
  this.context = {};
  this.x = 0;
  this.y = 0;

  this.setOpts(opts);
}

/**
 * inheritance from ObjectBase Class
 */
Background.prototype = new ObjectBase();
Background.prototype.constructor = Background;
var BackgroundProto = Background.prototype;

/**
 * Class Methods
 */

/**
 * Draw handles the background image dimensions and scrolling
 * behavior in the game loop
 */
BackgroundProto.draw = function () {
  if(this.x <= - this.width + 780){
    this.x = 0;
  }
  var scrollImg = document.getElementById('bgImg');
  this.context.drawImage(scrollImg,this.width-this.x,0,this.x,this.height, 0, 0, this.x,this.height);
  this.context.drawImage(scrollImg,this.x,0,this.width, this.height);
};

/**
 * Update simply increments the x axis value of the background
 * which handles scrolling speed.
 */
BackgroundProto.update = function () {
  this.x = this.x -4;
};
