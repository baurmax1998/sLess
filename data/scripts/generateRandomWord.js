var characters = 'abcdefghijklmnopqrstuvwxyz';

function generateRandomWord(length) {

  var ret = '';
  for (var i = 0; i < length; i++) {
    ret += getRandomItem(characters);
  }
  return ret;

}