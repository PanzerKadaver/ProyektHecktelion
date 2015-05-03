hecktelionControllers.controller('RootCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
	$rootScope.version = "v0.0.3";

	$rootScope.AssetsLoader = new createjs.LoadQueue(false);
	$rootScope.AssetsLoader.setMaxConnections(1);
	$rootScope.AssetsLoader.maintainScriptOrder = true;
}]);