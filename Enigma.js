var input = "Hello There"
var int = 65;
console.log(charToInt("d)"));
console.log(intToChar(1));

function charToInt(char){
  var upper = char.toUpperCase();

  return upper.charCodeAt(0)-64;
}

function intToChar(int){
  return String.fromCharCode(int+64);
}