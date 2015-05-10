hecktelionControllers.controller('MainCtrl', ['$rootScope', '$scope', 'AssetsLoader', function ($rootScope, $scope, AssetsLoader) {
	$scope.version = $rootScope.version;

	$scope.assets = {
		background: AssetsLoader.getImageById("background_1"),
		title: AssetsLoader.getImageById("title")
	};

	$scope.functions = {
		quit: function () {
			var win = $rootScope.gui.Window.get();
			win.close();
		}
	};

	$scope.menu = {
		newGame: {
			text: "Nouvelle Partie",
			fct: undefined
		},
		loadGame: {
			text: "Charger Partie",
			fct: undefined
		},
		options: {
			text: "Options",
			fct: undefined,
		},
		exit: {
			text: "Quitter",
			fct: $scope.functions.quit
		}
	};
}]);