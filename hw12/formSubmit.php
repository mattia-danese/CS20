<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Jade Delight 2</title>
        <link rel = "stylesheet" href = "./style.css" />
    </head>

    <body>
        <?php
            include 'header.php';
            echo buildHeader();
        ?>

        <table cellpadding="3" border="0">
            <tbody>
                <tr>
                    <th>Quantity Selected</th>
                    <th>Item Name</th>
                    <th>Cost Each</th>
                    <th>Total Cost</th>
                </tr>

                <?php 
                    include 'db.php';

                    $dbData = getDatabaseData();
                    $count = 0;
                    while($row = $dbData -> fetch_assoc()){
                        $data = "<tr>";
                        $data .= "<td>" . $_POST["quan" . $count] . "</td>"; // quantity
                        $data .= "<td>" . $row["Product"] . "</td>"; // item name
                        $data .= "<td>$" . number_format(floatval($row["Cost"]), 2, '.', '') . "</td>"; // cost each 
                        if($_POST["cost" . $count] == "")
                            $total = "0.00";
                        else
                            $total = $_POST["cost" . $count];
                        $data .= "<td>$" . $total . "</td>"; // total cost
                        $data .= "</tr>";
                        
                        echo $data;
                        $count++;
                    }    
                ?>
            </tbody>
        </table>

        <br>

        <div>Subtotal: $<?php echo $_POST["subtotal"]?></div>
        <div>Tax: $<?php echo $_POST["tax"]?></div>
        <div>Total: $<?php echo $_POST["total"]?></div>

        <br>

        <div><?php if($_POST["p_or_d"] == "pickup"){echo "Pickup";}else{echo "Delivery";}?> time: <?php echo $_POST["time"]?></div>

        <?php 
            // sending email
            $to = "odoghrykhd@gmail.com";
            $subject = "Order Details";
            $msg = "Thank you for your order!\n";
            $msg .= "The total for your order was: $" . $_POST["total"] . ".\n";
            if($_POST["p_or_d"] == "pickup")
                $msg .= "Please come pick up your order at " . $_POST["time"] . ".\n";
            else
                $msg .= "Your order will be delivered to " . $_POST["street"] . ", " . $_POST["city"] . " at " . $_POST["time"] . ".\n";
            $headers = "From: themattiadanese@gmail.com";

            mail($to, $subject, $msg, $headers);
        ?>

        <?php
            // storing order in database
            $quantities = array($_POST["quan0"], $_POST["quan1"], $_POST["quan2"], $_POST["quan3"], $_POST["quan4"]);
            
            $address = "NULL";
            if($_POST["p_or_d"] == "delivery")
                $address = $_POST["street"] . ", " . $_POST["city"];
            
            insertOrderIntoDatabase($_POST["fname"], $_POST["lname"], $_POST["phone"], $quantities, $_POST["p_or_d"], $address, $_POST["time"], floatval($_POST["total"]));
        ?>
    </body>
</html>
