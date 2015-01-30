app.controller("homeController", function($scope, $firebase, $http) {
    var sync = $firebase($scope.fb.child("albums"));
    $scope.albumList = sync.$asArray();
    $scope.range = function(n) {
    	if(!n) {
    		n = 0;
    	}
        return new Array(n);
    };

	$scope.rateAlbum = function(index, album) {
		var uid = $scope.authObj.$getAuth().uid;
		if(uid) {
			var vote = index + 1; // index offset
			album.ratings = album.ratings || {};
			album.ratings[uid] = vote;
			$scope.albumList.$save(album);
		}
	};

	$scope.getRating = function(albumObj) {
		if(!albumObj.ratings) {
			return 0;
		}

		var ratings = 0;
		var sum = 0;
		angular.forEach(albumObj.ratings, function(value){
			sum = sum + value;
			ratings++;
		});

		if(sum === 0) {
			return 0;
		}

		return Math.round(sum/ratings);
	}
});