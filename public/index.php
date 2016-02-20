<?php
require __DIR__ . "/../vendor/autoload.php";
$oApp = new \Slim\Slim(array(
        'view' => new \PHPView\PHPView(),
        'templates.path' => __DIR__ . "/../views" ));
                       
$oApp->get("/", function()use($oApp){
    $oApp->render("index.phtml"); 
});

$oApp->get("/bugreport", function()use($oApp){
    Bitbucket::submitBug("test 2", "this is a test", "rhildred@gmail.com", "faculty");
    echo '{"result":"success}';
});

$oApp->run();