app.controller("loginController", function($scope, $firebase, $state) {
	$scope.user = {
		email: "",
		password: ""
	};

	$scope.login = function() {
		$scope.authObj.$authWithPassword({
			email: $scope.user.email,
			password: $scope.user.password
		}).then(function(authData) {
			console.log("Logged in as:", authData.uid);
			$state.go("a.home");
		}).catch(function(error) {
			console.error("Authentication failed:", error);
			if(error.message) {
				swal("Can't login", error.message, "error");
			} else {
				swal("Can't create account", "Try it again later", "error");
			}
		});
	}
});