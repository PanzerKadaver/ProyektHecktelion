hecktelionApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/loading");

	$stateProvider
		.state('loading', {
			url: "/loading",
			templateUrl: "views/loading.html",
			controller: "LoadingCtrl"
		})
		.state('main', {
			url: "/main",
			templateUrl: "views/main.html",
			controller: "MainCtrl"
		});
});