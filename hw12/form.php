<?php
    function makeRow($name, $price, $count){
        $row = "<tr>";
        
        // making select cell
        $row .= '<td class="selectQuantity">
                    <select name="quan' . $count . '" size="1">';
        for($i=0; $i<10; $i++){
            $row .= '<option>' . $i . '</option>';
        }
        $row .= '</select></td>';

        // making name cell
        $row .= '<td class="itemName">' . $name . '</td>';

        // making cost each cell
        $row .= '<td class="cost">$' . number_format(floatval($price), 2, '.', '') . '</td>';

        // making total cost cell
        $row .= '<td class="totalCost">$ <input type="text" name="cost' . $count . '"></td>';

        // closing tags
        $row .= '</tr>';

        return $row;
    }
    
    
    
    function buildForm($dbData){
        
        $form = '<form action = "formSubmit.php" method = "POST">'; 

        // top half of form
        $form .= '<p class="userInfo"><label>First Name:</label> <input type="text"  name="fname" /></p>
        <p class="userInfo"><label>Last Name*</label>:  <input type="text"  name="lname" /></p>
        <p class="userInfo address"><label>Street*</label>: <input type="text" name="street" /></p>
        <p class="userInfo address"><label>City*</label>: <input type="text" name="city" /></p>
        <p class="userInfo"><label>Phone*</label>: <input type="text"  name="phone" /></p>
        <p> 
            <input type="radio"  name="p_or_d" value = "pickup" checked="checked"/>Pickup  
            <input type="radio"  name="p_or_d" value = "delivery"/>
            Delivery
        </p>';

        //bottom half of form
        $form .= '<table cellpadding="3" border="0">
                    <tbody>
                        <tr>
                            <th>Select Item</th>
                            <th>Item Name</th>
                            <th>Cost Each</th>
                            <th>Total Cost</th>
                        </tr>';
        $count = 0;
        while($row = $dbData -> fetch_assoc()){
            $form .= makeRow($row["Product"], $row["Cost"], $count);
            $count++;
        }
        $form .= '</tbody></table>';
        
        $form .= '<p class="subtotal totalSection"><label>Subtotal</label>: 
            $ <input type="text"  name="subtotal" id="subtotal" />
         </p>
         <p class="tax totalSection"><label>Mass tax 6.25%:</label>
           $ <input type="text"  name="tax" id="tax" />
         </p>
         <p class="total totalSection"><label>Total:</label> $ <input type="text" name="total" id="total" />
         </p>';

        $form .= '<input type = "submit" value = "Submit Order" />';

        $form .= '<input name="time" style="display:none;" />';
        
        $form .= '</form>';

        return $form;
    }
?>