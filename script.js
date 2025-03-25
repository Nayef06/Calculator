const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let resultDisplayed = false;

display.setAttribute("autocomplete", "off");

window.onload = () => {
    display.focus();
};

display.addEventListener("input", (e) => {
    display.value = display.value.replace(/[^0-9+\-*/().÷×%=]/g, '');
});

buttons.forEach(button => {
    button.addEventListener('click', () => {
        handleButtonClick(button.innerText);
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleButtonClick('=');
    }
});

function handleButtonClick(value) {
    if (resultDisplayed) {
        display.value = '';
        resultDisplayed = false;
    }

    if (value === 'C') {
        display.value = '';
    } else if (value === '=') {
        try {
            let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
            let result = eval(expression);
            display.value += `=${result}`;
            resultDisplayed = true;
        } catch {
            display.value = 'Error';
            resultDisplayed = true;
        }
    } else if (value === '+/-') {
        let expression = display.value.trim();
        let match = expression.match(/([-]?\d+(\.\d+)?)(?!.*\d)/);

        if (match) {
            let number = match[0];
            let toggledNumber = number.startsWith('-') ? number.substring(1) : '-' + number;
            display.value = expression.slice(0, match.index) + toggledNumber;
        }
    } else if (value === '%') {
        let expression = display.value.trim();
        let match = expression.match(/(\d+(\.\d+)?)(?!.*\d)/);

        if (match) {
            let number = parseFloat(match[0]);
            let percentValue = number / 100;
            display.value = expression.slice(0, match.index) + percentValue;
        }
    } else {
        display.value += value;
    }

    display.scrollLeft = display.scrollWidth;
}