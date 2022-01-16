function displayText() {
    let textHTML = document.getElementById("textEntry").value;
    document.getElementById("textDisplay").innerHTML = textHTML;
}

function sumNumber(num) {
    let inputNum= parseFloat(num);
    let sum = 0;
    for ( i = 1; i <= inputNum; i += 1) {
        sum += i;
    }
    document.getElementById("sumDisplay").innerHTML = `The sum of integers up to ${inputNum} is: ${sum}`;
}

function addNumbers(num1, num2) {
    let inputNum1 = parseFloat(num1);
    let inputNum2 = parseFloat(num2);
    let total = inputNum1 + inputNum2;
    document.getElementById("sumDisplay").innerHTML = `The total of your two integers is: ${total}`;
}