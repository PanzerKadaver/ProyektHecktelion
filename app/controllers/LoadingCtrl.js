hecktelionControllers.controller('LoadingCtrl', ['$rootScope', '$scope', '$q', '$timeout', function ($rootScope, $scope, $q, $timeout) {
	$scope.state = "In Progress ";
	$scope.delay = 0;

	$scope.loadAssets = function (assets, fromManifest) {
		var loadPromise = $scope.asyncLoad($rootScope.AssetsLoader, assets);

		loadPromise.then(function (e) { // Load Complete
			if (fromManifest) {
				console.log("Manifests Complete");
				$scope.delay -= 100;
			}
			else {
				console.log("Complete");
			}
		}, function (e) { // Load Error
			console.log("Error :", e);
		}, function (e) { // File Loaded or Load Start
			console.log("File Loaded : ", e)
			if (!fromManifest) {
				$scope.state += "M";
				$timeout(function () {$scope.loadAssets(e.result, true)}, $scope.delay);
				$scope.delay += 100;
			}
			else
				$scope.state += "F";
		});
	};

	$scope.asyncLoad = function (loader, assets) {
		var defered = $q.defer();

		(function (d, l, a) {
			l.on("complete", function (e) {
				d.resolve(e);
			});
			l.on("error", function (e) {
				d.reject(e);
			});
			l.on("fileload", function (e) {
				d.notify({"item" : e.item, "result" : e.result});
			});

			l.loadManifest(a);

		})(defered, loader, assets);

		return (defered.promise);
	}

	$scope.loadAssets({
		"manifest" : [
			{src: "controllersManifest.json", callback: "loadControllers", type: createjs.AbstractLoader.JSONP},
			{src: "imagesManifest.json", callback: "loadImages", type: createjs.AbstractLoader.JSONP}
		],
		"path" : "manifests/"
	}, false);
}]);