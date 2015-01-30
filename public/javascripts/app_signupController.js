app.controller("signupController", function($scope, $firebase, $state) {
	$scope.user = {
		email: "",
		password: ""
	};

	$scope.signup = function() {
		$scope.authObj.$createUser({
			email: $scope.user.email,
			password: $scope.user.password
		}).then(function(userData) {
			$scope.authObj.$authWithPassword({
				email: $scope.user.email,
				password: $scope.user.password
			})
			.then(function() {
				$state.go("a.home");
			});
		}).catch(function(error) {
			console.error("Error: ", error);
			if(error.message) {
				swal("Can't create account", error.message, "error");
			} else {
				swal("Can't create account", "Try it again later", "error");
			}
		});
	};
});