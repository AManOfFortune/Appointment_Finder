<?php
require_once('dbConnect.php');

class DataHandler
{
    public function queryAllPublicAppointments() {
        $select_all_public_stmt = $GLOBALS['db']->prepare("SELECT `appointment_id`, `name` FROM `appointment` where `public/private_Flag` = 0 AND `closed_flag` = 0");

        $select_all_public_stmt->execute();
        $select_all_public_stmt->bind_result($appointment_id, $name);

        $result = array();

        while($select_all_public_stmt->fetch()) {
            array_push($result, [$appointment_id, $name]);
        };
        
        $select_all_public_stmt->close();

        return $result;
    }

    // public function insertAllDataTermin(){
    //     $db_obj = new mysqli($host, $user, $password, $database);
    //     $insert_all_DataTermin_obj = "INSERT INTO `table termin` (`Termin_ID`, `date`, `time`, `FK_appointmentID`) VALUES(?, ?, ?, ?)";
    //     $insert_all_DataTermin_stmt = $db_obj->prepare($insert_all_DataTermin_obj);
    //     $stmt->bind_param("issi", $Termin_ID, $date, $time, $FK_appointmentID);
    //     //TODO: insert the values
    //     $Termin_ID = ;
    //     $date = ;
    //     $time = ;
    //     $FK_appointmentID = ;
    //     $stmt->execute();
    // }

    // public function insertAllDataAppointments(){
    //     $db_obj = new mysqli($host, $user, $password, $database);
    //     $insert_all_DataAppointments_obj = "INSERT INTO `appointment` (`appointment_ID`, `name`, `Description`, `public/private_Flag`, `closed_flag`, `closes_on`)
    //      VALUES(?, ?, ?, ?, ?, ?)";
    //     $insert_all_DataTermin_stmt = $db_obj->prepare($insert_all_DataTermin_obj);
    //     $stmt-> bind_param("issiis", $appointment_ID, $name, $description, $pub_pri_flag, $closed_flag, $closes_on);
    //     //TODO: insert the values
    //     $appointment_ID = ;
    //     $name = ;
    //     $description = ;
    //     $pub_pri_flag = ;
    //     $closed_flag = ;
    //     $closes_on = ;
    //     $stmt->execute();
    // }

    //TODO: input for appointment_ID (replace $helper)
    public function selectAppointmentViaIDAndReturnAll(){
        $helper = 1;

        $select_userIDs_stmt = $GLOBALS['db']->prepare("SELECT `users_ID` FROM  `users` where `FK_appointment` = $helper");
        $select_userIDs_stmt->execute();
        $select_userIDs_stmt->bind_result($users_ID);
        $user_ID = (int) $users_ID;
        $select_userIDs_stmt->close();

        /*$numOfUser = (int) $users_ID;*/
       
        //select all necessary data for prepared statement
        $select_all_data_via_ID_stmt = $GLOBALS['db']->prepare("SELECT * FROM `appointment` WHERE `appointment_ID` = $helper");
        $select_all_users_via_ID_stmt = $GLOBALS['db']->prepare("SELECT * FROM  `users` WHERE `FK_appointment` =  $helper");
        $select_all_table_termin_via_ID_stmt = $GLOBALS['db']->prepare("SELECT * FROM `table termin` WHERE `FK_appointmentID` =  $helper");
        $select_termin_via_userIds_stmt = $GLOBALS['db']->prepare("SELECT `FK_Termin` FROM  `termin-user` WHERE `FK_User` = $user_ID");//userID
        $select_numOfUsers_stmt = $GLOBALS['db']->prepare("SELECT COUNT(`FK_Termin`) FROM  `termin-user` where `FK_User` =  $helper");


        //execute statements
        $select_all_data_via_ID_stmt->execute();
        $select_all_users_via_ID_stmt->execute();
        $select_all_table_termin_via_ID_stmt->execute();
        $select_termin_via_userIds_stmt->execute();
        $select_numOfUsers_stmt->execute();

        //bind results
        $select_all_data_via_ID_stmt->bind_result($appointment_id, $name, $Description, $public_private_Flag, $closed_flag, $closes_on);
        $select_all_users_via_ID_stmt->bind_result($users_ID, $username, $comment, $FK_appointment);
        $select_all_table_termin_via_ID_stmt->bind_result($Termin_ID, $date, $time, $FK_appointmentID);
        $select_termin_via_userIds_stmt->bind_result($FK_Termin);
        $select_numOfUsers_stmt->bind_result($users_ID);


        //concatenate all data in array $result
        $result = array();
        while($select_all_data_via_ID_stmt->fetch()) {
            array_push($result, [$appointment_id, $name, $Description, $public_private_Flag, $closed_flag, $closes_on]);
            while($select_all_users_via_ID_stmt->fetch()){
                array_push($result, [$users_ID, $username, $comment, $FK_appointment]);
                while($select_all_table_termin_via_ID_stmt->fetch()){
                    array_push($result, [$Termin_ID, $date, $time, $FK_appointmentID, $numOfUser]);
                    while($select_termin_via_userIds_stmt->fetch()){
                        array_push($result, [$FK_Termin]);
                        while($select_numOfUsers_stmt->fetch()){
                            array_push($result, [$users_ID]);
                        }
                    }
                }
            }
        };  

        $select_all_data_via_ID_stmt->close();
        $select_all_users_via_ID_stmt->close();
        $select_all_table_termin_via_ID_stmt->close();
        $select_termin_via_userIds_stmt->close();
        $select_numOfUsers_stmt->close();

        return $result;
    }
}
?>
