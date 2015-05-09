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
		});
});