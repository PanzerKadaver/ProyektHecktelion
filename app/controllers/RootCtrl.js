hecktelionControllers.controller('RootCtrl', ['$rootScope', '$scope', 'AssetsLoader', function ($rootScope, $scope, AssetsLoader) {
	$rootScope.version = "v0.0.9";
	$rootScope.nextScreen = "";
	$rootScope.gui = require('nw.gui');

	AssetsLoader.init();
}]);