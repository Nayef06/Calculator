document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelector('.buttons');
    let evaluated = false;

    buttons.addEventListener('click', (event) => {
        const target = event.target;

        if (!target.matches('button')) return;

        if (display.value.startsWith('Still Error')) {
            if (target.textContent !== '=') {
                display.value = '';
            } else {
                display.value += '.';
                return;
            }
        } else if (display.value === 'Error') {
            display.value = 'Still Error';
            return;
        }

        if (evaluated && (target.classList.contains('number') || target.classList.contains('decimal'))) {
            display.value = '';
            evaluated = false;
        } else if (evaluated && target.classList.contains('operator')) {
            evaluated = false;
        }

        if (target.classList.contains('number') || target.classList.contains('decimal')) {
            display.value += target.textContent;
        } else if (target.classList.contains('operator')) {
            const operator = target.textContent;
            if (operator === '=') {
                evaluateExpression();
            } else if (operator === '÷') {
                display.value += '/';
            } else if (operator === '×') {
                display.value += '*';
            } else {
                display.value += operator;
            }
        } else if (target.classList.contains('clear')) {
            display.value = '';
        } else if (target.classList.contains('plus-minus')) {
            toggleSign();
        } else if (target.classList.contains('percent')) {
            percentage();
        }
    });

    display.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            evaluateExpression();
        } else if (display.value.startsWith('Still Error')) {
            display.value = '';
        }
    });

    function evaluateExpression() {
        try {
            const result = eval(display.value);
            display.value = result;
            evaluated = true;
        } catch {
            display.value = 'Error';
            evaluated = true;
        }
    }

    function toggleSign() {
        if (display.value.charAt(0) === '-') {
            display.value = display.value.slice(1);
        } else {
            display.value = '-' + display.value;
        }
    }

    function percentage() {
        try {
            display.value = eval(display.value) / 100;
        } catch {
            display.value = 'Error';
        }
    }
});
