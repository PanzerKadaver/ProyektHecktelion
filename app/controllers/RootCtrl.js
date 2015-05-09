hecktelionControllers.controller('RootCtrl', ['$rootScope', '$scope', 'AssetsLoader', function ($rootScope, $scope, AssetsLoader) {
	$rootScope.version = "v0.0.6";
	$rootScope.nextScreen = "";

	AssetsLoader.init();
}]);