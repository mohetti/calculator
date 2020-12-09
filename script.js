// add function
let add = function add(n, p) {
    return n + p;
};

// subtract function
let sub = function sub(n, p) {
    return n - p;
};

// multiply function
let mult = function mult(n, p) {
    return n * p;
};

// divide function
let div = function div(n, p) {
    return (p === 0 ? alert("42") : n / p);
};

// highest-order function for the eventlistener
let input = function input() {
    return alert("bonjour");
};

// Eventlistener for buttons
let buttons = document.querySelectorAll("button");
buttons.forEach(onClick => onClick.addEventListener("click", input));

