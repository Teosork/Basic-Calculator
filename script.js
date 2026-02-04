const buttons = document.querySelector('#buttons');
const display = document.querySelector('#display');

let currentValue ='0';

buttons.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const {number, operator, action} = btn.dataset;

    if (number !== undefined) {
        handleNumber(number);
    } else if (operator !== undefined) {
        handleOperator(operator);
    } else if (action !== undefined) {
        handleAction(action);
    }

    display.textContent = currentValue;
});

function handleNumber() {}

function handleOperator(){}

function handleAction(){}