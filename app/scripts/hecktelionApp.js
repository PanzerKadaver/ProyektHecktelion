var hecktelionApp = angular.module('hecktelionApp', ['ui.router', 'ngAnimate', 'hecktelionControllers', 'hecktelionServices']);

var hecktelionControllers = angular.module('hecktelionControllers', []);

var hecktelionServices = angular.module('hecktelionServices', []);

/* Allow forward loading */
hecktelionControllers.config(function ($controllerProvider) {
	hecktelionControllers._controller = hecktelionControllers.controller;

	hecktelionControllers.controller = function (name, constructor) {
		$controllerProvider.register(name, constructor);
		return this;
	};
});