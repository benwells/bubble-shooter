/**
 * Message object definition.  A message displays to the end user when they
 * level up.
 * @param {[string]} text [text to display to user]
 */
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

/**
 * Handles drawing the message to the canvas element
 * @param  {[context]} context2 [canvas context]
 */
Message.prototype.draw = function (context2) {
  context2.font = this.fontSize + "px " + this.fontStyle;
  context2.fillStyle = this.color;
  context2.textBaseline = "top";
  context2.textAlign="center";
  context2.fillText(this.text, this.x, this.y);
};

/**
 * Updates the message position
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game screen height]
 */
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

/**
 * Determines of the the message is still inbounds
 * @param  {[decimal]} w [game screen width]
 * @param  {[decimal]} h [game screen height]
 * @return {[boolean]}   [true if inbounds, otherwise false]
 */
Message.prototype.inBounds = function (w, h) {
  return this.y <= h;
};
