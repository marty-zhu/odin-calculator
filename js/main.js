// separate number keys and operations keys
const numpadKeys = document.querySelectorAll(".cal-numkey");
const opsKeys = document.querySelectorAll(".cal-opskey");
const decimalKey = document.querySelector("li#num-deci");

// isolate the clear key and equals key
const enterKey = document.querySelector("div#cal-exec");
const clearKey = document.querySelector("div#cal-clear");

const calViewport = document.querySelector("div#cal-viewport");

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
        calViewport.textContent = 0;
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

function calculate(firstNum, secNum, func) {
    if (func === null) {
        func = add;
    };
    return func(firstNum, secNum);
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
    clearNum(numEntered);
    updateViewport(false);
});

opsKeys.forEach((opsKey) => {
    opsKey.addEventListener('click', (e) => {
        operation = ops[e.target.getAttribute('data-op')];
        // console.log(operation);
        let result = operation(initialNum, Number(convertToNumString(numEntered)));
        initialNum = result;
        updateViewport(initialNum);
    })
})