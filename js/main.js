const calKeys = document.querySelectorAll(".cal-key");

calKeys.forEach((calKey) => {
    calKey.addEventListener('click', (e) => console.log(`${e.target.textContent}`));
})