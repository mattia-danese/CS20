<?php
    function getDatabaseData(){
        // connection info
        $server = "localhost";
        $userid = "urugxmci3twje";
        $pw = "hdgqjsheldtx";
        $db = "dbsonq3stfmjsz";

        // making connection and validating
        $conn = new mysqli($server, $userid, $pw, $db);
        if($conn -> connect_error){
            die("Connection failed:" . $conn -> connect_error);
        }

        $conn -> select_db($db);
        
        // querying
        $tableInfoQuery = "SELECT * FROM Products";
        $tableInfoResults = $conn -> query($tableInfoQuery);
        
        if($tableInfoResults -> num_rows <= 0){
            echo "NO RESULTS";      
        }

        // closing database connection
        $conn -> close();

        return $tableInfoResults;
    }

    function insertOrderIntoDatabase($fname, $lname, $phone, $quantities, $p_or_d, $address, $time, $total){
        // connection info
        $server = "localhost";
        $userid = "urugxmci3twje";
        $pw = "hdgqjsheldtx";
        $db = "dbnna80dlya8n8";

        // making connection and validating
        $conn = new mysqli($server, $userid, $pw, $db);
        if($conn -> connect_error){
            die("Connection failed:" . $conn -> connect_error);
        }

        $conn -> select_db($db);
        
        // querying
        $insertQuery = "INSERT INTO `Orders` (`First Name`, `Last Name`, `Phone Number`, `Sweet and Sour Pork`, `Shrimp Lo Mein`, `Moo Shi Chicken`, `Fried Rice`, `Chicken Chop Suey`, `Pickup/Delivery`, `Address`, `Time`, `Total`) VALUES (";
        $insertQuery .= "'" . $fname . "',";
        $insertQuery .= "'" . $lname . "',";
        $insertQuery .= "'" . $phone . "',";
        $insertQuery .= "'" . $quantities[0] . "',";
        $insertQuery .= "'" . $quantities[1] . "',";
        $insertQuery .= "'" . $quantities[2] . "',";
        $insertQuery .= "'" . $quantities[3] . "',";
        $insertQuery .= "'" . $quantities[4] . "',";
        $insertQuery .= "'" . $p_or_d . "',";
        $insertQuery .= "'" . $address . "',";
        $insertQuery .= "'" . $time . "',";
        $insertQuery .= "'" . $total . "');";

        $conn -> query($insertQuery);

        // closing database connection
        $conn -> close();
    }
?>