angular.module('show', [])
  .controller('MainCtrl', [
    '$scope','$http',
    function($scope,$http){
      $scope.shows = [];
      $scope.addShow = function() {
	var newshow = {title:$scope.showTitle, url:$scope.showImage, type:$scope.showType, upvotes:0};
	$scope.showTitle='';
	$scope.showImage='';
	$scope.showType='';
	$http.post('/shows', newshow).success(function(data) {
	  $scope.shows.push(data);
	});
    };
    $scope.upvote = function(show) {
      return $http.put('/shows/' + show._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          show.upvotes = data.upvotes;
        });
    };
	$scope.incrementUpvotes = function(show) {
	  $scope.upvote(show);
    };
    $scope.getAll = function() {
      return $http.get('/shows').success(function(data){
        angular.copy(data, $scope.shows);
      });
    };
    $scope.getAll();

  }
]);

