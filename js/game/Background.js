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
//inheritance from ObjectBase Class
Background.prototype = new ObjectBase();
Background.prototype.constructor = Background;
var BackgroundProto = Background.prototype;

//Class Methods
BackgroundProto.draw = function () {
  // this.context.drawImage(document.getElementById('bgImg'),this.x, this.y, this.width, this.height);
  // console.log('x', this.x)
  // console.log('width', this.width)
  if(this.x <= - this.width + 780){
    this.x = 0;
  }
  var scrollImg = document.getElementById('bgImg');
  // var ptrn = this.context.createPattern(document.getElementById('bgImg'), 'repeat'); // Create a pattern with this image, and set it to "repeat".
  // this.context.fillStyle = ptrn;
  // this.context.fillRect(this.x, this.y, this.width, this.height);
  this.context.drawImage(scrollImg,this.width-this.x,0,this.x,this.height, 0, 0, this.x,this.height);
  this.context.drawImage(scrollImg,this.x,0,this.width, this.height);

  // this.context.drawImage(scrollImg,-this.x,0,this.width, this.height);
  // this.context.drawImage(scrollImg,this.width-this.x,0,this.width, this.height);
};

BackgroundProto.update = function () {
  this.x = this.x -4;
};
