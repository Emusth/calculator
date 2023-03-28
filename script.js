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
    userInput: '',
    convertInput: function(input, source) {
        let conIn;
        if(source === 'key') {
            if(!(Number(input) || Number(input) === 0)) {
                const loIn = input.toLowerCase();
                loIn === 'enter' ? conIn = 'total' : 
                loIn === 'clear' ? conIn = 'clear' :
                loIn === '=' ? conIn = 'total' :
                loIn === 'delete' ? conIn = 'delete' :
                loIn === 'backspace' ? conIn = 'delete' :
                loIn === '+' ? conIn = 'add' :
                loIn === '-' ? conIn = 'subtract' :
                loIn === '*' ? conIn = 'multiply' :
                loIn === '/' ? conIn = 'divide' :
                loIn === '.' ? conIn = '.' : 'hm';
            } 
        }else {
            conIn = input;
        }
        this.userInput = conIn;
        this.determineOutput();
    },
    determineOutput: function() {
        console.log('determine: ', this.userInput);
    }
}

// Process output

listeners.setListener();