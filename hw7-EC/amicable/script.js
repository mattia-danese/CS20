function validInput(n1, n2){
    if(isNaN(n1) || isNaN(n2)){
        document.getElementById("error").style = "display: block;";
        document.getElementById("content").style = "display: none;";
        return false;
    }

    document.getElementById("error").style = "display: none;";
    document.getElementById("content").style = "display: block;";
    return true;
    
}


function isAFactor(x,y){
    if(y % x == 0){
        return true;
    }

    return false;
}

function getFactors(n){
    const factors = new Array();

    for(i=1; i <= (n/2); i++){
        if(isAFactor(i,n) == true){
            factors.push(i);
        }
    }
    
    return factors;
}

function sumArray(arr){
    total = 0;
    for(i=0; i < arr.length; i++){
        total += arr[i];
    }

    return total;
}

function updateDOM(num1, num2, num1_factors, num2_factors, num1_factors_sum, num2_factors_sum){
    // checks if sum of factors equals the other number
    if(num1 == num2_factors_sum && num2 == num1_factors_sum){
        document.getElementById("result").innerHTML = "The numbers: " + num1 + " and " + num2 + " are amicable";
    }
    else {
        document.getElementById("result").innerHTML = "The numbers: " + num1 + " and " + num2 + " are not amicable";
    }

    alert("The factors of " + num1 + " are: " + num1_factors);
    alert("The factors of " + num2 + " are: " + num2_factors);

}


function initialize(){
    // gets user inputted numbers
    num1 = parseInt(document.getElementById("num1").value);
    num2 = parseInt(document.getElementById("num2").value);

    // checks if input specifies two numbers
    if(!validInput(num1, num2)){
        return
    }

    // populates arrays with all factors of each number (excluding the number itself)
    num1_factors = getFactors(num1);
    num2_factors = getFactors(num2);

    // sums the arrays containing all factors of each number
    num1_factors_sum = sumArray(num1_factors);
    num2_factors_sum = sumArray(num2_factors);

    // populates the DOM with all needed information
    updateDOM(num1, num2, num1_factors, num2_factors, num1_factors_sum, num2_factors_sum);
}