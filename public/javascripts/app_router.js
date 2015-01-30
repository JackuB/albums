app.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state("a", {
			abstract: true,
			templateUrl: "templates/main.html",
		})
		.state("a.home", {
			url: "/",
			templateUrl: "templates/home.html",
			controller: "homeController"
		})
		.state("a.login", {
			url: "/login",
			templateUrl: "templates/login.html",
			controller: "loginController"
		})
		.state("a.signup", {
			url: "/signup",
			templateUrl: "templates/signup.html",
			controller: "signupController"
		})
		.state("a.addAlbum", {
			url: "/addAlbum",
			templateUrl: "templates/addAlbum.html",
			controller: "addAlbumController"
		});

	$urlRouterProvider.otherwise("/");
});