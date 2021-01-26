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
        // Not using variable here for count so it affects class scope 
        this._uDCount += 1;
      }
      else if(uDC > arr.length-1){
        // Not using variable here for count so it affects class scope
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
    let answer = prompt("Which way? Acceptable directions are up, down, left and right or their first letters.  Capatilization does not matter.");
    answer = answer.toLowerCase();

    if(answer === 'l' || answer === 'left'){
      this._lRCount -= 1;
      let ans = this.testLocation();
      if(ans === false){
        return ans;
      }
      this._fieldTwoDArr[this._uDCount][this._lRCount] = '*';
      this.print();
      return ans;
    }
    else if(answer === 'r' || answer === 'right'){
      this._lRCount += 1;
      let ans = this.testLocation();
      if(ans === false){
        return ans;
      }
      this._fieldTwoDArr[this._uDCount][this._lRCount] = '*';
      this.print();
      return ans;
    }
    else if(answer === 'u' || answer === 'up'){
      this._uDCount -= 1;
      let ans = this.testLocation();
      if(ans === false){
        return ans;
      }
      this._fieldTwoDArr[this._uDCount][this._lRCount] = '*';
      this.print();
      return ans;
    }
    else if(answer === 'd' || answer === 'down'){
      this._uDCount += 1;
      let ans = this.testLocation();
      if(ans === false){
        return ans;
      }
      this._fieldTwoDArr[this._uDCount][this._lRCount] = '*';
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

  // Allows the method to be called on the regular object, not an instance to generate a random field
  static generateField(height, width){
    let newArr = [];
    let charArr = [hole, fieldCharacter];
    
    for(let i=0;i<height;i++){
      let tempArr = [];
      for(let j=0;j<width;j++){
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
    let randHeight = Math.floor(Math.random()*height+1);
    if(randHeight>=height){
      randHeight -= 1;
    }
    let randWidth = Math.floor(Math.random()*width+1);
    if(randWidth>=width){
      randWidth -= 1;
    }
    newArr[randHeight][randWidth] = '^';
    return newArr;
  }

}

// Create instance to run and test code
const field1 = new Field(Field.generateField(5,5));
field1.runGame();
