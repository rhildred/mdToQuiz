// create our angular app and inject ui.bootstrap
angular.module('app', ['ui.bootstrap', 'ngRoute', 'duScroll', 'ngTouch'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/:elementid', {
            template: ' ',
            controller: ['$scope','$routeParams', '$document', function($scope, $routeParams, $document) {
                var someElement = angular.element(document.getElementById($routeParams.elementid));
                var nOffset = 60;
                if($scope.$parent.bAboveMenu){
                    nOffset = 140;
                }
                if($scope.$parent.navCollapsed == false){
                    nOffset = 270;
                }
                $document.scrollToElement(someElement, nOffset, 500);
                $scope.$parent.navCollapsed = true;
            }]
        });
    }])

    .controller('navController', function($scope, $http) {
    $scope.bAboveMenu = true;
    $scope.navClass = "navbar-static-top";
    window.onscroll = function() {
        // we use the window.onscroll here because to do it in Angular is too slow.
        var el = document.body.firstElementChild;
        var navTop = el.getBoundingClientRect().bottom;
        if(navTop < 0){
            if($scope.bAboveMenu){
                $scope.bAboveMenu = false;
                $scope.navClass = 'navbar-fixed-top';
                $scope.$apply();
            }
        }else{
            if(!$scope.bAboveMenu){
                $scope.bAboveMenu = true;
                $scope.navClass = 'navbar-static-top';
                $scope.$apply();
            }
        }

    };
    $scope.submitBugReport = function(){
        $http.post("/bugreport", $scope.contact).then(function(){
            $scope.successmessage = "thank-you for your inquiry";
        }, function(){
            $scope.errormessage = "something went wrong";
        });
    };
    $scope.submitFile = function(){
        var formData = new FormData(document.getElementById('fileid'));
        formData.append("title", $scope.quiz.title);
        // Step 3 Create our XMLHttpRequest Object - note that we use an XMLHttpRequest so that we can send FormData with it
        var xhr = new XMLHttpRequest();
        // Open our connection using the POST method - note that the url is supplied to the javascript in the c# code

        xhr.open("POST", "/fileupload");

        xhr.send(formData);

        // Step 4 listen for the result and display the image if it worked
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                alert("file uploaded");
            }
        }
    };
    $scope.onDropComplete = function(e){
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
        alert("dropped");
    };
    $scope.onHover = function(e){
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");

    };
    var filedrag = document.getElementById("filedrag");
    filedrag.addEventListener("dragover", $scope.onHover, false);
    filedrag.addEventListener("dragleave", $scope.onHover, false);
    filedrag.addEventListener("drop", $scope.onDropComplete, false);




});
