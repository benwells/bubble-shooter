Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}