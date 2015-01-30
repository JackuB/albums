app.controller("addAlbumController", function($scope, $http, $firebase, $state) {
	if(!$scope.auth) {
		$state.go("a.home");
	}

	$scope.formCalled = false;
	$scope.album = {
		title: "",
		artist: "",
		date: "",
		albumArt: "http://placehold.it/400x400"
	};

	function getAlbumMeta() {
		$http.post(window.location.origin + "/album", {string: $scope.album.title + " " + $scope.album.artist})
			.then(function(res) {
				if(res.data.resultCount > 0) {
					var foundAlbum = res.data.results[0];
					$scope.album.artist = foundAlbum.artistName;
					$scope.album.title = foundAlbum.collectionName;
					$scope.album.date = foundAlbum.releaseDate;
					$scope.album.albumArt = foundAlbum.artworkUrl100.replace("100x100-75.jpg", "400x400-75.jpg");
				} else {
					swal("No matches found", "You can still save your album, but it will lack album art", "error");
				}
				$scope.formCalled = true;
			})
			.catch(function(e) {
				swal("Server responded with something weird", "I blame ruby", "error");
			});
	}

	function saveAlbum() {
		$firebase($scope.fb.child("albums")).$asArray().$add($scope.album);
		$state.go("a.home");
		swal("Album saved", "Go vote for it now!", "success");
	}

	$scope.formAction = function() {
		if(!$scope.album.title || !$scope.album.artist) {
			swal("Fill in both fields", "Fill in album artist and album name", "error");
			return;
		}

		if(!$scope.formCalled) {
			getAlbumMeta();
			return;
		}

		saveAlbum();
	};
});