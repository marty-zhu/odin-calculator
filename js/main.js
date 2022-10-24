// separate number keys and operations keys
const numpadKeys = document.querySelectorAll(".cal-numkey");
const opsKeys = document.querySelectorAll(".cal-opskey");
// isolate the clear key and equals key
const enterKey = document.querySelector("div#cal-exec");
const clearKey = document.querySelector("div#cal-clear");

const calViewport = document.querySelector("div#cal-viewport");

// create variable to store numbers, one digit at a time
let numEntry = new Array();
// when an ops key is pressed, convert the stored numbers to one numerical variable, conclude previous calculations
// display the entered number or calculation result
// if the "=" key is pressed, conclude calculations and display result
// if the "CLEAR" key is pressed, clear all variables

numpadKeys.forEach((numKey) => {
    numKey.addEventListener('click', (e) => {
        numEntry.push(e.target.textContent);
        console.log(numEntry);
    })
})