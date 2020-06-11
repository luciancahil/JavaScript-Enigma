var rotors = [1, 2, 3];
var e = new Enigma("ABCDEFGHIJKLMNOPQRST", 123, rotors);

var pb = new Plugboard("ABCDEFGHIJKLMNOPQRST");
console.log("Output: " + pb.runPlugboard("A"));


function Enigma(plugboardSettings, rotorOrder, rotorSettings){
    this.plugboardSettings = plugboardSettings;
    this.rotorOrder = rotorOrder;
    this.rotorThreeSetting = rotorSettings[0];
    this.rotorTwoSetting = rotorSettings[1];
    this.rotorOneSetting = rotorSettings[2];//rotors in Enigma run from front to back.
    this.reflector = function(c){
      let reflection = "YRUHQSLDPXNGOKMIEBFZCWVJAT"; //this shows where the reflection will give, where the first letter is "A", the second letter is "B", and so on.
      return reflection.charAt(charToInt(c)-1);
    }

    
}

function Plugboard(settings){
  let output = ["error"];
  let length = settings.length;

  for(i = 1; i<=26; i++){//Map 1 to A, 2 to B, and so on.
    output[i] = intToChar(i);
  }

  for(i = 0; i< 20; i+=2){//switches characters such that if a and b are connected, a will output B and b will output A
    let indexOne = charToInt((settings.charAt(i)));
    let indexTwo = charToInt((settings.charAt(i+1)));
    swap(indexOne,indexTwo);
  }

  this.runPlugboard = function(c){
    return output[charToInt(c)];
  }
  
  function swap(indexOne, indexTwo){
    let temp = output[indexOne];
    output[indexOne] = output[indexTwo];
    output[indexTwo] = temp;
  }
}

function charToInt(char){
  var upper = char.toUpperCase();

  return upper.charCodeAt(0)-64;
}

function intToChar(int){
  return String.fromCharCode(int+64);
}