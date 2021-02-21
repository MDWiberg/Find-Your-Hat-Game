const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(fieldTwoDArr){
    this._fieldTwoDArr = fieldTwoDArr;
    this._lRCount = 0;
    this._uDCount = 0;
  }
  
  // Methods 

  // Prints out the current field
  print(){
    for(let i=0;i<this._fieldTwoDArr.length;i++){
      console.log(this._fieldTwoDArr[i].join(""));
    }
  }

  // Tests current position if it is in a hole, on the hat or off the field
  testLocation(){
    // Renaming the variables to shorten the length for readbility purposes
    let arr = this._fieldTwoDArr;
    let lRC = this._lRCount;
    let uDC = this._uDCount;

    if(uDC < 0 || uDC > arr.length-1 || lRC < 0 || lRC > arr[uDC].length-1){
      if(uDC < 0){
        // Not initializing variable here for count so it affects class scope 
        this._uDCount += 1;
      }
      else if(uDC > arr.length-1){
        // Not initializing variable here for count so it affects class scope
        this._uDCount -= 1;
        console.log('hello');
      }
      console.log("You moved out of the field. You lose!");
      return false;
    }
    else if(arr[uDC][lRC] === '^'){
      console.log("You found your hat. You win!");
      return false;
    }
    else if(arr[uDC][lRC] === 'O'){
      console.log("You fell in a hole. You lose!");
      return false;
    }
    else{
      return true;
    }
  }

  //  Gives a prompt askings for directions and prints the path character to show where you move
  ask(){
    let answer = prompt("Which way? Acceptable directions are up, down, left and right or their first letters (Capatilization does not matter): ");
    answer = answer.toLowerCase();

    // Handles all cases for directions
    if(answer === 'l' || answer === 'left'){
      this._lRCount -= 1;
      let ans = this.testLocation();
      if(ans === false){
        return ans;
      }
      this._fieldTwoDArr[this._uDCount][this._lRCount] = pathCharacter;
      this.print();
      return ans;
    }
    else if(answer === 'r' || answer === 'right'){
      this._lRCount += 1;
      let ans = this.testLocation();
      if(ans === false){
        return ans;
      }
      this._fieldTwoDArr[this._uDCount][this._lRCount] = pathCharacter;
      this.print();
      return ans;
    }
    else if(answer === 'u' || answer === 'up'){
      this._uDCount -= 1;
      let ans = this.testLocation();
      if(ans === false){
        return ans;
      }
      this._fieldTwoDArr[this._uDCount][this._lRCount] = pathCharacter;
      this.print();
      return ans;
    }
    else if(answer === 'd' || answer === 'down'){
      this._uDCount += 1;
      let ans = this.testLocation();
      if(ans === false){
        return ans;
      }
      this._fieldTwoDArr[this._uDCount][this._lRCount] = pathCharacter;
      this.print();
      return ans;
    }
    else{
      console.log("Please enter direction");
      return true;
    }
  }

  // Performs a loop to run the game until an exiting condition is met
  runGame(){
    this.print();
    let answer = true;
    while(answer){
      answer = this.ask();
    }
  }

  // Method to generate a random field
  // Static: Allows the method to be called without an instance of the class
  static generateField(){

    // Use a prompt to allow the size of the grid to be determined by input
    let gridHeight = prompt("Please enter a height: ");
    let gridWidth = prompt("Please enter a width: ");

    let newArr = [];
    let charArr = [hole, fieldCharacter];
    
    // Loops through until full height of the grid is filled
    for(let i=0;i<gridHeight;i++){
      let tempArr = [];
      // Loops thorugh filling in the width of the grid
      for(let j=0;j<gridWidth;j++){
        let randIndex = 0;
        if(i === 0 && j === 0){
          tempArr.push(pathCharacter);
        }
        else{
          // Choosing a random character for the field
          randIndex = Math.floor(Math.random()*charArr.length);
          tempArr.push(charArr[randIndex]);
        }
      }
      newArr.push(tempArr);
    }
    let randHeight = Math.floor(Math.random()*gridHeight+1);
    if(randHeight>=gridHeight){
      randHeight -= 1;
    }
    let randWidth = Math.floor(Math.random()*gridWidth+1);
    if(randWidth>=gridWidth){
      randWidth -= 1;
    }
    newArr[randHeight][randWidth] = hat;
    return newArr;
  }

}

// Create instance to run and test code
const field1 = new Field(Field.generateField());
field1.runGame();
