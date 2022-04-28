<?php
include("db/dataHandler.php");

class SimpleLogic
{

    private $dh;

    function __construct()
    {
        $this->dh = new DataHandler();
    }

    function handleRequest($method, $param)
    {
        switch ($method) {   
            case "queryAllAppointmentData":
                $res = $this->dh->queryAllAppointmentData();
                break;
            case "queryAllPublicAppointments":
                $res = $this->dh->queryAllPublicAppointments();
                break;
            default:
                $res = null;
                break;
        }
        return $res;
    }
}
?>