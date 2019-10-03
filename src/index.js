function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    if (/\(|\)/.test(expr)) {
        let checkBracketsArr = expr.match(/\(|\)/g);
        if (checkBracketsArr.length%2 != 0) {
          throw new Error('ExpressionError: Brackets must be paired');
        }
        let removeDuplicatesArr = [...new Set(checkBracketsArr)];
        if (removeDuplicatesArr.length != 2) {
          throw new Error('ExpressionError: Brackets must be paired');
        }
      }
    
    expr = expr.replace(/\s/g, '');
  
    function multiplication(str) {
      let a = Number(str.match(/.+(?=\*)/g)[0]);
      let b = Number(str.match(/(?<=\*).*$/g)[0]);        
      return String(a * b);
    }
  
    function division(str) {
      let a = Number(str.match(/.+(?=\/)/g)[0]);
      let b = Number(str.match(/(?<=\/).*$/g)[0]);
  
      if (b == 0) {
        throw new Error('TypeError: Division by zero.');
      }
  
      return String(a / b);
    }

    function minusMinusPlus(str) {
      str = str.replace(/\-\-/g, '+');
      str = str.replace(/\+\-/g, '-');
      return str;
    }
    
    function multiplicationAndDivision(str) {
      let checker = true;
      while (checker) {
          checker = false;
    
          if ((/[\d\.]+\*(([\d\.]+)|(\-[\d\.]+))/.test(str)) && (/[\d\.]+\/(([\d\.]+)|(\-[\d\.]+))/.test(str))) {
            let indexOfMultiplication = str.search(/[\d\.]+\*(([\d\.]+)|(\-[\d\.]+))/);
            let indexOfDivision = str.search(/[\d\.]+\/(([\d\.]+)|(\-[\d\.]+))/);
            if (indexOfMultiplication < indexOfDivision) {
              str = str.replace(/[\d\.]+\*(([\d\.]+)|(\-[\d\.]+))/, match => multiplication(match));
              checker = true;
            } else {
              str = str.replace(/[\d\.]+\/(([\d\.]+)|(\-[\d\.]+))/, match => division(match));
              checker = true;
            }
            str = minusMinusPlus(str);
          } else if (/[\d\.]+\*(([\d\.]+)|(\-[\d\.]+))/.test(str)) {
              str = str.replace(/[\d\.]+\*(([\d\.]+)|(\-[\d\.]+))/, match => multiplication(match));
              checker = true;
              str = minusMinusPlus(str);
          } else if (/[\d\.]+\/(([\d\.]+)|(\-[\d\.]+))/.test(str)) {
              str = str.replace(/[\d\.]+\/(([\d\.]+)|(\-[\d\.]+))/, match => division(match));
              checker = true;
              str = minusMinusPlus(str);
          }
    
      }
      return str;
    }
  
    function additionAndSubstraction(str) {
      let arrToReduce = str.match(/((\+|\-)[\d\.]+)|^[\d\.]+/g);
      arrToReduce = arrToReduce.map(Number);
      let finalNum = arrToReduce.reduce(function(acc, elem) {
          return acc + elem;
      }, 0);
      return String(finalNum);
    }
  
    function noParentheses(str) {
      return str.match(/[^\(^\)]+/g)[0];
    }
  
    function insideParenteses(str) {
      str = noParentheses(str);
      return additionAndSubstraction(multiplicationAndDivision(str));
    }
  
    if (/\(|\)/.test(expr)) {
      while (/\(|\)/.test(expr)) {
        expr = expr.replace(/\([^\(^\)]+\)/, insideParenteses);
        expr = minusMinusPlus(expr);
      }
    }
  
    expr = insideParenteses(expr);
    
    return Number(expr);
}

module.exports = {
    expressionCalculator
}