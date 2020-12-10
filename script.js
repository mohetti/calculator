// declaring variables to store number/operators, result and innerHTML
let operator;
let result;
let resultWindow = document.getElementById("result");
let ansWindow = document.getElementById("ans");

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
let numberTransfer = function numberTransfer(htmlValue) {
    if (result !== "") {
        result = "";
        return resultWindow.innerText = htmlValue;
    } else if(result === "") {
        result = "";
        return resultWindow.innerText += htmlValue;
    }
    
    //return resultWindow.innerText += htmlValue;
};



// transfers the operator as html to the second screen and store operater in global variable
let operatorTransfer = function operatorTransfer(htmlValue) {

    let multipleOps = function multiplOps(input) {
        if (input === "+" || input === "-" || input === "*" || input === "/") {
        return true; 
    } else {
        return false;
    };
    };

    let containerOps = Array.from(resultWindow.innerText);
     /* im if statement kann das mit der ersten minus rein - dran denken dass result auf "" gesetzt wird
     bei multipleOps muss - raus und in eine extra Funktion mit || rein
     minus Funktion checkt, ob nur die drei minusse drin sind: 1. - muss zahl folgen, 2. zahl oder -, 3. zahl
     operandArray muss anders gesplittet werden im Fall von -. Nach dem ersten -*/
    if (resultWindow.innerText === "") {
        return;
    } else if (containerOps.some(multipleOps) === true) {
        return;
    } else {
        operator = htmlValue;
        result = "";
        resultWindow.innerText += htmlValue;
    };
};

// invoke equals-function
let equalResult = function equalResult() {
   
    let operandArray = resultWindow.innerText.split(operator);
    if (operandArray.length < 2 || operandArray[1] === "") {
        return;
    } else {
        ansWindow.innerText = resultWindow.innerText + " =";
        switch (operator) {
                case "-":
                    result = sub(operandArray);
                    break;
                case "+":
                    add(operandArray);
                    break;
                case "/":
                    div(operandArray);
                    break;
                case "*":
                    mult(operandArray);
                    break;
        };
    };
};

// Clear-Button function
let clearCalc = function clearCalc() {
    resultWindow.innerText = "";
    ansWindow.innerText = "";
    result = "";
    operator = "";
}

// rules for the different button-click eventlisteners based on classes
let input = function input(e) {
    if (e.target.className === "number") {
        numberTransfer(e.target.innerText);
    } else if (e.target.className === "operator") {
        operatorTransfer(e.target.innerText);
    } else if (e.target.className === "equals") {
        equalResult();
    } else if (e.target.className === "clear") {
        clearCalc();
    } else {
        return alert("Bonjour!");
    };
};

// Eventlistener for buttons
let buttons = document.querySelectorAll("button");
buttons.forEach(onClick => onClick.addEventListener("click", input));

