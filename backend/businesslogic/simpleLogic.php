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
            case "queryAllPublicAppointments":
                $res = $this->dh->queryAllPublicAppointments();
                break;
            case "createNewAppointment":
                $res = $this->dh->createNewAppointment($param);
                break;
            case "addVotes":
                $res = $this->dh->addVotes($param);
                break;
            case "selectAppointmentViaIDAndReturnAll":
                $res = $this->dh->selectAppointmentViaIDAndReturnAll($param);
                break;
            default:
                $res = null;
                break;
        }

        return $res;
    }
}
?>