hecktelionControllers.controller('RootCtrl', ['$rootScope', '$scope', 'AssetsLoader', function ($rootScope, $scope, AssetsLoader) {
	$rootScope.version = "v0.0.8";
	$rootScope.nextScreen = "";

	AssetsLoader.init();
}]);