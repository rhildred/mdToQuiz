<?php
require __DIR__ . "/../vendor/autoload.php";
$oApp = new \Slim\Slim(array(
        'view' => new \PHPView\PHPView(),
        'templates.path' => __DIR__ . "/../views" ));
                       
$oApp->get("/", function()use($oApp){
    $oApp->render("index.phtml"); 
});

$oApp->post("/bugreport", function()use($oApp){
    $oParams = json_decode($oApp->request->getBody());
    Bitbucket::submitBug($oParams->subject, $oParams->message, $oParams->email, "faculty");
    $oParams->result="success";
    echo json_encode($oParams);
});

$oApp->post("/fileupload", function(){
    print_r($_FILES);
    print_r($_POST);
});

$oApp->run();
