let prevNum = "";
let currentNum = "";
let operator = "";
let overall = "";

function addToCurrentNum(input) {
    if (currentNum === "0" || currentNum === 0) {
        currentNum = input;
    } else {
        currentNum += input;
    }
    updateDisplay();
}

function saveNum() {
    prevNum = currentNum;
    updateAdditionalDisplay(currentNum + " ");
    currentNum = "";
    updateDisplay();

}

function saveOperator(input) {
    if (prevNum === "" || currentNum !== "") {
        saveNum(); // Save the current number before updating the operator
    }

    // Update the operator regardless of its current state
    operator = input;
    updateAdditionalDisplay(input);
}


function compute() {
    if (prevNum !== "" && currentNum !== "" && prevNum !== 0 && currentNum !== 0) {
        updateAdditionalDisplay(currentNum);
        switch (operator) {
            case '+':
                add();
                break;
            case '-':
                subtract();
                break;
            case '*':
                multiply();
                break;
            case '/':
                divide();
                break;
        }
        updateDisplay()
        overall = "";
        updateAdditionalDisplay("");
    }
}

function formatDecimal(number) {
    if (!Number.isInteger(number)) {
        // It's a decimal, so format it
        return Number(number.toFixed(2)); // Adjust the number of decimal places as needed
    }
    return number; // Return the number as is if it's an integer
}

function add() {
    currentNum = formatDecimal(parseFloat(prevNum) + parseFloat(currentNum)) + "";
}

function subtract() {
    currentNum = formatDecimal(parseFloat(prevNum) - parseFloat(currentNum)) + "";
}

function multiply() {
    currentNum = formatDecimal(parseFloat(prevNum) * parseFloat(currentNum)) + "";
}

function divide() {
    currentNum = formatDecimal(parseFloat(prevNum) / parseFloat(currentNum)) + "";
}

function clearCalculator() {
    currentNum = "0";
    prevNum = "";
    operator = "";
    overall = ""

    updateDisplay();
    updateAdditionalDisplay("");
}

function deleteCalculator() {
    if (currentNum === NaN) {
        return;
    }
    if (currentNum.length > 1) {
        currentNum = currentNum.slice(0, -1);
    } else {
        currentNum = "0";
    }
    updateDisplay();
}

function updateDisplay() {
    const display = document.querySelector('#calculator-screen-main-container');
    display.textContent = currentNum;
}

function updateAdditionalDisplay(value) {
    overall += value;
    const additionalDisplay = document.querySelector('#calculator-screen-additional-container');
    additionalDisplay.textContent = overall;
}

document.addEventListener('keydown', function (event) {
    if (event.key >= '0' && event.key <= '9') {
        // Handle number keys
        addToCurrentNum(event.key);
    } else if (event.key === 'Enter') {
        // Handle Enter key for compute
        compute();
    } else if (event.key === 'Backspace') {
        // Handle Backspace key for delete
        deleteCalculator();
    } else if (event.key === 'Escape') {
        // Handle Escape key for clear
        clearCalculator();
    } else if (event.key === '+') {
        // Handle Plus key
        saveNum();
        saveOperator('+');
    } else if (event.key === '-') {
        // Handle Minus key
        saveNum();
        saveOperator('-');
    } else if (event.key === '*') {
        // Handle Asterisk key for multiplication
        saveNum();
        saveOperator('*');
    } else if (event.key === '/') {
        // Handle Slash key for division
        saveNum();
        saveOperator('/');
    } else if (event.key === '.') {
        addToCurrentNum(event.key);
    }
});