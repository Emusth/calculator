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

    convertInput: function(input, source) {
        // Determine if it needs to be converted or not

        // Need to convert input that say 'enter' '=' 'clear' 'backspace'

        // Need to disallow any other non-number inputs other than / * - +

        // Need to allow any number inputs 0 1 2 3 4 5 6 7 8 9
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

        console.log('conv inp: ', convertedInput);

        // if(convertedInput !== undefined && convertedInput !== ' ') {
        //         this.setInputs(convertedInput);
        // } else {
        //     return;
        // }
    },

    setInputs: function(input) {
        this.previousInput = (this.currentInput ? this.currentInput : '');
        this.currentInput = input;
        this.setInputType();
    },

    setInputType: function() {
        const curIn = this.currentInput;
        const prevIn = this.previousInput;
        console.log(`curIn: ${curIn} prevIn: ${prevIn}`);
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

        if(Number(curIn)) {
            this.previousInputType = prevIn ? curIn : '';
        } else if (curIn === '.') {
            this.previousInputType = prevIn ? curIn : '';
        } else if (curIn === '+' || curIn === '-' || curIn === '*' || curIn === '/') {
            this.previousInputType = prevIn ? curIn : '';
        } else {
            this.previousInputType = prevIn ? curIn : '';
        }
    },
}

// Process output

listeners.setListener();