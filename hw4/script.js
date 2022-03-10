function initialize(){

    HOTDOG_PRICE = 3.75;
    FRIES_PRICE = 2;
    SODA_PRICE = 1.80;
    DISCOUNT_PRICE = 20;
    DISCOUNT = 0.1
    TAX = 0.0625;

    num_hotdogs = prompt("How many hotdogs do you want?");
    num_fries = prompt("How many fries do you want?");
    num_sodas = prompt("How many sodas do you want?");

    if (num_hotdogs == "" || num_hotdogs == null) {num_hotdogs = 0;}
    if (num_fries == "" || num_fries == null) {num_fries = 0;}
    if (num_sodas == "" || num_sodas == null) {num_sodas = 0;}

    subtotal = (num_hotdogs * HOTDOG_PRICE) + (num_fries * FRIES_PRICE) + (num_sodas * SODA_PRICE);
    original_subtotal = subtotal;

    if (subtotal >= DISCOUNT_PRICE){
        discount = true;
        discount_num = Math.round(((subtotal * DISCOUNT) + Number.EPSILON) * 100) / 100;
        subtotal = Math.round(((subtotal - discount_num) + Number.EPSILON) * 100) / 100; 
    }
    else{
        discount = false;
        short = DISCOUNT_PRICE - subtotal;
    }

    tax = Math.round(((subtotal * TAX) + Number.EPSILON) * 100) / 100;
    total = Math.round(((subtotal + tax) + Number.EPSILON) * 100) / 100;

    document.getElementById("num_hotdogs").innerHTML = num_hotdogs;
    document.getElementById("num_fries").innerHTML = num_fries;
    document.getElementById("num_sodas").innerHTML = num_sodas;

    document.getElementById("subtotal").innerHTML = original_subtotal.toFixed(2);
    document.getElementById("subtotal2").innerHTML = subtotal.toFixed(2);

    if (discount){
        document.getElementById("discount").innerHTML = "Congratulations! Your order was above $20, so Joe's special offer of a 10% coupon was applied to your order!";
        document.getElementById("discount2").innerHTML = "Discount Amount: $" + discount_num.toFixed(2);
    }
    else{
        document.getElementById("discount").innerHTML = "Please spend $" + short.toFixed(2) + " more in order to qualify for Joe's special offer of a 10% coupon";

        document.getElementById("discount2").innerHTML = "Discount Amount: $0.00";
    }

    document.getElementById("tax").innerHTML = tax.toFixed(2);
    document.getElementById("total").innerHTML = total.toFixed(2);
}