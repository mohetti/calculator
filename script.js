// declaring variables to store number/operators, result and innerHTML
let operator;
let result;
let resultWindow = document.getElementById("result");
let ansWindow = document.getElementById("ans");
let firstInput = [];
let secondInput = [];

// add function
let add = function add(args) {
    let add = args.reduce((acc, curr) => Number(acc) + Number(curr));
    result = add;
    resultWindow.innerText = add;
};

// subtract function
let sub = function sub(args) {
    let sub = args.reduce((acc, curr) => acc - curr);
    result = sub;
    resultWindow.innerText = sub;
};

// multiply function
let mult = function mult(args) {
    let mult = args.reduce((acc, curr) => acc * curr);
    result = mult;
    resultWindow.innerText = mult;
};

// divide function
let div = function div(args) {
    let div = ((args[1] === "0") ? "42" : args[0] / args [1]);
    result = div;
    resultWindow.innerText = div;
};

// transfers the numbers as html to the second screen
let numberFunction = function numberFunction(htmlValue) {
    if (result !== "") {
        result = "";
        return resultWindow.innerText = htmlValue;
    } else if(result === "") {
        return resultWindow.innerText += htmlValue;
    }
};



// transfers the operator as html to the second screen and store operater in global variable
let operatorFunction = function operatorFunction(htmlValue) {
    let containerOps = Array.from(resultWindow.innerText);

    let multipleOps = function multiplOps(input) {
        if (input === "+" || input === "*" || input === "/" || 
            String(resultWindow.innerText.slice(-1)) === "-" || resultWindow.innerText.indexOf("-", 1) > 0) {
            return true; 
        } else if (input === "-") {
            if (String(resultWindow.innerText.slice(-1)) === "-") {
            return true;
        } else {
            return false;
        };
        };
    };

    let decimalCheck = function decimalCheck() {
        return resultWindow.innerText.slice(-1) === "." ? true :  false;
    }


    if (resultWindow.innerText === "" && htmlValue === "-") {
        operator = "";
        result = "";
        return resultWindow.innerText = htmlValue;
    } else if (resultWindow.innerText !== "") {
            switch (htmlValue) {
                case "+":
                    if (containerOps.some(multipleOps) === true || decimalCheck() === true) {
                        return;
                    } else {
                        operator = htmlValue;
                        result = "";
                        resultWindow.innerText += htmlValue;
                    }
                    break;

                case "*":
                    if (containerOps.some(multipleOps) === true || decimalCheck() === true) {
                        return;
                    } else {
                        operator = htmlValue;
                        result = "";
                        resultWindow.innerText += htmlValue;
                    }
                    break;

                case "/":
                    if (containerOps.some(multipleOps) === true || decimalCheck() === true) {
                        return;
                    } else {
                        operator = htmlValue;
                        result = "";
                        resultWindow.innerText += htmlValue;
                    }
                    break;

                case "-":
                    if (result === "") {
                    if (containerOps.some(multipleOps) === true || decimalCheck() === true) {
                       return;
                    } else if (resultWindow.innerText.indexOf("-", 1) === -1) {
                        operator = htmlValue;
                        result = "";
                        resultWindow.innerText += htmlValue;
                    } else if (resultWindow.innerText.indexOf("-", 1) > 0) {
                        return;
                    }
                    } else if (result !== "") {
                        operator = htmlValue;
                        result = "";
                        resultWindow.innerText += htmlValue;
                    }
                }

            
        }
};

// invoke equals-function
let equalResult = function equalResult() {
    let operandArray = resultWindow.innerText.split(operator);
    if (operandArray.length >= 2 && operandArray[1] !== "") {
        ansWindow.innerText = resultWindow.innerText + " =";
        switch (operator) {
                case "+":
                    add(operandArray);
                    break;
                case "/":
                    div(operandArray);
                    break;
                case "*":
                mult(operandArray);
                    break; 
                case "-":
                    sub(operandArray);
                    break;
        }
    } 
};

// Clear-Button function
let clearFunction = function clearFunction() {
    resultWindow.innerText = "";
    ansWindow.innerText = "";
    result = "";
    operator = "";
}

let delFunction = function delFunction() {
    let container = resultWindow.innerText.slice(0, -1);
    return resultWindow.innerText = container;;
}

let decimalFunction = function decimalFunction() {
    let container = resultWindow.innerText.split("");
    let multipleDecimals = function mutlipleDecimals() {
        if (container.indexOf(".") !== -1) {
            if (container.slice(container.indexOf("+")).indexOf(".") !== -1 ||
            container.slice(container.indexOf("-")).indexOf(".") !== -1 ||
            container.slice(container.indexOf("*")).indexOf(".") !== -1 ||
            container.slice(container.indexOf("/")).indexOf(".") !== -1) {
                return true;
            } else {
                return false;
            }

// hier geht es weiter: Was noch nicht funktioniert:
// multiple Punkte sind möglich vor dem Operator (entweder hier oder weiter unten der Fehler)
// außerdem: -Zahl steht im Komflikt mit oberem if Statement
        } else if (container.indexOf("+") === -1 && container.indexOf(".") !== -1) {
            return true;
        } else {
            return false;
        }
    }

    if (resultWindow.innerText === "") {
        return;
    } else if (resultWindow.innerText.slice(-1) === "." || resultWindow.innerText.slice(-1) === "-" ||
    resultWindow.innerText.slice(-1) === "+" || resultWindow.innerText.slice(-1) === "*" ||
    resultWindow.innerText.slice(-1) === "/") {
        return;
    } else if (container.some(multipleDecimals) === true) {
        return;
    } else {
        return resultWindow.innerText += ".";
    }
}

// rules for the different button-click eventlisteners based on classes
let input = function input(e) {
    if (e.target.className === "number") {
        numberFunction(e.target.innerText);
    } else if (e.target.className === "operator") {
        operatorFunction(e.target.innerText);
    } else if (e.target.className === "equals") {
        equalResult();
    } else if (e.target.className === "clear") {
        clearFunction();
    } else if (e.target.className === "del") {
        delFunction();
    } else if (e.target.className === "decimal") {
        decimalFunction();
    };
};

// Eventlistener for buttons
let buttons = document.querySelectorAll("button");
buttons.forEach(onClick => onClick.addEventListener("click", input));

