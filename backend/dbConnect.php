<?php
    require_once("dbAccess.php");

    $db = new mysqli($host, $user, $password, $database);

    //Writes error and success messages to the console with JS
    if ($db->connect_error) {
        echo "<script>console.log('Error connecting to database: $db->connect_error')</script>";
    }
    else {
        echo "<script>console.log('Connection established')</script>";
    }


?>
<!--TODO: später entfernen

 <?php
                        $select_all_news_stmt = $db->prepare("SELECT * FROM `appointment`");
                        $select_all_news_stmt->execute();
                        $select_all_news_stmt->bind_result($appointment_id, $name, $description, $pub_pri_flag, $closed_flag, $closes_on);

                        while($select_all_news_stmt->fetch()) {
                            echo $appointment_id;
                        }
                        $select_all_news_stmt->close();
?> -->