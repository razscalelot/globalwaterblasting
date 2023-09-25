app.controller("serviceController", ($scope, $http,) => {
    $scope.onContact = function () {
        console.log("scope", $scope.name, $scope.email, $scope.mobile, $scope.address, $scope.postcode, $scope.massage);
       
    };
});
