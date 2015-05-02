hecktelionApp.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/loading");

	$stateProvider
		.state('loading', {
			url: "/loading",
			templateUrl: "views/loading.html",
			controller: "LoadingCtrl"
		});
});