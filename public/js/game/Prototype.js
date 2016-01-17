/**
 * Misc helper methods
 */

/**
 * accepts a min and max value and determines
 * 1. is the number or the min greater
 * 2. is the result of 1 or the max smaller
 * helps with positioning in the canvas element
 *
 * @param  {[number]} min [min value]
 * @param  {[number]} max [max value]
 * @return {[number]}     [returns result of 2. above]
 */
Number.prototype.clamp = function (min, max) {
  return Math.min(Math.max(this, min), max);
};

/**
 * Generate a random number
 */
function randomFloat(min, max) {
  return min + Math.random() * (max - min);
}
