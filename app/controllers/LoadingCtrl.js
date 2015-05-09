hecktelionControllers.controller('LoadingCtrl', ['$rootScope', '$scope', '$state', '$timeout', 'AssetsLoader', function ($rootScope, $scope, $state, $timeout, AssetsLoader) {
	$scope.loading = {
		state: "in progress...",
		complete: false,
		pending: true,
		background: "",
		manifests: {
			state: "pending...",
			complete: false,
			pending: true,
			loaded: [],
			current: 0,
			total: 0
		},
		files: {
			state: "pending...",
			total: 0,
			current: 0,
			complete: false,
			pending: true
		}
	};

	$scope.nextScreen = function () {
		$rootScope.nextScreen = "main";
		$state.go("transition");
	}

	$scope.getLoadingBackground = function () {
		var asset = AssetsLoader.getAssetById("loadingBackground");

		if (asset)
			$scope.loading.background = asset.data.attributes.getNamedItem("src").nodeValue;
	}

	$scope.readManifests = function (manifests) {
		var promise = AssetsLoader.readManifests(manifests);

		$scope.loading.manifests.state = "in progress...";

		promise.then(function (resolve) {
			//console.log('resolve', resolve);

			$scope.loading.manifests.complete = true;
			$scope.loading.manifests.pending = false;
			$scope.loading.manifests.state = "complete !"

			$scope.loadManifest(AssetsLoader.nextManifest());
		}, function (reject) {
			console.log('reject', reject);
		}, function (notify) {
			switch (notify.type) {
				case 'loadstart':
					console.log('loadstart');
					break;
				case 'progress':
					//console.log('progress');
					break;
				case 'fileload':
					//console.log('fileload', notify);

					$scope.loading.files.total += notify.result.manifest.length;
					$scope.loading.manifests.total += 1;

					AssetsLoader.pushManifest(notify.result);
					break;
			};
		});

		AssetsLoader.load();
	};

	$scope.loadManifest = function (manifest) {
		var promise = AssetsLoader.loadManifest(manifest);
		var nextManifest = AssetsLoader.nextManifest();
		var currentManifest = {};

		$scope.loading.manifests.loaded.push({
			name: manifest.name,
			state: "in progress...",
			current: 0,
			complete: false,
			pending: true,
			total: manifest.manifest.length,
			files: []
		});
		currentManifest = $scope.loading.manifests.loaded[$scope.loading.manifests.current];

		promise.then(function (resolve) {
			//console.log('resolve', resolve);
			currentManifest.complete = true;
			currentManifest.pending = false;
			currentManifest.state = "complete !";
			$scope.loading.manifests.current += 1;

			if (nextManifest)
				$scope.loadManifest(nextManifest);
			else
			{
				$scope.loading.complete = true;
				$scope.loading.pending = false;
				$scope.loading.files.complete = true;
				$scope.loading.pending = false;
				$scope.loading.files.state = "complete !"
				$scope.loading.state = "complete !"
				$timeout(function (_scope) {
					_scope.nextScreen();
				}, 1000, true, $scope);
			}
		}, function (reject) {
			console.log('reject', reject);
		}, function (notify) {
			switch (notify.type) {
				case 'loadstart':
					console.log('loadstart');
				case 'progress':
					//console.log('progress');
					break;
				case 'fileload':
					//console.log('fileload', notify);

					currentManifest.files.push({name: notify.item.src.substr(notify.item.path.length, notify.item.src.length)});
					$scope.loading.files.current += 1;
					currentManifest.current += 1;

					AssetsLoader.pushAsset({type: notify.item.type, id: notify.item.id, data: notify.result});

					if (notify.item.type == "image" && $scope.loading.background == "")
						$scope.getLoadingBackground();
					break;
			};
		});

		AssetsLoader.load();
	}

	$scope.readManifests({
		manifest : [
			{src: "baseStyleManifest.json", callback: "loadBaseStyle", type: createjs.AbstractLoader.JSONP},
			{src: "loadingManifest.json", callback: "loadLoading", type: createjs.AbstractLoader.JSONP},
			{src: "animateManifest.json", callback: "loadAnimate", type: createjs.AbstractLoader.JSONP},
			{src: "mainMenuManifest.json", callback: "loadMainMenu", type: createjs.AbstractLoader.JSONP},
			{src: "controllersManifest.json", callback: "loadControllers", type: createjs.AbstractLoader.JSONP}
		],
		path: "manifests/"
	});
}]);