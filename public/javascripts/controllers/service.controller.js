app.controller("serviceController", ($scope, $http,) => {
    $scope.services = {};
    $scope.getService = function () {
        $http({
            url: BASE_URL + 'services/list',
            method: "GET",
        }).then(
            function (response) {
                if (response.data.IsSuccess == true && response.data.Data != 0) {
                    $scope.services = response.data.Data;
                    console.log("$scope.services", $scope.services);
                } else {
                    console.log("response", response);
                }
            },
            function (error) {
                $('#loadingdiv').hide();
                console.log(error);
                console.error("Something Went Wrong! try again");
            }
        );
    };
    $scope.getService();
});


