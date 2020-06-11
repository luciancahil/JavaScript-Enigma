var rotors = [1, 2, 3];
var e = new Enigma("ABCDEFGHIJKLMNOPQRST", 123, rotors);

console.log(e.plugboardSettings);
console.log(e.rotorOrder);
console.log(e.rotorThreeSetting);
console.log(e.rotorTwoSetting);
console.log(e.rotorOneSetting);


function Enigma(plugboardSettings, rotorOrder, rotorSettings){
    this.plugboardSettings = plugboardSettings;
    this.rotorOrder = rotorOrder;
    this.rotorThreeSetting = rotorSettings[0];
    this.rotorTwoSetting = rotorSettings[1];
    this.rotorOneSetting = rotorSettings[2];//rotors in Enigma run from front to back.
}

function charToInt(char){
  var upper = char.toUpperCase();

  return upper.charCodeAt(0)-64;
}

function intToChar(int){
  return String.fromCharCode(int+64);
}