// declaring variables
let operator = "";
let result = "";
let ans = "";
let ansWindow = document.getElementById("ans");
let resultWindow = document.getElementById("result");
let separator = "#";
let divideZero = false;
let warning = document.getElementById("warning");
let warningVal = false;
let buttons = document.querySelectorAll("button");
let max = 0


// numberFunction
let numberFunction = function numberFunction(args) {
    if (divideZero === true) {
        return resultWindow.innerText = args,
                ans = args,
                max = 1,
                divideZero = false,
                result = "";
    }
    if (result === "") {
        return resultWindow.innerText += args, 
                ans += args,
                max += 1;
    } else if (result !== "" && operator === "") {
        return resultWindow.innerText = args,
                ans = args,
                max = 1,
                result = "",
                ansWindow.innerText = "";
    } else if (result !== "" && ans.charAt(ans.length-1) === "#") {
        return result = "",
                ans += args,
                max += 1,
                resultWindow.innerText += args;
    } else if (result !== "" && operator === "-") {
        return ans += args,
                max += 1,
                resultWindow.innerText += args,
                result = "";
    } else if (result !== "" && operator !== "") {
        if (ans.charAt(ans.length-1) === "-") {
            return ans += args,
                    max += 1,
                    resultWindow.innerText += args,
                    result = "";
        } else {
            return ans += "#" + args,
                    max += 2,
                resultWindow.innerText += args,
                result = "";
    } 
    };
};
// operatorFunction
let operatorFunction = function operatorFunction(args) {
    if (divideZero === true) {
        return;
    }
    if (args === "+" || args === "*" || args === "/") {
        if (resultWindow.innerText === "") {
            return;
        } else if (ans.charAt(ans.length-1) === "#" || ans.charAt(ans.length-1) === "." ||
                ans.charAt(ans.length-1) === "-") {
            return;
        } else if (ans.indexOf("#") === -1) {
            return operator = args,
                resultWindow.innerText += args,
                ans += separator,
                max += 1;
        } else if (ans.indexOf("#") !== -1) {
            return equalFunction(),
                operator = args,
                resultWindow.innerText += args,
                ans += separator,
                max += 1;
        }        
    }
    if (args === "-") {
        if (resultWindow.innerText === "") {
            return resultWindow.innerText = args,
                ans = args,
                max = 1;
        } else if (ans.charAt(ans.length-1) !== "-" && ans.indexOf("#") === -1) {
            return operator = args,
            ans += separator,
            max += 1,
            resultWindow.innerText += args;
        } else if (ans.charAt(ans.length-1) === "#") {
            return ans += args,
                max += 1,
                resultWindow.innerText += args;
        } else if (ans.charAt(ans.length-1) === "." || resultWindow.innerText.charAt(resultWindow.innerText.length-1) === "-") {
            return;
        } else if (ans.indexOf("#") !== -1) {
            return equalFunction(),
                operator = args,
                resultWindow.innerText += args,
                ans += separator,
                ans += 1;
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
            let n = firstValue / secValue;
        return +n.toFixed(7);
    }
    };
};

// equalFunction
let equalFunction = function equalFunction() {
    if (operator === "" || ans.charAt(ans.length-1) === "#") {
        return;
    } else {
        result = calculation(operator);
        warning.innerText = "";
        return ansWindow.innerText = resultWindow.innerText + " =", 
        resultWindow.innerText = result, 
        ans = String(result),
        operator = "",
        max = ans.length;
    }
};

// cleaFunction
let clearFunction = function clearFunction() {
    return resultWindow.innerText = "", ansWindow.innerText = "", operator = "", result = "", ans = "",
            max = 0;

};

// deleteFunction
let deleteFunction = function deleteFunction() {
    max = max - 1;
    warning.innerText = "";
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
    if (max === 20) {
        warning.innerText = "You have reached the character limit."
        if (inputClass === "del") {
            deleteFunction();
        } else if (inputClass === "equals") {
            equalFunction();
        } else if (inputClass === "clear") {
            warning.innerText = "";
            clearFunction();
        } else if (inputClass === "operator" && max === 20) {
            equalFunction();
            resultWindow.innerText += input;
            operator = input;
            ans += "#";
        }
        return;
    } else if (max <= 20) {

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
}
};

// Eventlistener for buttons
buttons.forEach(onClick => onClick.addEventListener("click", inputUser));


document.addEventListener("keydown", function(e) {

if (max === 20) {
    warning.innerText = "You have reached the character limit."
    if (e.key === "Backspace") {
        deleteFunction();
    } else if (e.key === "Enter") {
        equalFunction();
    } else if (e.key === "Escape") {
        warning.innerText = "";
        clearFunction();
    } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*" && max === 20) {
        equalFunction();
        resultWindow.innerText += e.key;
        operator = e.key;
        ans += "#";
    }
    return;
}

else if(max <= 20) {
   if (isFinite(e.key) === true) {
        numberFunction(e.key);
   } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*") {
        operatorFunction(e.key);
   } else if (e.key === "Enter") {
       equalFunction();
   } else if (e.key === "Backspace") {
       deleteFunction();
   } else if (e.key === "Escape") {
       clearFunction();
   } else if (e.key === ".") {
       decimalFunction(e.key);
   }
}
});

