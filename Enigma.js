var rotors = [1, 2, 3];
var e = new Enigma("ABCDEFGHIJKLMNOPQRST", 123, rotors);

console.log(e.reflector("n"));


function Enigma(plugboardSettings, rotorOrder, rotorSettings){
    this.plugboardSettings = plugboardSettings;
    this.rotorOrder = rotorOrder;
    this.rotorThreeSetting = rotorSettings[0];
    this.rotorTwoSetting = rotorSettings[1];
    this.rotorOneSetting = rotorSettings[2];//rotors in Enigma run from front to back.
    this.reflector = function(c){
      var reflection = "YRUHQSLDPXNGOKMIEBFZCWVJAT"; //this shows where the reflection will give, where the first letter is "A", the second letter is "B", and so on.
      return reflection.charAt(charToInt(c)-1);
    }

    
}

function charToInt(char){
  var upper = char.toUpperCase();

  return upper.charCodeAt(0)-64;
}

function intToChar(int){
  return String.fromCharCode(int+64);
}