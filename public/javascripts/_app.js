var app = angular.module("albums", [
	"ui.router",
	"ngAnimate",
	"firebase"
]);

app.controller("mainController", function($scope, $firebaseAuth, $state) {
	$scope.fb = new Firebase("https://albums.firebaseio.com/");
	$scope.authObj = $firebaseAuth($scope.fb);

	$scope.authObj.$onAuth(function(authData) {
		if (authData) {
			console.log("Logged in as:", authData.uid);
			$scope.auth = $scope.authObj.$getAuth().uid;
		} else {
			console.log("Logged out");
			$scope.auth = false;
		}
	});

	$scope.logout = function() {
		$scope.authObj.$unauth();
		$state.go("a.home");
	}
});