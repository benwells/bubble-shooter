function explosion (info) {
  info = info || {};
  info.color = 'white';
  info.draw = function(canvas) {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };
  return info;
}