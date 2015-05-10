hecktelionControllers.controller('MainCtrl', ['$rootScope', '$scope', '$state', 'AssetsLoader', function ($rootScope, $scope, $state, AssetsLoader) {
	$scope.version = $rootScope.version;

	$scope.assets = {
		background: AssetsLoader.getImageById("background_1"),
		title: AssetsLoader.getImageById("title")
	};

	$scope.functions = {
		quit: function () {
			$rootScope.nextScreen = "quit";
			$state.go("transition");
		}
	};

	$scope.menu = {
		newGame: {
			text: "Nouvelle Partie",
			fct: undefined,
			hover: false
		},
		loadGame: {
			text: "Charger Partie",
			fct: undefined,
			hover: false
		},
		options: {
			text: "Options",
			fct: undefined,
			hover: false
		},
		exit: {
			text: "Quitter",
			fct: $scope.functions.quit,
			hover: false
		}
	};
}]);