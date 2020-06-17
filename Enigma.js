function Enigma(plugboardSettings, rotorOrder, rotorSettings){
  this.numRotors = 3;
  this.pb = new Plugboard(plugboardSettings);   //creates the Plugboard with the given settings.
  this.rotorSet = getRotors(rotorOrder,rotorSettings);
  this.shiftFirst = this.rotorSet[1].orientation == (this.rotorSet[1].turnKey-2);       //determines wheteher to shift the first rotor during the first shift

  function getRotors(rO,rS){//rotorOrder, rotorSettings
    let rotors = [];  //set of all rotors
    let setting = 0;  //setting of rotor to be added
    let rotor;
    for(i = 0; i<3; i++){
      setting = rS[i];

      switch(rO.charAt(i)){
        case "1":
          rotor = new RotorOne(setting);
          break;
        case "2":
          rotor = new RotorTwo(setting);
          break;
        case "3":
          rotor = new RotorThree(setting);
          break;
        case "4":
          rotor = new RotorFour(setting);
          break;
        case "5":
          rotor = new RotorFive(setting);
          break;
      }
      rotors.push(rotor);
    }

    

    return rotors;
  }

  //End of Constructor Methods
  this.showRotors = function(){
    for(i = 0; i < this.numRotors; i++){
      console.log(this.rotorSet[i].type + " @ (" + intToChar(this.rotorSet[i].orientation+1) + ")");
    }
  }


  this.clean = function(originalMessage){   //removes spaces and other non-alpha characters
    originalMessage = originalMessage.toUpperCase();
    var cleanedString = ""; //string after cleaning
    let c;    //character being tested
    for(i = 0; i< originalMessage.length; i++){
      let c = originalMessage.charAt(i);

      if(charToInt(c) > 0 && charToInt(c) <= 26){
        cleanedString += c;
        
      }
      
    }

    return cleanedString;
  }


  /*
  The first thing to know is that Enigma rusn from the third rotor to the second to the first.

  The third rotor gets shifted no matter what.

  the second rotor gets shifted if the third rotor makes its turnkey shift. Every rotor has one. For example, if RotorOne is in the third spot,
  and it goes from Q to R, then the second rotor will also shift.

  The second rotor will also shift if the previous shift put it at the beggining of the turnkey. For example, if rotorFour is the second rotor,
  and get shifted onto J, then the next turn the second rotor is guraenteed to shift the next run, and is also guarenteed to shif the first rotor as well.
  */
  

  this.shiftRotors = function(){
    if(this.shiftFirst){
      this.rotorSet[1].shift();
      this.rotorSet[0].shift();
      this.shiftFirst = false;
    }

    if(this.rotorSet[this.numRotors-1].shift() && !this.shiftFirst){ //prevent from shifting twice if both 3 and 2 are at their critical points.
      this.rotorSet[1].shift();
      if(this.rotorSet[1].orientation == this.rotorSet[1].turnKey-2){
        this.shiftFirst = true;
      }
    }
  }

  

  this.scramble = function(message){
    let cleaned = this.clean(message);        //Enigma doesn't have spaces or special Characters. As such, those characters must be removed.
    let scrambled = "";
    for(i = 0; i<cleaned.length; i++){
      let c = this.scrambleChar(cleaned.charAt(i));
      scrambled += c;
    }

    return scrambled;
  }

  this.scrambleChar = function(char){//scrambles each character one by one
    this.shiftRotors();
    var scrambled = this.pb.runPlugboard(char);
    scrambled = this.runRotorsF(scrambled);      //runing rotors forwards
    scrambled = this.reflector(scrambled);
    scrambled = this.runRotorsB(scrambled);      //running rotors backwards
    scrmabled = this.pb.runPlugboard(scrambled);   
    return scrambled;
  }

  this.runRotorsF = function(char){ //running each rotor forward
    var rotored = this.rotorSet[2].run(char, "F");
    rotored = this.rotorSet[1].run(rotored, "F");
    rotored = this.rotorSet[0].run(rotored, "F");

    return rotored;
  }

  this.runRotorsB = function(char){ //running each rotor forward
    var rotored = this.rotorSet[0].run(char, "B");
    rotored = this.rotorSet[1].run(rotored, "B");
    rotored = this.rotorSet[2].run(rotored, "B");

    return rotored;
  }

  

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

    this.runPlugboard = function(c){//will return letter as it runs through the plugboard.
      return output[charToInt(c)];
    }

    function swap(indexOne, indexTwo){
      let temp = output[indexOne];
      output[indexOne] = output[indexTwo];
      output[indexTwo] = temp;
    }
}



class Rotor{
  constructor(type, orientation){
    this.orientation = orientation-1; //represents how far oriented this rotor is. Will not shift if is 1, as a 1 would represent a being paried with A
    this.type = type;
  }

  run(c, direction){//c is the character to be scrambled, direction dictates if it's forwards or backwards
    let num = charToInt(c); //turns the character into a number
    num--; // "A" will need to go through charAt(0), "B" will go through charAT(1), and so on,  so we must subtract by one
    num = (num + this.orientation) % 26;//shifts by the orientation, then rounds back down
    
    if(direction === "F"){ // run forwards
      num = charToInt(this.forwardOutput.charAt(num)); //runs forwards through the wire as a char, then converts the new char back to a number
    }else{ //running backwards
      num = charToInt(this.backwardsOutput.charAt(num)); //runs backwards through the wire as a char, then converts the new char back to a number
    }


    num = (num - this.orientation +26)%26; //shifts backwards by the orientation amount, and the +26 catches any negative numbers.
    return intToChar(num);
  }


  shift(){
    if(this.orientation == 25){// If at the end, set back to start
      this.orientation = 0;
    }else{
      this.orientation++;
    }

    if(this.orientation+1 == (this.turnKey)){//returns wether it is at the critical point yet (+1 because orientation is one before the letter index)
      return true;
    }else{
      return false;
    }
  }

  output(){
    return "Rotor " + this.type + " @ " + this.orientation+1 + " (" + intToChar(this.orientation+1) + ")";
  }
}

class RotorOne extends Rotor{
  constructor(orientation){
    super(1, orientation);
    this.turnKey = 18; //turns after going from Q to R
    this.forwardOutput = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";    //tells how the wiring runs going forwards
    this.backwardsOutput = "UWYGADFPVZBECKMTHXSLRINQOJ";  //tells how the wiring runs going backwards
  }

  
}

class RotorTwo extends Rotor{
  constructor(orientation){
    super(2, orientation);
    this.turnKey = 6; //turns after going from E to F
    this.forwardOutput = "AJDKSIRUXBLHWTMCQGZNPYFVOE";    //tells how the wiring runs going forwards
    this.backwardsOutput = "AJPCZWRLFBDKOTYUQGENHXMIVS";  //tells how the wiring runs going backwards
  }
}

class RotorThree extends Rotor{
  constructor(orientation){
    super(3, orientation);
    this.turnKey = 23; //turns after going from V to W
    this.forwardOutput = "BDFHJLCPRTXVZNYEIWGAKMUSQO";    //tells how the wiring runs going forwards
    this.backwardsOutput = "TAGBPCSDQEUFVNZHYIXJWLRKOM";  //tells how the wiring runs going backwards
  }
}

class RotorFour extends Rotor{
  constructor(orientation){
    super(4, orientation);
    this.turnKey = 11; //turns after going from J to K
    this.forwardOutput = "ESOVPZJAYQUIRHXLNFTGKDCMWB";    //tells how the wiring runs going forwards
    this.backwardsOutput = "HZWVARTNLGUPXQCEJMBSKDYOIF";  //tells how the wiring runs going backwards
  }
}

class RotorFive extends Rotor{
  constructor(orientation){
    super(5, orientation);
    this.turnKey = 1; //turns after going from Z to A
    this.forwardOutput = "VZBRGITYUPSDNHLXAWMJQOFECK";    //tells how the wiring runs going forwards
    this.backwardsOutput = "QCYLXWENFTZOSMVJUDKGIARPHB";  //tells how the wiring runs going backwards
  }
}

function charToInt(char){//turns A to 1, B to 2, and so on
  var upper = char.toUpperCase();

  return upper.charCodeAt(0)-64;
}

function intToChar(int){//turns 1 to A, B to 2, and so on
  if(int == 0){//26%26 is 0, so I might be given a 0 when I would have expected a 26.
    return "Z";
  }

  return String.fromCharCode(int+64);
}


//main
var settingsForRotors = [10,4,22];
var message = "Hello There";
var e = new Enigma("abcdefghijklmnopqrst", "123", settingsForRotors);
console.log("\"" + message + "\"" + " scrambled is \"" + e.scramble(message) + "\".");




/*
Q -> R
E -> F
V -> W
J -> K
Z -> A

1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26
A   B   C   D   E   F   G   H   I   J   K   L   M   N   O   P   Q   R   S   T   U   V   W   X   Y   Z

*/