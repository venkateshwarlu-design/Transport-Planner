const swapButton = document.querySelector('[data-swap]');

if (swapButton) {
  swapButton.addEventListener('click', () => {
    const fromInput = document.querySelector('#from');
    const toInput = document.querySelector('#to');
    const startingLocation = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = startingLocation;
    fromInput.focus();
  });
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
