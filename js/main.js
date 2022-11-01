// TODO: add BACKSPACE capability
// TODO: add keyboard support

// all calculator keys
const calKeys = document.querySelectorAll(".cal-key");

// separate number keys and operations keys
const numpadKeys = document.querySelectorAll(".cal-numkey");
const opsKeys = document.querySelectorAll(".cal-opskey");
const decimalKey = document.querySelector("li#num-deci");

// isolate the clear key and equals key
const enterKey = document.querySelector("div#cal-exec");
const clearKey = document.querySelector("div#cal-clear");

const calViewport = document.querySelector("div#cal-viewport");

// CALCULATOR LOGIC

// create variable to store numbers, one digit at a time
let initialNum = 0;
let numEntered = new Array();
let operation = null;

// create display function to show the numbers entered in the viewport
function convertToNumString(numArr) {
    if (numArr.length > 0) {
        let numString = numArr.reduce((cumul, next) => cumul + next);
        return numString;
    } else {
        return false;
    };
};

function updateViewport(numString) {
    if (numString === false) {
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

// when an ops key is pressed, convert the stored numbers to one numerical variable, conclude previous calculations
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
    // console.log(operation);

    let secNum = Number(convertToNumString(secNumArr));
    let calcResult = operation(initialNum, secNum);

    clearNum();

    return calcResult;
}

// display the entered number or calculation result
// if the "=" key is pressed, conclude calculations and display result
// if the "CLEAR" key is pressed, clear all variables

// event listener for general numpad keys
numpadKeys.forEach((numKey) => {
    numKey.addEventListener('click', (e) => {
        numEntered.push(e.target.getAttribute('data-value'));
        let numString = convertToNumString(numEntered);
        updateViewport(numString);
    });
});

// event listener for decimal key with checks
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

opsKeys.forEach((opsKey) => {
    opsKey.addEventListener('click', (e) => {
        // console.log(initialNum);
        // console.log(operation);
        initialNum = calculate(initialNum, numEntered, operation);
        operation = ops[e.target.getAttribute('data-op')];
        // console.log(operation);
        // console.log(initialNum);
        updateViewport(initialNum);
    })
})

enterKey.addEventListener('click', () => {
    initialNum = calculate(initialNum, numEntered, operation);
    updateViewport(initialNum);
})

// CALCULATOR AESTHETICS

calKeys.forEach((calKey) => {
    calKey.addEventListener('mousedown', (e) => {
        calKey.classList.add('active');
    });
    calKey.addEventListener('mouseup', (e) => {
        calKey.classList.remove('active');
    });
})