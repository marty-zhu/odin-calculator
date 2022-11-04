// TODO: add overflow rounding (max width 8 chars)

// 0. DOM OBJECTS

// all calculator keys
const calKeys = document.querySelectorAll(".cal-key");

// separate number keys and operations keys
const numpadKeys = document.querySelectorAll(".cal-numkey");
const opsKeys = document.querySelectorAll(".cal-opskey");
const decimalKey = document.querySelector("li#num-deci");
const bkspKey = document.querySelector("div#cal-bksp")

// isolate the clear key and equals key
const enterKey = document.querySelector("div#cal-exec");
const clearKey = document.querySelector("div#cal-clear");

const calViewport = document.querySelector("div#cal-viewport");

// 1. CALCULATOR LOGICAL VARIABLES AND FUNCTIONS

// create variable to store numbers, one digit at a time
let initialNum = 0;
let numEntered = new Array();
let operation = null;

function convertToNumString(numArr) {
    // create display function to show the numbers entered in the viewport
    if (numArr.length > 0) {
        let numString = numArr.reduce((cumul, next) => cumul + next);
        return numString;
    } else {
        return false;
    };
};

function updateViewport(numString) {
    if (numString === false) {
        // for divide by zero error
        calViewport.textContent = 'ERROR';
    } else {
        calViewport.textContent = numString;
    };
};

function clearNum() {
    numEntered = [];
    initialNum = 0;
    operation = null;
};

function backspace() {
    numEntered.pop();
};

// calculation functions
function add(a, b) {
    return a + b;
};

function subtract(a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    if (b === 0) {
        return false;
    } else {
        return a / b;
    };
};

const ops = {
    '+': add,
    '-': subtract,
    '*': multiply,
    '/': divide,
};

function calculate(initialNum, secNumArr, operation) {
    if (operation === null) {
        operation = add;
    };

    let secNum = Number(convertToNumString(secNumArr));
    let calcResult = operation(initialNum, secNum);

    clearNum();

    return calcResult;
}

// 3. EVENT LISTNERS

// 3.1. LOGICAL EVENT LISTNERS

numpadKeys.forEach((numKey) => {
    numKey.addEventListener('click', (e) => {
        numEntered.push(e.target.getAttribute('data-value'));
        let numString = convertToNumString(numEntered);
        updateViewport(numString);
    });
    // numKey.addEventListener('keydown', (e) => {
    //     if (e.code == `Digit${numKey.getAttribute('data-value')}`) {
    //         console.log(numKey.getAttribute('data-value'));
    //         numEntered.push(numKey.getAttribute('data-value'));
    //         let numString = convertToNumString(numEntered);
    //         updateViewport(numString);
    //     };
    // });
});

decimalKey.addEventListener('click', (e) => {
    // check to see if there already is a decimal
    if (!numEntered.includes('.')) {
        numEntered.push(e.target.getAttribute('data-value'));
        let numString = convertToNumString(numEntered);
        updateViewport(numString);
    };
});

clearKey.addEventListener('click', () => {
    clearNum();
    updateViewport(initialNum);
});

bkspKey.addEventListener('click', () => {
    backspace();
    let numString = convertToNumString(numEntered);
    updateViewport(numString);
});

opsKeys.forEach((opsKey) => {
    opsKey.addEventListener('click', (e) => {
        initialNum = calculate(initialNum, numEntered, operation);
        operation = ops[e.target.getAttribute('data-value')];
        updateViewport(initialNum);
    })
})

enterKey.addEventListener('click', () => {
    initialNum = calculate(initialNum, numEntered, operation);
    updateViewport(initialNum);
})

// 3.2. AESTHETICAL EVENT LISTNERS

calKeys.forEach((calKey) => {
    calKey.addEventListener('mousedown', (e) => {
        calKey.classList.add('active');
    });
    calKey.addEventListener('mouseup', (e) => {
        calKey.classList.remove('active');
    });
})

// test keyboard event listner
document.addEventListener('keydown', (e) => {
    let name = e.key;
    let code = e.code;
    let ordCode = name.charCodeAt(0);

    if (Number(name) >= 0 && Number(name) <= 9) {
        numEntered.push(name);
        let numString = convertToNumString(numEntered);
        updateViewport(numString);
    };

    if (name === '.') {
        // check to see if there already is a decimal
        if (!numEntered.includes('.')) {
            numEntered.push(name);
            let numString = convertToNumString(numEntered);
            updateViewport(numString);
        };
    }

    if (code === 'KeyC') {
        clearNum();
        updateViewport(initialNum);
    };

    if (code === 'Backspace') {
        backspace();
        let numString = convertToNumString(numEntered);
        updateViewport(numString);
    };

    if (code === 'Enter') {
        initialNum = calculate(initialNum, numEntered, operation);
        updateViewport(initialNum);
    };

    if (['+', '-', '*', '/'].includes(name)) {
        initialNum = calculate(initialNum, numEntered, operation);
        operation = ops[name];
        updateViewport(initialNum);
    };
})