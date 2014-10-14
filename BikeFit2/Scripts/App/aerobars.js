﻿(function () {
    require.config({
        paths: {

        }
    });

    define('jquery', function () { return jQuery; });
    define('knockout', ko);

    define(['services/datacontext', 'services/logger', 'config'], boot);

    function boot(datacontext, logger, config) {
        Q.all([applyViewModel()])
            .fail(failedInitialization);

        function failedInitialization(error) {
            var msg = 'App initialization failed: ' + error.message;
            logger.logError(msg, error, true);
        }

        function applyViewModel() {
            var vm = viewModel();
            vm.activate();

            ko.applyBindings(vm);
        }

        function viewModel() {
            var manufacturers = ko.observableArray();

            var aerobarTypes = ko.observableArray();

            var aerobar1 = createAerobar('Aerobar 1', 'aerobar1', 'blue');
            var aerobar2 = createAerobar('Aerobar 2', 'aerobar2', 'green');
            var aerobar3 = createAerobar('Aerobar 3', 'aerobar3', 'gray');

            var vm = {
                activate: activate,
                aerobarTypes: aerobarTypes,
                aerobar1: aerobar1,
                aerobar2: aerobar2,
                aerobar3: aerobar3,
                manufacturers: manufacturers,
                title: 'Aerobars'
            };

            return vm;

            //#region Internal Methods
            function activate() {
                logger.log('Aerobar View Activated', null, false);
                $('.preloader').remove();

                return $.when(datacontext.getAerobarManufacturers(manufacturers));
            }

            function createAerobar(name, canvasName, color) {

                var manufacturer = ko.observable();
                manufacturer.subscribe(function (newValue) {
                    datacontext.getAerobarModels(models, newValue.manufacturerID());
                    model(models()[0]);
                });

                var models = ko.observableArray();
                var model = ko.observable();
                model.subscribe(function (newValue) {
                    if (newValue != null) {

                        aerobarHeights(newValue.aerobarHeights());
                        aerobarHeights.sort(function (l, r) { return l.height() > r.height() ? 1 : -1; });
                        aerobarHeight(aerobarHeights()[0]);

                        padHeights(newValue.padHeights());
                        padHeights.sort(function (l, r) { return l.height() > r.height() ? 1 : -1; });
                        padHeight(padHeights()[0]);

                        padWidths(newValue.padWidths());
                        padWidths.sort(function (l, r) { return l.width() > r.width() ? 1 : -1; });
                        padWidth(padWidths()[0]);

                        padReaches(newValue.padReaches());
                        padReaches.sort(function (l, r) { return l.reach() > r.reach() ? 1 : -1; });
                        padReach(padReaches()[0]);

                        stems(newValue.stems());
                        stems.sort(function (l, r) { return l.length() > r.length() ? 1 : -1; });
                        stem(stems()[0]);

                        drawAerobar(output);
                    }
                });

                var aerobarHeights = ko.observableArray();
                var aerobarHeight = ko.observable();

                var padHeights = ko.observableArray();
                var padHeight = ko.observable();

                var padWidths = ko.observableArray();
                var padWidth = ko.observable();

                var padReaches = ko.observableArray();
                var padReach = ko.observable();

                var stems = ko.observableArray();
                var stem = ko.observable();


                var output = {
                    aerobarHeights: aerobarHeights,
                    aerobarHeight: aerobarHeight,
                    padHeights: padHeights,
                    padHeight: padHeight,
                    padWidths: padWidths,
                    padWidth: padWidth,
                    padReaches: padReaches,
                    padReach: padReach,
                    color: color,
                    manufacturer: manufacturer,
                    models: models,
                    model: model,
                    name: name,
                    stem: stem,
                    stems: stems
                };
                return output;

                function drawAerobar(localAerobar) {
                    if (localAerobar == null) {
                        return;
                    }

                    // calculate positions
                    localAerobar.headTubeTopXloc = ko.computed(function () {
                        return config.xOffset(0.0);
                    });
                    localAerobar.headTubeTopYloc = ko.computed(function () {
                        return config.yOffset(0.0);
                    });
                    localAerobar.headTubeAngle = ko.observable(73);
                    localAerobar.stemSteeringCenterXLocation = ko.computed(function () {
                        var totalHeight = parseFloat(localAerobar.stem().clampHeight()) / 2;
                        var xDelta = Math.sin((90 - localAerobar.headTubeAngle()) * (Math.PI / 180)) * (totalHeight * config.scalingFactor);
                        return localAerobar.headTubeTopXloc() - xDelta;
                    });

                    localAerobar.stemSteeringCenterYLocation = ko.computed(function () {
                        var totalHeight = parseFloat(localAerobar.stem().clampHeight()) / 2;
                        var yDelta = Math.cos((90 - localAerobar.headTubeAngle()) * (Math.PI / 180)) * (totalHeight * config.scalingFactor);
                        return localAerobar.headTubeTopYloc() - yDelta;
                    });

                    localAerobar.stemEndCenterXLocation = ko.computed(function () {
                        var angle = (localAerobar.stem().angle()) - localAerobar.headTubeAngle();
                        var xDelta = Math.sin(angle * (Math.PI / 180)) * localAerobar.stem().length() * config.scalingFactor;
                        return localAerobar.stemSteeringCenterXLocation() - xDelta;
                    });

                    localAerobar.stemEndCenterYLocation = ko.computed(function () {
                        var angle = (localAerobar.stem().angle()) - localAerobar.headTubeAngle();
                        var yDelta = Math.cos(angle * (Math.PI / 180)) * localAerobar.stem().length() * config.scalingFactor;
                        return localAerobar.stemSteeringCenterYLocation() - yDelta;
                    });

                    localAerobar.padCenterXLocation = ko.computed(function () {
                        return localAerobar.stemEndCenterXLocation() + localAerobar.padReach() * config.scalingFactor;
                    });

                    localAerobar.padCenterYLocation = ko.computed(function () {
                        return localAerobar.stemEndCenterYLocation() - localAerobar.padHeight() * config.scalingFactor;
                    });

                    localAerobar.aeroBarStartXLocation = ko.computed(function () {
                        return localAerobar.stemEndCenterXLocation() * config.scalingFactor;
                    });

                    localAerobar.aeroBarStartYLocation = ko.computed(function () {
                        return localAerobar.stemEndCenterYLocation() - localAerobar.aerobarHeight() * config.scalingFactor;
                    });

                    var drawingCanvas = document.getElementById(canvasName);
                    if (drawingCanvas.getContext) {
                        var ctx = drawingCanvas.getContext('2d');
                        // clear
                        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

                        // Create stem
                        ctx.beginPath();
                        ctx.moveTo(localAerobar.stemSteeringCenterXLocation(), localAerobar.stemSteeringCenterYLocation());
                        ctx.lineTo(localAerobar.stemEndCenterXLocation(), localAerobar.stemEndCenterYLocation());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create arm pads
                        ctx.beginPath();
                        ctx.moveTo(localAerobar.padCenterXLocation() - 5, localAerobar.padCenterYLocation());
                        ctx.lineTo(localAerobar.padCenterXLocation() + 5, localAerobar.padCenterYLocation());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create aero bar
                        ctx.beginPath();
                        ctx.moveTo(localAerobar.aeroBarStartXLocation(), localAerobar.aeroBarStartYLocation());
                        ctx.lineTo(localAerobar.aeroBarStartXLocation() + 30, localAerobar.aeroBarStartYLocation());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                    }
                }
            }
            //#endregion
        };
    };
})();