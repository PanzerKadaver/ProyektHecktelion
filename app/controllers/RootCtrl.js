hecktelionControllers.controller('RootCtrl', ['$rootScope', '$scope', 'AssetsLoader', function ($rootScope, $scope, AssetsLoader) {
	$rootScope.version = "v0.0.10";
	$rootScope.nextScreen = "";

	$rootScope.gui = require('nw.gui');
	$rootScope.win = $rootScope.gui.Window.get();
	$rootScope.gui.Screen.Init();
	$rootScope.screen = $rootScope.gui.Screen;

	$rootScope.fakeFullscreen = function () {
		var currentScreen = $rootScope.screen.screens[0];

		if (currentScreen.bounds.height <= 900 && currentScreen.bounds.width <= 1600)
			$rootScope.win.enterFullscreen();
	}

	$rootScope.fakeFullscreen();
	AssetsLoader.init(100);
}]);