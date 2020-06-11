# JavaScript-Enigma

Building an enigma machine that runs off javascript. No Webpage functionality.

The Enigma Machine was a machine Used by the Nazis to send decoded messages over the air in WW2. It works by running a character through a complex series of functions to get another letter (always another letter, never itself). It first passes through a plugboard, then a rotor section, then a reflector. It would then go through the rotor section Backwards, and then finally running through the plugboard again to give our encrypted character. 

First, a character is sent through a plugboard, where 20 letters are connected to another letter other. For example, A could be connected to B, C connected to D, and so on.

If the letter A is entered, and A is connected to B on the plugboard, then the plugboard will turn the A into a B, and a B would have been turned into an A. Meanwhile, a "Z" would remain a "Z", since "Z" is not connected to anything in the plugboard. 

Next, the letter will go through the rotors. Enigma has 5 rotors, but only 3 can be in the machine at a time. Each rotor can accept a letter, and then will run that letter through it's wiring to give a letter as an output. The input output relation is shown below:

ROTOR DETAILS

INPUT:        A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 

ROTOR ONE:    E K M F L G D Q V Z N T O W Y H X U S P A I B R C J

ROTOR TWO:    A J D K S I R U X B L H W T M C Q G Z N P Y F V O E

ROTOR THREE:  B D F H J L C P R T X V Z N Y E I W G A K M U S Q O

ROTOR FOUR:   E S O V P Z J A Y Q U I R H X L N F T G K D C M W B

ROTOR FIVE:   V Z B R G I T Y U P S D N H L X A W M J Q O F E C K

What this means is, if a "Z" were to enter rotor One, it would become a J, while a "Z" going through rotor Three would become an "O".

After passing through one rotor, the next rotor would then take the new letter as its input, and give a new letter, which would be taken as an input for the third rotor. Importantly, Enigma start with the third rotor and ends with the first, not the other way around.

Following Our example, if the rotors in place are 1, 2, 3, and all are in the default position, Our "B" would become a "D", then the "D" would become a "K", then the "K" would become an "N".

But that's only if all the rotors are in the default position. A rotors position can be anything from 1 to 26. The number would shift the letter before it goes through the letter, and the equation for the letter after the shift can be found by (Original + Position - 1 MOD 26). For example, if the original letter is B and the Position is 17, we would be shifted to the (2 + 17 - 1)th letter, or 18th letter, "R". (NOTE: if the result is 0, then the letter has become "Z"). 


Then the letter would be shifted back by the same number it was shifted forward before passing either out of the rotor section or to the next rotor. If after a backwards, shift, the number is less than 0, add 26 in order to find the correct number. (B - 10 would become 2-10+26, or "R").

So with our earlier Examples, If the rotor positions during our run was 12, 11, 10, then Our B would become:

B -- (shift forward 9) --> "I" -- through rotor three -> "R" -- Shift back 9 --> "I"

"I" -- (shift forward 10) --> "S" -- through rotor Two -> "Z" -- Shift Back 10 --> "P"

"P" -- Shift forward 11) --> "A" -- through rotor One --> "E" -- Shift back 11 --> "T"\

An important thing to note is that before the Engima encrypts a letter, it shifts the first rotor. This means 2 things. One, in order to have the order in the example above, the machine must be set to 11, 11, 10. The second, more important implication is that a letter wouldn't be fixed onto another. For example, in "Hello", the two L's would both be matched to different letters.

After going through the rotor section, we hit the reflector. The reflector works very much like the plugboard, except each letter is paired with another, and the pairings are preset. Specificially, the pairings are:

INPUT:  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z 

OUTPUT: Y R U H Q S L D P X N G O K M I E B F Z C W V J A T

Here, our "T" would become A "Z".

After this is done, we must run through the rotors again, except this time backwards. That is, we must find out where our letter after the reflector is in the output of the third rotor, then give the input as the output. For example, the reflector gave us "Z". Rotor 3 would normally output Z when given the input "M". That means, when running backwards, "Z" would become an "M". (We have ignored the shifts for simplicities sake, but remmember that they also apply here in the same way).

After that, we run through the plugboard one last time if needed, then give the resulf of the plugboard as the final encrypted letter.

For refrence:

1   2   3   4   5   6   7   8   9   10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26
A   B   C   D   E   F   G   H   I   J   K   L   M   N   O   P   Q   R   S   T   U   V   W   X   Y   Z 
