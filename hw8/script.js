    // SELECTING QUANTITY FUNCTIONALITY
    function updateSubTaxTotal(){
        let subtotal = 0, tax = 0, total = 0;
        let totals = document.getElementsByClassName("totalCost");

        for (i=0; i < totals.length; i++){
            let val = parseFloat(totals[i].children[0].value);
            subtotal += isNaN(val) ? 0 : val;
        }

        tax = Math.round(((subtotal * 0.0625) + Number.EPSILON) * 100) / 100;
        total = Math.round(((subtotal + tax) + Number.EPSILON) * 100) / 100;

        document.getElementById("subtotal").value = subtotal.toFixed(2);
        document.getElementById("tax").value = tax.toFixed(2);
        document.getElementById("total").value = total.toFixed(2);
    }
    
    function itemTotal(idx, e){
        let total = Math.round(((menuItems[idx].cost * e.value) + Number.EPSILON) * 100) / 100;

        document.getElementsByClassName("totalCost")[idx].children[0].value = total.toFixed(2);

        updateSubTaxTotal();
    }

    let tds = document.getElementsByClassName("selectQuantity");
    for (i=0; i < tds.length; i++){
        let td = tds[i];
        let idx = parseInt(td.children[0].name[4]);
        let dropdown = td.children[0];

        td.addEventListener("change", function() {itemTotal(idx, dropdown);})
    }

    // STREET AND CITY FIELDS FUNCTIONALITY
    function showCityStreet(r){
        let elems = document.getElementsByClassName("address");
        if (r.checked){
            for (i=0; i < elems.length; i++){
                elems[i].style = "display: block;";
            }
        } 
    }

    function hideCityStreet(r){
        let elems = document.getElementsByClassName("address");
        if (r.checked){
            for (i=0; i < elems.length; i++){
                elems[i].style = "display: none;";
            }
        } 
    }

    let radioPickup = document.getElementsByName("p_or_d")[0];
    let radioDelivery = document.getElementsByName("p_or_d")[1];
    radioPickup.addEventListener("change", function () {hideCityStreet(radioPickup);})
    radioDelivery.addEventListener("change", function () {showCityStreet(radioDelivery);})
    hideCityStreet(radioPickup); //pickup is initally selected
    
    // SUBMIT FUNCTIONALITY
    function validateSubmit(){
        // verify last and phone
        let last = document.getElementsByName("lname")[0].value;
        let phone = document.getElementsByName("phone")[0].value;
        let verifyPhone = function () {
            let count = 0;
            for(i=0; i < phone.length; i++){
                if(!isNaN(parseInt(phone[i]))) {count++;}
            }
            if(count == 7 || count == 10) {return true;}

            return false;
        }


        if (!(last != "" && verifyPhone(phone))){
            alert("Your last name and phone number (7 or 10 digits) are required!");
            return;
        }

        //calculate pickup/delivery time
        let isPickup = document.getElementsByName("p_or_d")[0].checked;
        let old_time = new Date();
        let new_time = isPickup ?  new Date(old_time.getTime() + 15*60000) : 
                                   new Date(old_time.getTime() + 30*60000);

        //verify street and city if delivery
        if(!isPickup){
            let street = document.getElementsByName("street")[0].value;
            let city = document.getElementsByName("city")[0].value;
            if(street == "" || city == ""){
                alert("Please specify your street and city address!");
                return;
            }
        }

        //verify at least one item is ordered
        let total = document.getElementById("total").value;
        console.log(total);
        if(total == "" || total == "0.00"){
            alert("Please order at least one item before submitting your order!");
            return;
        }

        // no issues, display order details in new window/tab
        alert("Thank you for your order!");
       
        newWindow = window.open("","","");
        newWindow.document.write("<h1>Order Details</h1>");
        
        let quantities = document.getElementsByClassName("selectQuantity");
        let totals = document.getElementsByClassName("totalCost");
        let content = "<table border='0' cellpadding='3'><tr><th>Selected Items</th><th>Item Name</th><th>Cost Each</th><th>Total Cost</th></tr>";

        for (i=0; i < menuItems.length; i++){
            content += "<tr>";
            content += td(quantities[i].children[0].value, "selectQuantity");
            content += td(menuItems[i].name, "itemName");
            content += td("$" + menuItems[i].cost.toFixed(2), "cost");
            content += td(totals[i].children[0].value ? "$" + totals[i].children[0].value : "$0", "totalCost");
            content += "</tr>";
        }

        content += "</table>";
        content += ("<div>Tax: $" + document.getElementById("tax").value + "</div>");
        content += ("<div>Total: $" + document.getElementById("total").value + "</div>");
       
        let time = new_time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        
        if(isPickup){
            content += ("<div>Time until pickup: " + time + "</div>");
        }
        else{
            content += ("<div>Time until delivery: " + time + "</div>");
        }
 
        newWindow.document.write(content);
    }

    let submit = document.getElementsByTagName("input")[15];
    submit.addEventListener("click", function () {validateSubmit();});
