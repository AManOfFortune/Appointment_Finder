<?php
include("businesslogic/simpleLogic.php");

$param = "";
$method = "";

isset($_GET["method"]) ? $method = $_GET["method"] : false;
isset($_GET["param"]) ? $param = $_GET["param"] : false;

$param = json_decode($param);

$logic = new SimpleLogic();
$result = $logic->handleRequest($method, $param);

if ($result == null) {
    response("GET", 400, null);
} else if ($result == 1) {
    response("GET", 200, "true");
} else if ($result == 0) {
    response("GET", 200, "false");
} else {
    response("GET", 200, $result);
}


function response($method, $httpStatus, $data)
{
    header('Content-Type: application/json');
    switch ($method) {
        case "GET":
            http_response_code($httpStatus);
            echo (json_encode($data));
            break;
        default:
            http_response_code(405);
            echo ("Method not supported yet!");
    }
}
?>