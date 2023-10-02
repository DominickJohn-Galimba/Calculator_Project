let num1 = '';
let num2 = '';
let operator = '';
let getResults = 0;
let getResults_to_Top = 0;
function add (num1, num2) {
    return num1 + num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function operate (num1, operator, num2) {
  let results = 0;
  if (num1 !== '' && num2 !== '' && operator !== '') {
      num1 = parseFloat(num1); // Convert num1 and num2 to numbers if necessary
      num2 = parseFloat(num2);
  
  
      if (operator === '+') {
        results = add(num1, num2);
      } else if (operator === 'x') {
        results = multiply(num1, num2);
      } else if (operator === '÷') {
        results = divide(num1, num2);
      } else if (operator === '-') {
        results = subtract(num1, num2);
      }
  }
  if (Number.isInteger(results) === true) {
    return results;
  } else {
    return results.toFixed(2);
  }
}

function getValue (value) {
  if (value === '=') {
    getResults = getResults_to_Top
    document.getElementById('expression').value = getResults;
    document.getElementById('result').value = '';
    num1 = getResults;
    getResults_to_Top = 0;
    num2 = '';
    operator = '';
  }  else if (typeof value === 'string' && value !== '.' && value !== "AC" && value !== 'DEL') {
    // Handle operators
    operator = value;
    document.getElementById('expression').value += ` ${operator} `;
  } else if (num1 !== getResults && typeof value === 'number'  || value === '.') {
    if (operator === '') {
      // If there's no operator set, treat it as num1
      if (value === '.' && num1.includes('.')) return
      num1 += value;
    } else {
      // If there's an operator set, treat it as num2
      if (value === '.' && num2.includes('.')) return
      num2 += value;
    }
    document.getElementById('expression').value = `${num1} ${operator} ${num2}`;
  } else if (num1 === getResults && typeof value !== 'string') {
    let stringNum = value
    if (operator === '') {
      num1 = stringNum.toString();
    } else {
      num2 = stringNum.toString();
    }
    // If num1 is equal to the result, reset it to the clicked number
    document.getElementById('expression').value = `${parseFloat(num1).toLocaleString("en-US")} ${operator} ${num2}`;
  }  else if ( value === 'AC') {
    num1 = '';
    operator = '';
    num2 = '';
    document.getElementById('result').value = '';
    document.getElementById('expression').value = '';

  } else if ( value === "DEL") {
    if (num1 !== '' && operator !== "") {
      num2 = num2.toString().slice(0, -1)
    } else if (num1 !== '' && operator !== '' && num2 === '') {
      operator = operator.toString().slice(0, -1)
    } else if (num1 !== '' && operator === '' && num2 === '') {
      num1 = num1.toString().slice(0, -1)
    }
    if (num1 === '' && operator === '' && num2 === '') {
      document.getElementById('expression').value = ''
    } else {
      document.getElementById('expression').value = `${parseFloat(num1).toLocaleString("en-US")} ${operator} ${num2}`;
    }
  }
  if (num1 !== '' && operator !== '' && num2 !== '' && typeof value === 'string' && value !== '.' && value !== "AC" && value !== 'DEL') {
    num2 = '';
    num1 = getResults_to_Top;
    console.log(num1)
  }
  if (num1 !== '' && num2 !== '' && operator !== '' && value !== '=' && value !== "AC" && value !== "DEL") {
    getResults_to_Top = operate(num1, operator, num2);
    document.getElementById('result').value = getResults_to_Top.toLocaleString("en-US");
  }
}

