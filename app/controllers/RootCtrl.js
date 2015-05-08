hecktelionControllers.controller('RootCtrl', ['$rootScope', '$scope', 'AssetsLoader', function ($rootScope, $scope, AssetsLoader) {
	$rootScope.version = "v0.0.5";

	AssetsLoader.init();
}]);