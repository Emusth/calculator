
// Set eventListener
const listeners = {
    calculator: document.querySelector('.calc__div'),
    setListener: function(){
        const that = this;
        this.calculator.addEventListener('click', that.calcClickEvent);
        document.body.addEventListener('keydown', that.keyEvent);
    },
    calcClickEvent: function(e) {
        inputs.controller(e.target.dataset.calcid);
    },
    keyEvent: function(e) {
        inputs.controller(e.key);
    }
}

const inputs = {
    currentInput: '',
    currentInputType: '',
    approvedInputsArr: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '=', '+', '-', '*', '/', 'Clear', 'Delete',  'Enter'],
    firstNumArr: [],
    operatorArr: [],
    secondNumArr: [],
    total: '',

    controller(input) {
        this.approveInput(input);
        this.inputType();
        const path = this.inputPath();
        
        if(path === 'arr') {
            this.moveToArr();
        }
        else if (path === 'clear') {
            this.clearInputs();
        }
        else if (path === 'total') {
            this.total = this.totalInputs();
            
        }

        if (this.total) {
           this.totalController();
        } else {
            
            output.setDisplayVars(this.firstNumArr.join(''),this.operatorArr.join(''),this.secondNumArr.join(''));
            output.updateDisplay();     
        }
    },
    totalController() {
        const totalSave = this.total;
        output.setDisplayVars('','','');
        output.updateDisplay(this.total);
        this.clearInputs();
        this.firstNumArr.push(totalSave);
    },

    // Approve input in general
    approveInput(input) {
        if(this.approvedInputsArr.includes(input)) {
            this.currentInput = input;
            return;
        }
    },

    // See if the input was a number, decimal, operator, total, or clear/delete
    inputType() {
        const input = this.currentInput;
        const numberArr = ['1', '2','3','4','5','6','7','8','9','0'];
        const decimalArr = ['.'];
        const operatorArr = ['+', '-','*','/'];
        
        if(numberArr.includes(input)) {
            this.currentInputType = 'number';
        } else if (decimalArr.includes(input)) {
            this.currentInputType = 'decimal';
        } else if (operatorArr.includes(input)) {
            this.currentInputType = 'operator';
        } else if (input === 'Total' || input === '=' || input === 'Enter') {
            this.currentInputType = 'total';
        } else if (input === 'Clear' || input === 'Delete') {
            this.currentInputType = 'clear';
        }
        return;
    },

    inputPath() {
        let inputType = this.currentInputType;
        if(inputType === 'number' || inputType === 'decimal' || (inputType === 'operator' && !this.secondNumArr.length)) {
            return 'arr';
        } 
        else if (inputType === 'clear'){
            return 'clear';
        } 
        else if (inputType === 'total' || (inputType === 'operator' && this.secondNumArr.length)) {
            return 'total';
        }
    },

    moveToArr() {
        const input = this.currentInput;
        const inputType = this.currentInputType;

        const fArr = this.firstNumArr;
        const sArr = this.secondNumArr;
        const opArr = this.operatorArr;
        const acceptOpArr = ['+','-','/','*']
        
        // There are no previous inputs, use first array
        // There is an input in first array, but nothing in the operator array, and the current input is not an operator
        if(!fArr.length || 
            (fArr.length && 
                !opArr.length && !acceptOpArr.includes(input))) 
            {
                    if (this.numArrCheck('first')) {
                        this.firstNumArr.push(input);
                    } else {
                        return;
                    };
            }
        else if ((fArr.length && 
            !opArr.length && 
            (acceptOpArr.includes(input)))) 
            {
                if (this.operatorArrCheck()) {
                    this.operatorArr.push(input);
                } else {
                    return;
                };
            }
        else if (fArr.length && opArr.length && !sArr.length || fArr.length && opArr.length && !acceptOpArr.includes(input)) 
            {
                if (this.numArrCheck('second')) {
                    this.secondNumArr.push(input);
                } else {
                    return;
                };
            }

    },

    numArrCheck(arrTarget){
        const curInput = this.currentInput;

        const numArr = arrTarget === 'first' ? this.firstNumArr : this.secondNumArr;
        const numArrLength = numArr.length;

        const approvedInputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        
        if (numArrLength === 0) {
            approvedInputs.push('+', '-', '.');
        } else if (numArrLength > 0 && !numArr.includes('.')) {
            approvedInputs.push('.');
        }
        if (approvedInputs.includes(curInput)) {
            return true;
        } else {
            return false;
        }

    },
    operatorArrCheck(){
        const curInput = this.currentInput;
        const approvedInputs = ['+', '-','*', '/'];
        if (approvedInputs.includes(curInput)) {
            return true;
        } else {
            return false;
        }

    },
    clearInputs(){
        this.firstNumArr.length = 0;
        this.operatorArr.length = 0;
        this.secondNumArr.length = 0;
        this.total = '';
    },
    totalInputs(){
        fNum = Number(this.firstNumArr.join(''));
        sNum = Number(this.secondNumArr.join(''));
        op = this.operatorArr[0];
        
       if ( op === '+') {
            total = fNum + sNum;
        }
        else if (op === '-') {
            total = fNum - sNum;
        }
        else if (op === '*') {
            total = fNum * sNum;
        }
        else if (op === '/') {
            total = fNum / sNum;
        }

        return Math.round(total * 1000) / 1000
        
    },
}

const output = {
    
    inputDisplay: document.querySelector('.calc__display-input'),
    totalDisplay: document.querySelector('.calc__display-total'),
    firstNum: '',
    operator: '',
    secondNum: '',
    total: '',
    setDisplayVars(firstNum, operator, secondNum){
        this.firstNum = firstNum;
        this.operator = operator;
        this.secondNum = secondNum;
        
    },

    updateDisplay(total = '') {
        const inputString = this.firstNum + (this.operator ? (' ' + this.operator) : '') + (this.secondNum ? (' ' + this.secondNum) : '');
        this.inputDisplay.textContent = this.firstNum ? inputString : total ? '' : '0';

        this.totalDisplay.textContent = total;
    },
}


listeners.setListener();





// Process input
// const controller = {
//     currentInput: '',
//     currentInputType: '',
//     previousInput: '',
//     previousInputType: '',
    
//     firstNum: '',
//     secondNum: '',
//     operator: '',

//     convertInput: function(input, source) {
//         const originalInput = input;
//         const inputLower= input.toLowerCase();
//         let convertedInput;

//         if (inputLower=== '/' || inputLower=== '*' ||inputLower=== '-' ||inputLower=== '+' || inputLower=== 'clear' || inputLower=== 'delete' || inputLower=== '.') {
//             convertedInput = inputLower;
//         }
//         else if (inputLower=== 'enter' || inputLower=== '=') {
//             convertedInput = 'total';
//         }
//         else if (inputLower=== 'backspace') {
//             convertedInput = 'delete';
//         } 
//         else if (!isNaN(inputLower) && inputLower !== ' ') {
//             
//             convertedInput = inputLower;
//         } else {
//             return;
//         }

//         this.setInputs(convertedInput);
//     },

//     setInputs: function(input) {
//         this.previousInput = (this.currentInput ? this.currentInput : '');
//         this.currentInput = input;
//         this.setInputType();
//     },

//     setInputType: function() {
//         const curIn = this.currentInput;
//         const prevIn = this.previousInput;

//         let type;

//         // 

//         // if(!isNaN(curIn)) {
//         // type = 'number';
//         // this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
//         // this.currentInputType = type;
//         // } 
//         // else if (curIn === '.') {
//         // type = 'decimal';
//         // this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
//         // this.currentInputType = type;
//         // } 
//         // else if (curIn === '+') {
//         // type = '+';
//         // this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
//         // this.currentInputType = type;
//         // } 
//         // else if (curIn === '-') {
//         // type = '-';
//         // this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
//         // this.currentInputType = type;
//         // } 
//         // else if ( curIn === '*' ) {
//         // type = '*';
//         // this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
//         // this.currentInputType = type;
//         // } 
//         // else if (curIn === '/') {
//         // type = '/';
//         // this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
//         // this.currentInputType = type;
//         // } 
//         // else if (curIn === 'total') {
//         // type = 'total';
//         // this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
//         // this.currentInputType = type;
//         // }  
//         // else if (curIn === 'clear') {
//         // type = 'clear';
//         // this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
//         // this.currentInputType = type;
//         // }
//         // else if (curIn === 'delete') {
//         // type = 'delete';
//         // this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
//         // this.currentInputType = type;
//         // }
//         this.handleInput();
//     },

//     handleInput: function(){
//         let fNum = this.firstNum;
//         let sNum = this.secondNum;
//         let cOp = this.operator;

//         let cIn = this.currentInput;

//         // const inType = this.currentInputType;
//         if((fNum === '') || (fNum !== '' && cOp === '')) {
//                this.validateNumInput(cIn, fNum);
//         } 
//         // If firstNum has something, but there isn't an operator yet..
//         else if(fNum !== '' && cOp === '') {
            
//         };

//         // If firstNum's empty, do that
//         // If firstNum is not empty, but operator IS empty, find out what the last char of firstNum is to determine acceptable inputs
    


//         // first input can be: number, subtract, add, or decimal
//         // second input can be: number, decimal, operator, total, delete, clear
        
//         // Second input(number-number): Following another number, can receive operator, decimal, total, clear, del, 
//         // Second input(number-decimal): Receive number, operator (cancels decimal), total, clear, del
//         // Second input(number-operator): Receive number, operator (changes previous operator), total, clear, del

//         // Third input(number-decimal-number) Following a number-decimal-number, receive an operator, total, clear, del, number
//         // Third input(number-decimal-number) Following a number-decimal-number, receive an operator, total, clear, del, number

//         // 1.1-- Subtract, Add, Number, Decimal,
        
//         // 2.1-- Number-number, Number-decimal, Number-operator, Number-total,
//         // 2.2-- Subtract-number, subtract-decimal
//         // 2.3-- Add-number, Add-decimal,
//         // 2.4-- Decimal-number, 
        
//         // 3.1-- Number-number-decimal, Number-decimal-number, Number-operator-number,
//         // 3.2-- Sub-num-2.1, Sub-dec-2.4
//         // 3.3-- Add-num-2.1, Add-dec-2.4

//         // 4.1-- Num-num-dec-num, Num-dec-num-op, Num-op-num-2.4
        
        
        
        
        
        
//         // Input Scenarios:

//         // Possible inputs:
//         // a. Number
//         // b. Operator
//         // c. Decimal
//         // d. Total
//         // e. Del
//         // f. Clear
//         // ?. Nothing input

//         // a. Numbers:
//         // Number aft Nothing
//         // Number aft Number
//         // Number aft Operator
//         // Number aft Decimal
//         // Number aft Total

//         // b. Operators
//         // Operator aft Nothing
//         // Operator aft Operator
//         // Operator aft Number
//         // Operator aft Decimal
//         // Operator aft Total
   
//         // c. Decimal
//         // Decimal aft Nothing
//         // Decimal aft Decimal
//         // Decimal aft Number
//         // Decimal aft Operator
//         // Decimal aft Total
        
//         // d. Total
//         // Total aft Nothing
//         // Total aft Total
//         // Total aft Number
//         // Total aft Operator
//         // Total aft Decimal
//     },

//     validateNumInput: function(input, num) {
//         if(typeof(Number(input)) === 'number' || input === '-' || input === '+' || input === '.') {
//             this.firstNum = num.concat(input);
//             
//         }
//     }
// }













// Need to receive listener input

// What should input be?
// 0 1 2 3 4 5 6 7 8 9
// + - * /
// <Enter> <Clear> <Delete> <Backspace>


// What can I do with these inputs?
// Store them in a string
// Store them in an array
// Store them separately
// Store them together



// Storing them in an array
// Receive input 1 - Store it in index 1 of array.
// Receive input 2 - Check if it's allowed, based off the input in index 1 - If allowed, store in index 2 - Check if input 2 triggers more processing (like if the inputs should be creating a new value, or if they just need to be stored longer).
// Receive input 3 - Check if it's allowed - Check if it should trigger processing - If not, store.

// Store in the same array? Or separate arrays?
// Store in separate arrays. Simpler to check each arrays for valid inputs.



// Summary: 
// Receive inputs. Store them in the appropriate array. Arrays: firstNum, operator, secondNum.
// Example: firstArr = [1, 2, 3, ., 5, 7]; opArr = [/]; secArr = [-, ., 3, 6];

// So for each input, decide which array it can go to, then decide if it's acceptable to add to that array, or what needs to happen.
// If user hits delete, the last index of the last array gets deleted, and on and on... Might be too complex, just have a clear option

// When user hits enter and all arrays are full:
// Convert number arrays into strings, so firstArr will become 123.57, secArr = -.36.
// if statement on operator array input. so if(opArr === '/') use divide, if it's '+' then add, etc..

// If user hits enter and we only have partial info:
// If an array ends in a dot, remove the dot


// Step 1. Get inputs

// Step 2. Decide which array to place input

// Step 3. Make sure input is valid for that array

/// Maybe combine Steps 2 & 3

// Step 4. Update display

// Step 5. Handle a clear: Clear all arrays and displays

// Step 6. Handle a total: If totalling is not possible yet, maybe due to missing info, nothing happens. If There's enough, create a total rounding to the nearest hundredth.