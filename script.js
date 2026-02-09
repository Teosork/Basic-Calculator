const buttons = document.querySelector('#buttons');
const display = document.querySelector('#display');
const previousDisplay = document.querySelector('#previous-display');


let currentValue ='0';
let previousValue = null;
let currentOperator = null;

// Main click handler (delegation for all buttons)
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
    resizeDisplay();
});

// Full keyboard support (numpad + Enter/Esc/Backspace)
document.addEventListener('keydown', (e) => {
    const key = e.key;
    
    // Numbers + decimal
    if (/[0-9.]/.test(key)) {
        handleNumber(key);
        display.textContent = currentValue;
        resizeDisplay();
        return;
    }
    
    if ('+-*/%'.includes(key)) {
        handleOperator(key);
        return;
    }
    
    if (key === 'Enter' || key === '=') {
        handleAction('calculate');
    } else if (key === 'Escape' || key === 'Delete') {
        handleAction('clear');
    } else if (key === 'Backspace') {
        handleAction('backspace');
    }
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

function handleOperator(operator){
    previousValue = Number(currentValue);
    previousDisplay.textContent = `${previousValue} ${operator}`;
    currentValue = '0';
    currentOperator = operator;
}

function handleAction(action){
    if (action === 'clear') {
    currentValue = '0';
    previousValue = null; 
    currentOperator = null;  
    previousDisplay.textContent = '';
    display.textContent = currentValue;
    resizeDisplay(); 
    } else if (action === 'backspace'){
    currentValue = currentValue.slice(0, -1);
        if (currentValue === '' || currentValue === '-') {
        currentValue = '0';
        } 
    } else if (action === 'toggle-sign'){
        if (currentValue === '0') return;
        if (currentValue.startsWith('-')){
        currentValue = currentValue.slice(1); 
        } else {
        currentValue = '-' + currentValue;
        }
    } else if (action === 'calculate') {
        const result = operate(currentOperator, previousValue, Number(currentValue));
        currentValue = String(result);
        previousValue = null;
        currentOperator = null;
        display.textContent = currentValue;
        resizeDisplay(); 
    }
}
// Resize font for long numbers (prevents overflow)
function resizeDisplay() {
  const display = document.getElementById('display');
  const text = display.textContent;
  
  let fontSize = 2.8;
  if (text.length > 10) fontSize = 2.2;
  if (text.length > 15) fontSize = 1.6;
  
  display.style.fontSize = fontSize + 'rem';
}

function operate(operator, a, b){
    if (operator === "+") return a + b;
    if (operator === "-") return a - b;
    if (operator === "*") return a * b;
    if (operator === "/") {
        if (b === 0) return NaN;
        return a / b;
    }
    if (operator === "%") return a % b;
}