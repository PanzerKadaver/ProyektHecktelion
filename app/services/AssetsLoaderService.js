hecktelionServices.service('AssetsLoader', ['$q', function ($q) {
	var loader = new createjs.LoadQueue(false);
	var manifestsToLoad = [];
	var assetsLoaded = [];

	this.init = function () {
		loader.setMaxConnections(1);
		loader.maintainScriptOrder = true;
		loader.setFileDelay(250);
		manifestsToLoad.length = 0;
	};

	this.getLoader = function () {
		return loader;
	}

	this.getResult = function (value, raw) {
		return loader.getResult(value, raw);
	}

	this.getManifests = function () {
		return manifestsToLoad;
	}

	this.getAssetsArray = function () {
		return assetsLoaded;
	}

	this.getAssetById = function (id) {
		for (var i = 0; i < assetsLoaded.length; i++) {
			if (assetsLoaded[i].id == id)
				return assetsLoaded[i];
		};
		return undefined;
	}

	this.getImageById = function (id) {
		var _img = this.getAssetById(id);

		if (_img)
			return _img.data.attributes.getNamedItem("src").nodeValue
		return "";
	}

	this.load = function () {
		loader.load();
	}

	/** Manifests-file format :
		{
			manifest: [
				{src: "<ManifestPath>", callback: "load<ManifestName>", type: createjs.AbstractLoader.JSONP}
			],
			path: "<Folder path which contain manifest(s)>"
		}
	**/
	/** Single Manifest format :
		load<ManifestName>({
			name: "<ManifestName>",
			manifest: [
				{id : "<FileId>", src: "<FilePath>"},
			],
			path: "<Folder path which contain file(s)>"
		})
	**/
	this.readManifests = function (manifests) {
		var defered = $q.defer();

		(function (_defered, _loader, _manifests) {
			_loader.on('complete', function (event) {
				_defered.resolve({type: event.type, timestamp: event.timeStamp});
			});
			_loader.on('error', function (event) {
				_defered.reject({type: event.type, title: event.title, message: event.message, data: event.data, timestamp: event.timeStamp});
			});
			_loader.on('fileload', function (event) {
				_defered.notify({type: event.type, item: event.item, result: event.result, timestamp: event.timeStamp});
			});
			_loader.on('loadstart', function (event) {
				_defered.notify({type: event.type, timestamp: event.timeStamp});
			});
			_loader.on('progress', function (event) {
				_defered.notify({type: event.type, progress: event.progress, loaded: event.loaded, total: event.total, timestamp: event.timeStamp});
			});

			_loader.loadManifest(_manifests, false);

		})(defered, this.getLoader(), manifests);

		return defered.promise;
	};

	/** Manifest to push format :
		{
			name: "<ManifestName>",
			manifest: [
				{id : "<FileId>", src: "<FilePath>"},
			],
			path: "<Folder path which contain file(s)>"
		}
	**/
	this.pushManifest = function (manifest) {
		manifestsToLoad.push(manifest);
	};

	this.nextManifest = function () {
		if (manifestsToLoad.length == 0)
			return null;
		return manifestsToLoad.shift();
	};

	this.loadManifest = function (manifest) {
		var defered = $q.defer();

		(function (_defered, _loader, _manifest) {
			_loader.on('complete', function (event) {
				_defered.resolve({type: event.type, timestamp: event.timeStamp});
			});
			_loader.on('error', function (event) {
				_defered.reject({type: event.type, title: event.title, message: event.message, data: event.data, timestamp: event.timeStamp});
			});
			_loader.on('loadstart', function (event) {
				_defered.notify({type: event.type, timestamp: event.timeStamp});
			});
			_loader.on('fileload', function (event) {
				_defered.notify({type: event.type, item: event.item, result: event.result, timestamp: event.timeStamp});
			});
			_loader.on('progress', function (event) {
				_defered.notify({type: event.type, progress: event.progress, loaded: event.loaded, total: event.total, timestamp: event.timeStamp});
			});

			_loader.loadManifest(_manifest, false);

		})(defered, this.getLoader(), manifest);

		return defered.promise;
	};

	this.pushAsset = function (asset) {
		assetsLoaded.push(asset);
	}
}]);