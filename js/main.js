// TODO: 
// - prettify app

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
let operation = undefined;
// let rounded = false;

function updateNumEntered(entry) {
    if (numEntered.includes('.')) {
        if (entry === '.') {
            return;
        }
    } else {
        if (numEntered.length > 7) {
            return;
        }
    };
    numEntered.push(entry);
};

function convertToNumString(numArr) {
    // create display function to show the numbers entered in the viewport
    if (numArr.length > 0) {
        let numString = numArr.reduce((cumul, next) => cumul + next);
        return numString;
    } else {
        return false;
    };
};

function round(numString) {
    if ((numString.length > 8) && (numString.includes('.'))) {
        let idx = numString.indexOf('.');
        let num = parseFloat(numString).toFixed(8 - idx);
        return `${num}`;
    };
    return numString;
};

function updateViewport(numString) {
    if (numString === false) {
        // for divide by zero error
        calViewport.textContent = 'ERROR';
    } else {
        calViewport.textContent = round(numString);
    };
};

function clearNum() {
    numEntered = [];
    initialNum = 0;
    operation = undefined;
    // rounded = false;
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
    if (operation === undefined) {
        operation = add;
    };

    let secNum = Number(convertToNumString(secNumArr));
    let calcResult = operation(initialNum, secNum);

    clearNum();

    return calcResult;
};

function clearOpsKeyHighlights() {
    opsKeys.forEach((opsKey) => {
        opsKey.classList.remove('highlight');
    });
};

// 3. EVENT LISTNERS

// 3.1. LOGICAL EVENT LISTNERS

numpadKeys.forEach((numKey) => {
    numKey.addEventListener('click', (e) => {
        let num = e.target.getAttribute('data-value');
        updateNumEntered(num);
        let numString = convertToNumString(numEntered);
        updateViewport(numString);
    });
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
    clearOpsKeyHighlights();
    updateViewport(initialNum.toString());
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
        updateViewport(initialNum.toString());
    })
})

enterKey.addEventListener('click', () => {
    initialNum = calculate(initialNum, numEntered, operation);
    clearOpsKeyHighlights();
    updateViewport(initialNum.toString());
})

// 3.2. AESTHETICAL EVENT LISTNERS

calKeys.forEach((calKey) => {
    // TODO: ops keys should remain highlighted until CLEAR, another ops key is pressed, or RETURNED
    calKey.addEventListener('mousedown', (e) => {
        calKey.classList.add('active');
    });
    calKey.addEventListener('mouseup', (e) => {
        calKey.classList.remove('active');
    });
});

opsKeys.forEach((opsKey) => {
    opsKey.addEventListener('mousedown', (e) => {
        clearOpsKeyHighlights();
        opsKey.classList.add('highlight');
    });
});

// test keyboard event listner
let ordCode;

document.addEventListener('keydown', (e) => {
    // TODO: add button pop effect buttons other than numbers
    let name = e.key;
    let code = e.code;
    ordCode = name.charCodeAt(0);
    console.log(`${name}:${code}`)

    if (Number(name) >= 0 && Number(name) <= 9) {
        let key = document.querySelector(`.cal-key[data-value="${name}"]`);
        key.classList.add('active');
        updateNumEntered(name);
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
        clearOpsKeyHighlights();
        clearNum();
        updateViewport(initialNum.toString());
    };

    if (code === 'Backspace') {
        backspace();
        let numString = convertToNumString(numEntered);
        updateViewport(numString);
    };

    if (code === 'Enter') {
        initialNum = calculate(initialNum, numEntered, operation);
        clearOpsKeyHighlights();
        updateViewport(initialNum.toString());
    };

    if (['+', '-', '*', '/'].includes(name)) {
        initialNum = calculate(initialNum, numEntered, operation);
        operation = ops[name];
        let elem = document.querySelector(`.cal-opskey[data-value="${name}"]`);
        clearOpsKeyHighlights();
        elem.classList.add('highlight');
        updateViewport(initialNum.toString());
    };
})

document.addEventListener('keyup', (e) => {
    let name = e.key;
    let key = document.querySelector(`.cal-key[data-value="${name}"]`);

    if (key) {
        key.classList.remove('active');
    };
})