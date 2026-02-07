const buttons = document.querySelector('#buttons');
const display = document.querySelector('#display');

let currentValue ='0';
let previousValue = null;
let currentOperator = null;

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

function handleNumber(number) {
    if (currentValue === '0' && number !== '.'){
            currentValue = number;
    }else if (number === '.' && !currentValue.includes('.')){
        currentValue += number;
    }else if (number !== '.') {
        currentValue += number;
    }
}

// function handleOperator(operator){
//     previousValue = Number(currentValue);
//     currentValue = '0';
//     currentOperator = operator;
// }

function handleAction(action){
    if (action === 'clear') {
    currentValue = '0';
    } else if (action === 'backspace'){
    currentValue = currentValue.slice(0, -1);
        if (currentValue === '' || currentValue === '-') {     // if empty after backspace
        currentValue = '0';
        } 
    } else if (action === 'toggle-sign'){
        if (currentValue === '0') return;
        if (currentValue.startsWith('-')){
        currentValue = currentValue.slice(1); 
        } else {
        currentValue = '-' + currentValue;
        }
    }
}