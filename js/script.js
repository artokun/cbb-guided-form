angular.module('myApp', ['ngMessages', 'ngAnimate'])
  .controller('searcherCtrl', function ($scope, $q, $http) {
    var client_id = '6cb80ad7a1434bbe9f2637b1d3bd644b';
    $scope.search = function () {
      var url = 'https://api.instagram.com/v1/tags/' + $scope.keyword + '/media/recent?client_id=' + client_id + '&callback=JSON_CALLBACK';
      var params = {
        method: 'JSONP',
        url: url
      };
      $scope.debug = url;
      $scope.searchingComplete = false;
      $scope.searchingFailed = false;
      $http(params)
        .success(function (response) {
          $scope.images = response.data;
          $scope.search.keyword = $scope.keyword;
          if ($scope.images.length == 0 ) {
            $scope.searchingFailed = true;
          } else {
            $scope.search.count = $scope.images.length;
            $scope.searchingComplete = true;
          }
          $scope.keyword = null;
          $scope.searchForm.$setPristine();
        })
        .error(function (error) {
          $scope.searchingComplete = false;
          $scope.searchingFailed2 = true;
          $scope.error = error.meta.code;
          //need to flesh this one out
        });
    };
  });