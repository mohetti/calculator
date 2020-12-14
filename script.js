// declaring variables
let operator = "";
let result = "";
let ans = "";
let ansWindow = document.getElementById("ans");
let resultWindow = document.getElementById("result");
let separator = "#";
let divideZero = false;
// let indexSep = ans.indexOf("#");

// numberFunction
let numberFunction = function numberFunction(args) {
    if (divideZero === true) {
        return resultWindow.innerText = args,
                ans = args,
                divideZero = false,
                result = "";
    }
    if (result === "") {
        return resultWindow.innerText += args, 
                ans += args;
    } else if (result !== "" && operator === "") {
        return resultWindow.innerText = args,
                ans = args,
                result = "";
    } else if (result !== "" && ans.charAt(ans.length-1) === "#") {
        return result = "",
                ans += args,
                resultWindow.innerText += args;
    }
};
// operatorFunction
let operatorFunction = function operatorFunction(args) {
    if (divideZero === true) {
        return;
    }
    if (args === "+" || args === "*" || args === "/") {
        if (resultWindow.innerText === "") {
            return;
        } else if (ans.indexOf("#") !== -1 || ans.charAt(ans.length-1) === "." ||
                    ans.charAt(ans.length-1) === "-") {
            return;
        } else if (ans.indexOf("#") === -1) {
            return operator = args,
                    resultWindow.innerText += args,
                    ans += separator;
        }
    }
    if (args === "-") {
        if (resultWindow.innerText === "") {
            return resultWindow.innerText = args,
                    ans = args;
        } else if (ans.charAt(ans.length-1) !== "-" && ans.indexOf("#") === -1) {
            return operator = args,
                ans += separator,
                resultWindow.innerText += args;
        } else if (ans.charAt(ans.length-1) === "#") {
            return ans += args,
                    resultWindow.innerText += args;
        } else if (ans.indexOf("#") !== -1 || ans.charAt(ans.length-1) === ".") {
            return;
        }
    }
};

// calculation Function
let calculation = function calculation(input) {
    let firstValue = Number(ans.substr(0, ans.indexOf("#")));
    let secValue = Number(ans.substr(ans.indexOf("#") + 1));
    if (input === "+") {
        return firstValue + secValue;
    } else if (input === "-") {
        return firstValue - secValue;
    } else if (input === "*") {
        return firstValue * secValue;
    } else if (input === "/") {
        if (secValue === 0 || secValue === -0) {
            divideZero = true;
            return 42;
        } else {
        return firstValue / secValue;
    }
    };
};

// equalFunction
let equalFunction = function equalFunction() {
    if (operator === "" || ans.charAt(ans.length-1) === "#") {
        return;
    } else {
        result = calculation(operator)
        return ansWindow.innerText = resultWindow.innerText + " =", 
        resultWindow.innerText = result, 
        ans = String(result),
        operator = "";

    }
};

// cleaFunction
let clearFunction = function clearFunction() {
    return resultWindow.innerText = "", ansWindow.innerText = "", operator = "", result = "", ans = "";

};

// deleteFunction
let deleteFunction = function deleteFunction() {
    if (ans.charAt(ans.length-1) !== "#") {
        return ans = ans.slice(0, -1),
        resultWindow.innerText = resultWindow.innerText.slice(0, -1);
    } else if (ans.charAt(ans.length-1) === "#") {
        return ans = ans.slice(0, -1),
        resultWindow.innerText = resultWindow.innerText.slice(0, -1),
        operator = "";
    }
};

// decimalFunction
let decimalFunction = function decimalFunction(dec) {
    let secValueDecCheck = ans.substr(ans.indexOf("#")+1);
    if (ans === "" || ans.charAt(ans.length-1) === "#" || ans.charAt(ans.length-1) === "-") {
        return;
    } else if (ans !== "" && ans.indexOf("#") === -1 && ans.indexOf(".") === -1) {
        return ans += dec, resultWindow.innerText += dec;
    } else if (ans.indexOf("#") !== -1 && secValueDecCheck.indexOf(".") === -1) {
        return ans += dec, resultWindow.innerText += dec;
    } else {
        return;
    }
};

// rules for the different button-click eventlisteners based on classes
let inputUser = function inputUser(e) {
    let inputClass = e.target.className;
    let input = e.target.innerText;
    switch (inputClass) {
        case ("number"):
            numberFunction(input);
            break;
        case ("operator"):
            operatorFunction(input);
            break;
        case ("equals"):
            equalFunction();
            break;
        case ("clear"):
            clearFunction();
            break;
        case ("del"):
            deleteFunction();
            break;
        case ("decimal"):
            decimalFunction(input);
            break;
    }
};

// Eventlistener for buttons
let buttons = document.querySelectorAll("button");
buttons.forEach(onClick => onClick.addEventListener("click", inputUser));

