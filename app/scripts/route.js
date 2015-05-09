hecktelionApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/loading");

	$stateProvider
		.state('loading', {
			url: "/loading",
			templateUrl: "views/Loading/loading.html",
			controller: "LoadingCtrl"
		})
		.state('main', {
			url: "/main",
			templateUrl: "views/MainMenu/main.html",
			controller: "MainCtrl"
		})
		.state('transition', {
			url: "/transition",
			templateUrl: "views/transition.html",
			controller: function ($rootScope, $timeout, $state) {
				$timeout(function (_state, _screen) {
					_state.go(_screen);
				}, 1500, true, $state, $rootScope.nextScreen);
			}
		});
});