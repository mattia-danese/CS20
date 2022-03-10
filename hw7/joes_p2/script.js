function add(){
    var HOTDOG_PRICE = 3.75;
    var FRIES_PRICE = 2;
    var SODA_PRICE = 1.80;
    var TAX = 0.0625;
    var DISCOUNT_PRICE = 20;
    var DISCOUNT_RATE = 0.1; 
    
    var num_hotdogs = parseInt(document.getElementById("selecthotdogs").value);
    var num_fries = parseInt(document.getElementById("selectfries").value);
    var num_sodas = parseInt(document.getElementById("selectsodas").value);

    if(num_hotdogs == 0 && num_fries == 0 && num_sodas == 0){
        document.getElementById("error").style = "display: block;";
        return
    }
    else {
        document.getElementById("error").style = "display: none;";
    }

    num_hotdogs += parseInt(document.getElementById("numhotdogs").innerHTML);
    num_fries   += parseInt(document.getElementById("numfries").innerHTML);
    num_sodas   += parseInt(document.getElementById("numsodas").innerHTML);


    document.getElementById("numhotdogs").innerHTML = num_hotdogs;
    document.getElementById("numfries").innerHTML = num_fries;
    document.getElementById("numsodas").innerHTML = num_sodas;

    var hotdogs_cost = num_hotdogs * HOTDOG_PRICE;
    var fries_cost =  num_fries * FRIES_PRICE;
    var sodas_cost = num_sodas * SODA_PRICE;
    var subtotal = hotdogs_cost + fries_cost + sodas_cost;

    document.getElementById("moneyhotdogs").innerHTML = hotdogs_cost.toFixed(2);
    document.getElementById("moneyfries").innerHTML = fries_cost.toFixed(2);
    document.getElementById("moneysodas").innerHTML = sodas_cost.toFixed(2);
    document.getElementById("subtotal").innerHTML = subtotal.toFixed(2);

    var discount_cost;
    if(subtotal >= DISCOUNT_PRICE){
        discount_cost = (Math.round(((subtotal * DISCOUNT_RATE) + Number.EPSILON) * 100) / 100);

        document.getElementById("discount1").innerHTML = "Congratulations! Your order was above $20, so Joe's special offer of a 10% coupon was applied to your order!";
    }
    else{
        discount_cost = 0;
        cost_left = (Math.round(((DISCOUNT_PRICE - subtotal) + Number.EPSILON) * 100) / 100);

        document.getElementById("discount1").innerHTML = "Please spend $" + cost_left.toFixed(2) + " more in order to qualify for Joe's special offer of a 10% coupon";
    }
    document.getElementById("discount2").innerHTML = discount_cost.toFixed(2);

    var tax_cost = (Math.round((((subtotal - discount_cost) * TAX) + Number.EPSILON) * 100) / 100);
    var total = (Math.round(((subtotal - discount_cost + tax_cost) + Number.EPSILON) * 100) / 100);

    document.getElementById("tax").innerHTML = tax_cost.toFixed(2);
    document.getElementById("total").innerHTML = total.toFixed(2); 
}

function reset() {
    document.getElementById("numhotdogs").innerHTML = "0";
    document.getElementById("numfries").innerHTML = "0";
    document.getElementById("numsodas").innerHTML = "0";

    document.getElementById("moneyhotdogs").innerHTML = "0.00";
    document.getElementById("moneyfries").innerHTML = "0.00";
    document.getElementById("moneysodas").innerHTML = "0.00";
    document.getElementById("subtotal").innerHTML = "0.00";

    document.getElementById("discount1").innerHTML = "Please spend $20 to qualify for Joe's special offer of a 10% coupon.";
    document.getElementById("discount2").innerHTML = "0.00";

    document.getElementById("tax").innerHTML = "0.00";
    document.getElementById("total").innerHTML = "0.00"; 
}