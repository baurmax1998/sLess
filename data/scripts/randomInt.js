/**
 * Give some number
 * @param {number} min the lowest
 * @param {number} max the most
 * @returns {number}
 */
function randomInt(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}