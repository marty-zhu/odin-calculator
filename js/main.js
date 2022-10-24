const calKeys = document.querySelectorAll(".cal-key");
const calViewport = document.querySelector("div#cal-viewport");

calKeys.forEach((calKey) => {
    calKey.addEventListener('click', (e) => {
        calViewport.textContent = e.target.textContent;
    });
})