// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Enter a word: ");
   word = word.toUpperCase();
   return word;
   // console.log(word);
   // console.log(oldScrabbleScorer(word));
   // console.log(simpleScorer(word));
   // console.log(vowelBonusScorer(word));
};

let simpleScorer = function(word){
   let score = word.length;
   return score;
};

let vowelBonusScorer = function(word){
   let vowelArray = ["A","E","I","O","U"]; 
   let score = 0;
   for (let i = 0; i <word.length; i++){
      if(vowelArray.includes(word[i])){
         score+=3;
         console.log(`${word[i]}: 3`);
      }else {
         score+=1;
         console.log(`${word[i]}: 1`);
      }
   }
   return score;
};

let scrabbleScorer;

const scoringAlgorithms = [
   {"name": "Simple Score",
   "description": "Each letter is worth 1 point",
   "scoringfunction": simpleScorer
   },
   {"name": "Bonus Vowels",
   "description": "Vowels are 3 pts, consonants are 1 pt.",
   "scoringfunction": vowelBonusScorer
   },
   {"name": "ScrabbleScore",
   "description": "traditional scrabble scoring",
   "scoringfunction": oldScrabbleScorer
   },
];

function scorerPrompt() {
   console.log("Choose a scoring prompt from the options below:")
   for(let i = 0; i<scoringAlgorithms.length; i++){
      console.log(`${i}: ${scoringAlgorithms[i].name}\t ${scoringAlgorithms[i].description}`)
   }
   let userChoice= input.question("Enter your choice here: ");
      return scoringAlgorithms[userChoice];
}

function transform(oldPointStructure) {
   let newPointStructure={}; // declares a new object to hold the new point structure
   for(pointValue in oldPointStructure){ // iterate over each key in oldPointStructure
      let letterArray = oldPointStructure[pointValue]; //assign array value to a seperate variable
      for(let i=0;i<letterArray.length;i++){ // iterate over array 
         newPointStructure[letterArray[i].toLowerCase()] = pointValue; 
         //create new key for each letter, assign point value as the value. 
      }
   }
   return newPointStructure; // return new object.
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let choice = scorerPrompt();
   console.log(`score for ${word} using ${choice.name}`);
   console.log(`total score: ${choice.scoringfunction(word)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
