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

    public function queryAllAppointmentData() {
        $select_all_news_stmt = $GLOBALS['db']->prepare("SELECT * FROM `appointment`");
        $select_all_news_stmt->execute();
        $select_all_news_stmt->bind_result($appointment_id, $name, $description, $pub_pri_flag, $closed_flag, $closes_on);

        $result = array();
        
        while($select_all_news_stmt->fetch()) {
            array_push($result, [$appointment_id, $name, $description, $pub_pri_flag, $closed_flag, $closes_on]);
        };
        
        $select_all_news_stmt->close();

        return $result;
    }
}
?>