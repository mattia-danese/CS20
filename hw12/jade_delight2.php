<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Jade Delight 2</title>
</head>

<body>
    <?php
        include 'db.php';
        include 'form.php';
        include 'header.php';

        $dbData = getDatabaseData();
        $form = buildForm($dbData);
        $header = buildHeader();

        echo $header;
        echo $form;
    ?>
</body>

<!-- ---------- WHAT I ADDED ---------- -->
<script src="./script.js"></script>
<link rel = "stylesheet" href = "./style.css" />
<!------------------------------------- -->

</html>