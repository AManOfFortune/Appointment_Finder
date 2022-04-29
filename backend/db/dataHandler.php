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

    public function createNewAppointment($params) {
        //Inserts data into table appointment
        $insert_all_appointment_stmt = $GLOBALS['db']->prepare("INSERT INTO `appointment` (`name`, `Description`, `public/private_Flag`, `closed_flag`, `closes_on`) VALUES (?, ?, ?, ?, ?)");
        $insert_all_appointment_stmt->bind_param("ssiis", $name, $description, $pub_pri_flag, $closed_flag, $closes_on);

        $name = $params->name;
        $description = $params->description;
        $pub_pri_flag = $params->pub_pri;
        $closed_flag = $params->closed;
        $closes_on = $params->closes_on;

        $result = $insert_all_appointment_stmt->execute();

        $insert_all_appointment_stmt->close();

        //Inserts all dates into table Termin
        $insert_all_date_stmt = $GLOBALS['db']->prepare("INSERT INTO `table termin` (`time`, `FK_appointmentID`) VALUES (?, ?)");
        $insert_all_date_stmt->bind_param("si", $time, $FK_appointmentID);

        $FK_appointmentID = mysqli_insert_id($GLOBALS['db']);
        $successful_ID = mysqli_insert_id($GLOBALS['db']);

        foreach ($params->dates as $newDate) {
            $time = $newDate;
            $result = $insert_all_date_stmt->execute();
        }

        $insert_all_date_stmt->close();

        if($result == 0) {
            return $result;
        }
        else {
            return $successful_ID;
        }
    }

    public function addVotes($params) {
        //Inserts data into table user
        $insert_all_user_stmt = $GLOBALS['db']->prepare("INSERT INTO `users` (`username`, `comment`, `FK_appointment`) VALUES (?, ?, ?)");
        $insert_all_user_stmt->bind_param("ssi", $username, $comment, $FK_appointment);

        $username = $params->userName;
        $comment = $params->userComment;
        $FK_appointment = $params->appointmentID;

        $result = $insert_all_user_stmt->execute();

        $insert_all_user_stmt->close();

        //Inserts all dates into table Termin-User
        $insert_all_date_stmt = $GLOBALS['db']->prepare("INSERT INTO `termin-user` (`FK_Termin`, `FK_User`) VALUES (?, ?)");
        $insert_all_date_stmt->bind_param("ii", $FK_Termin, $FK_User);

        $FK_User = mysqli_insert_id($GLOBALS['db']);

        foreach ($params->votedDates as $dateID) {
            $FK_Termin = $dateID;
            $result = $insert_all_date_stmt->execute();
        }

        $insert_all_date_stmt->close();

        return $result;
    }

    public function selectAppointmentViaIDAndReturnAll($params){
        $helper = $params->appointmentID;
        $result = array();


        $select_all_data_via_ID_stmt = $GLOBALS['db']->prepare("SELECT * FROM `appointment` WHERE `appointment_ID` = $helper");
        $select_all_data_via_ID_stmt->execute();
        $select_all_data_via_ID_stmt->bind_result($appointment_id, $name, $Description, $public_private_Flag, $closed_flag, $closes_on);
        while($select_all_data_via_ID_stmt->fetch()) {
            array_push($result, [$appointment_id, $name, $Description, $public_private_Flag, $closed_flag, $closes_on]);
        }
        $select_all_data_via_ID_stmt->close();


        $usersArray = array();

        $select_all_users_via_ID_stmt = $GLOBALS['db']->prepare("SELECT * FROM  `users` WHERE `FK_appointment` =  $helper AND NOT `comment` = ''");
        $select_all_users_via_ID_stmt->execute();
        $select_all_users_via_ID_stmt->bind_result($users_ID, $username, $comment, $FK_appointment);
        while($select_all_users_via_ID_stmt->fetch()){
            array_push($usersArray, [$users_ID, $username, $comment, $FK_appointment]);
        }
        $select_all_users_via_ID_stmt->close();

        array_push($result, $usersArray);


        $terminArray = array();

        $select_all_table_termin_via_ID_stmt = $GLOBALS['db']->prepare("SELECT * FROM `table termin` WHERE `FK_appointmentID` =  $helper");
        $select_all_table_termin_via_ID_stmt->execute();
        $select_all_table_termin_via_ID_stmt->bind_result($Termin_ID, $time, $FK_appointmentID);
        while($select_all_table_termin_via_ID_stmt->fetch()) {
            array_push($terminArray, [$Termin_ID, $time, $FK_appointmentID]);
        }
        $select_all_table_termin_via_ID_stmt->close();


        $select_numOfUsers_stmt = $GLOBALS['db']->prepare("SELECT COUNT( * ) FROM  `termin-user` WHERE `FK_Termin` =  ?");
        foreach ($terminArray as $index => $terminRow) {

            $select_numOfUsers_stmt->bind_param('i', $terminRow[0]);
            $select_numOfUsers_stmt->execute();
            $select_numOfUsers_stmt->bind_result($numOfUsers);

            while ($select_numOfUsers_stmt->fetch()) {
                array_push($terminArray[$index], $numOfUsers);
            }
        }
        $select_numOfUsers_stmt->close();

        array_push($result, $terminArray);

        return $result;
    }
}
?>