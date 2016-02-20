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

    .controller('navController', function($scope, $document) {
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



});