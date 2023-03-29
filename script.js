// *** Input
// Numbers
// Operators
// Total
// Delete
// Clear

// *** Control
// Receive input
// Store number input
// Store operator input
// Store second number input
// Store second operator input
// Run calculation if total input
// Delete previous input if delete input
// Clear all input if clear all input
// Make sure input is valid, or if an operator is input after a previous operator input, that previous input becomes this newest operator input.

// *** Output
// Display previous inputs in sequence
// If total, run operation on all inputs, display reduced sum. This becomes the next input




// Make sure I'm receiving the correct inputs when a user clicks, or presses a key.







// Set eventListener
const listeners = {
    calculator: document.querySelector('.calc__div'),
    setListener: function(){
        const that = this;
        this.calculator.addEventListener('click', that.calcClickEvent);
        document.body.addEventListener('keydown', that.keyEvent);
    },
    calcClickEvent: function(e) {
        controller.convertInput(e.target.dataset.calcid, 'click');
    },
    keyEvent: function(e) {
        controller.convertInput(e.key, 'key');
    }
}

// Process input
const controller = {
    currentInput: '',
    currentInputType: '',
    previousInput: '',
    previousInputType: '',
    
    firstNum: '',
    secondNum: '',
    operator: '',

    convertInput: function(input, source) {
        const originalInput = input;
        const inputLower= input.toLowerCase();
        let convertedInput;

        if (inputLower=== '/' || inputLower=== '*' ||inputLower=== '-' ||inputLower=== '+' || inputLower=== 'clear' || inputLower=== 'delete' || inputLower=== '.') {
            convertedInput = inputLower;
        }
        else if (inputLower=== 'enter' || inputLower=== '=') {
            convertedInput = 'total';
        }
        else if (inputLower=== 'backspace') {
            convertedInput = 'delete';
        } 
        else if (!isNaN(inputLower) && inputLower !== ' ') {
            console.log(Number(inputLower));
            convertedInput = inputLower;
        } else {
            return;
        }

        this.setInputs(convertedInput);
    },

    setInputs: function(input) {
        this.previousInput = (this.currentInput ? this.currentInput : '');
        this.currentInput = input;
        this.setInputType();
    },

    setInputType: function() {
        const curIn = this.currentInput;
        const prevIn = this.previousInput;

        let type;

        // console.log(`curIn: ${curIn} prevIn: ${prevIn}`);

        if(!isNaN(curIn)) {
        type = 'number';
        this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
        this.currentInputType = type;
        } 
        else if (curIn === '.') {
        type = 'decimal';
        this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
        this.currentInputType = type;
        } 
        else if (curIn === '+') {
        type = '+';
        this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
        this.currentInputType = type;
        } 
        else if (curIn === '-') {
        type = '-';
        this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
        this.currentInputType = type;
        } 
        else if ( curIn === '*' ) {
        type = '*';
        this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
        this.currentInputType = type;
        } 
        else if (curIn === '/') {
        type = '/';
        this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
        this.currentInputType = type;
        } 
        else if (curIn === 'total') {
        type = 'total';
        this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
        this.currentInputType = type;
        }  
        else if (curIn === 'clear') {
        type = 'clear';
        this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
        this.currentInputType = type;
        }
        else if (curIn === 'delete') {
        type = 'delete';
        this.previousInputType = (this.currentInputType === '' ? '' : this.currentInputType);
        this.currentInputType = type;
        }
        this.handleInput();
    },

    handleInput: function(){
        let fNum = this.firstNum;
        let cIn = this.currentInput;
        const inType = this.currentInputType;
        if(this.firstNum === '' && inType === 'number' || inType === '-' || inType === '+' || inType === '.') {
            this.firstNum = fNum.concat(cIn);
            console.log('this.firstNum: ', this.firstNum);
        }

        // If firstNum's empty, do that
        // If firstNum is not empty, but operator IS empty, find out what the last char of firstNum is to determine acceptable inputs
    


        // first input can be: number, subtract, add, or decimal
        // second input can be: number, decimal, operator, total, delete, clear
        
        // Second input(number-number): Following another number, can receive operator, decimal, total, clear, del, 
        // Second input(number-decimal): Receive number, operator (cancels decimal), total, clear, del
        // Second input(number-operator): Receive number, operator (changes previous operator), total, clear, del

        // Third input(number-decimal-number) Following a number-decimal-number, receive an operator, total, clear, del, number
        // Third input(number-decimal-number) Following a number-decimal-number, receive an operator, total, clear, del, number

        // 1.1-- Subtract, Add, Number, Decimal,
        
        // 2.1-- Number-number, Number-decimal, Number-operator, Number-total,
        // 2.2-- Subtract-number, subtract-decimal
        // 2.3-- Add-number, Add-decimal,
        // 2.4-- Decimal-number, 
        
        // 3.1-- Number-number-decimal, Number-decimal-number, Number-operator-number,
        // 3.2-- Sub-num-2.1, Sub-dec-2.4
        // 3.3-- Add-num-2.1, Add-dec-2.4

        // 4.1-- Num-num-dec-num, Num-dec-num-op, Num-op-num-2.4
        
        
        
        
        
        
        // Input Scenarios:

        // Possible inputs:
        // a. Number
        // b. Operator
        // c. Decimal
        // d. Total
        // e. Del
        // f. Clear
        // ?. Nothing input

        // a. Numbers:
        // Number aft Nothing
        // Number aft Number
        // Number aft Operator
        // Number aft Decimal
        // Number aft Total

        // b. Operators
        // Operator aft Nothing
        // Operator aft Operator
        // Operator aft Number
        // Operator aft Decimal
        // Operator aft Total
   
        // c. Decimal
        // Decimal aft Nothing
        // Decimal aft Decimal
        // Decimal aft Number
        // Decimal aft Operator
        // Decimal aft Total
        
        // d. Total
        // Total aft Nothing
        // Total aft Total
        // Total aft Number
        // Total aft Operator
        // Total aft Decimal
    },
}

// Process output

listeners.setListener();