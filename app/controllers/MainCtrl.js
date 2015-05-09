hecktelionControllers.controller('MainCtrl', ['$rootScope', '$scope', 'AssetsLoader', function ($rootScope, $scope, AssetsLoader) {
	$scope.version = $rootScope.version;

	$scope.assets = {
		background: AssetsLoader.getImageById("background_1"),
		title: AssetsLoader.getImageById("title")
	};
}]);