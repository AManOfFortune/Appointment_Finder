<?php
require_once('.../dbConnect.php');
include("./models/person.php");

class DataHandler
{

   public function queryPersons()
    {
        $res =  $this->getDemoData();
        return $res;
    }


    public function queryPersonById($id)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->id == $id) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryPersonByName($name)
    {
        $result = array();
        foreach ($this->queryPersons() as $val) {
            if ($val[0]->name == $name) {
                array_push($result, $val);
            }
        }
        return $result;
    }

    public function queryAllPublicAppointments(){
        $select_all_news_stmt = $db->prepare("SELECT name FROM `appointment` where public/private = 0 AND closed_flag = 1");

        // return name, appointment_ID;
    }

    public function selectID(){

    }

    public function insertID(){
        
    }

    public function queryAllAppointmentData(){
    $select_all_news_stmt = $db->prepare("SELECT * FROM `appointment`");
    $select_all_news_stmt->execute();
    $select_all_news_stmt->bind_result($appointment_id, $name, $description, $pub_pri_flag, $closed_flag, $closes_on);

    var helpVar = $select_all_news_stmt->fetch();
    
    $select_all_news_stmt->close();

    return helpVar;
    }

//TODO: delete Demodata after implementing entire DB
   private static function getDemoData()
    {

        //Terminvorschläge
        $demodata=[
            [new Person(1, 08.03.2023, 12:00, 1)],
            [new Person(2, 08.03.2023, 13:00, 2)],
            [new Person(3, 09.03.2023, 12:00, 3)],
            [new Person(4,08.03.2023, 13:00, 4)],
        ];

        return $demodata;
        
    }
}
