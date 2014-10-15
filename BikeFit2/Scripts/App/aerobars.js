(function () {
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

                        if (newValue.aeroBarType().type().indexOf("Stem") > -1) {
                            showStemOptions(false);
                        } else {
                            showStemOptions(true);
                            stemLength(90);
                            stemAngle(-17);
                            stemClampHeight(30);
                        }

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
                aerobarHeight.subscribe(function () { drawAerobar(output); });

                var padHeights = ko.observableArray();
                var padHeight = ko.observable();
                padHeight.subscribe(function () { drawAerobar(output); });

                var padWidths = ko.observableArray();
                var padWidth = ko.observable();
                padWidth.subscribe(function () { drawAerobar(output); });

                var padReaches = ko.observableArray();
                var padReach = ko.observable();
                padReach.subscribe(function () { drawAerobar(output); });

                var stems = ko.observableArray();
                var stem = ko.observable();
                stem.subscribe(function (newValue) {
                    stemLength(newValue.length());
                    stemAngle(newValue.angle());
                    stemClampHeight(newValue.clampHeight());
                    drawAerobar(output);
                });

                var padStackFormatted = ko.observable(0);
                var padReachFormatted = ko.observable(0);
                var aerobarStackFormatted = ko.observable(0);
                var headTubeAngle = ko.observable(73);
                headTubeAngle.subscribe(function () { drawAerobar(output); });

                var stemLength = ko.observable(0);
                stemLength.subscribe(function () { drawAerobar(output); });
                var stemAngle = ko.observable(0);
                stemAngle.subscribe(function () { drawAerobar(output); });
                var stemClampHeight = ko.observable(0);
                stemClampHeight.subscribe(function () { drawAerobar(output); });

                var showStemOptions = ko.observable(true);
                var showStemDropdown = ko.computed(function () { return !showStemOptions(); });

                var output = {
                    aerobarHeights: aerobarHeights,
                    aerobarHeight: aerobarHeight,
                    headTubeAngle: headTubeAngle,
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
                    stems: stems,
                    padStackFormatted: padStackFormatted,
                    padReachFormatted: padReachFormatted,
                    aerobarStackFormatted: aerobarStackFormatted,
                    stemLength : stemLength,
                    stemAngle :stemAngle,
                    stemClampHeight: stemClampHeight,
                    showStemOptions: showStemOptions,
                    showStemDropdown: showStemDropdown

                };
                return output;

                function drawAerobar(localAerobar) {
                    if (localAerobar == null) {
                        return;
                    }
                    if (localAerobar.padReaches().length < 1) {
                        return;
                    }
                    // calculate positions
                    localAerobar.headTubeTopXloc = ko.computed(function () {
                        return config.xOffset(-200.0);
                    });
                    localAerobar.headTubeTopYloc = ko.computed(function () {
                        return config.yOffset(0.0);
                    });

                    localAerobar.stemSteeringTopXLocation = ko.computed(function () {
                        var totalHeight = parseFloat(localAerobar.stemClampHeight());
                        var xDelta = Math.sin((90 - localAerobar.headTubeAngle()) * (Math.PI / 180)) * (totalHeight * config.aeroScalingFactor);
                        return localAerobar.headTubeTopXloc() - xDelta;
                    });

                    localAerobar.stemSteeringTopYLocation = ko.computed(function () {
                        var totalHeight = parseFloat(localAerobar.stemClampHeight());
                        var yDelta = Math.cos((90 - localAerobar.headTubeAngle()) * (Math.PI / 180)) * (totalHeight * config.aeroScalingFactor);
                        return localAerobar.headTubeTopYloc() - yDelta;
                    });

                    localAerobar.stemSteeringCenterXLocation = ko.computed(function () {
                        var totalHeight = parseFloat(localAerobar.stemClampHeight()) / 2;
                        var xDelta = Math.sin((90 - localAerobar.headTubeAngle()) * (Math.PI / 180)) * (totalHeight * config.aeroScalingFactor);
                        return localAerobar.headTubeTopXloc() - xDelta;
                    });

                    localAerobar.stemSteeringCenterYLocation = ko.computed(function () {
                        var totalHeight = parseFloat(localAerobar.stemClampHeight()) / 2;
                        var yDelta = Math.cos((90 - localAerobar.headTubeAngle()) * (Math.PI / 180)) * (totalHeight * config.aeroScalingFactor);
                        return localAerobar.headTubeTopYloc() - yDelta;
                    });

                    localAerobar.stemEndCenterXLocation = ko.computed(function () {
                        var angle = (localAerobar.stemAngle()) - localAerobar.headTubeAngle();
                        var xDelta = Math.sin(angle * (Math.PI / 180)) * localAerobar.stemLength() * config.aeroScalingFactor;
                        return localAerobar.stemSteeringCenterXLocation() - xDelta;
                    });

                    localAerobar.stemEndCenterYLocation = ko.computed(function () {
                        var angle = (localAerobar.stemAngle()) - localAerobar.headTubeAngle();
                        var yDelta = Math.cos(angle * (Math.PI / 180)) * localAerobar.stemLength() * config.aeroScalingFactor;
                        return localAerobar.stemSteeringCenterYLocation() - yDelta;
                    });

                    localAerobar.padCenterXLocation = ko.computed(function () {
                        return localAerobar.stemEndCenterXLocation() + localAerobar.padReach().reach() * config.aeroScalingFactor;
                    });

                    localAerobar.padCenterYLocation = ko.computed(function () {
                        return localAerobar.stemEndCenterYLocation() - localAerobar.padHeight().height() * config.aeroScalingFactor;
                    });

                    localAerobar.aeroBarStartXLocation = ko.computed(function () {
                        return localAerobar.stemEndCenterXLocation();
                    });

                    localAerobar.aeroBarStartYLocation = ko.computed(function () {
                        return localAerobar.stemEndCenterYLocation() - localAerobar.aerobarHeight().height() * config.aeroScalingFactor;
                    });

                    padStackFormatted(Math.round(-(localAerobar.padCenterYLocation() - localAerobar.headTubeTopYloc()) / config.aeroScalingFactor) + 'mm');
                    padReachFormatted(Math.round((localAerobar.padCenterXLocation() - localAerobar.headTubeTopXloc()) / config.aeroScalingFactor) + 'mm');
                    aerobarStackFormatted(Math.round(-(localAerobar.aeroBarStartYLocation() - localAerobar.headTubeTopYloc()) / config.aeroScalingFactor) + 'mm');

                    var drawingCanvas = document.getElementById(canvasName);
                    if (drawingCanvas.getContext) {
                        var ctx = drawingCanvas.getContext('2d');
                        // clear
                        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);

                        // Create stem clamp
                        ctx.beginPath();
                        ctx.moveTo(localAerobar.headTubeTopXloc(), localAerobar.headTubeTopYloc());
                        ctx.lineTo(localAerobar.stemSteeringTopXLocation(), localAerobar.stemSteeringTopYLocation());
                        ctx.lineWidth = 15 * config.aeroScalingFactor;
                        ctx.strokeStyle = color;
                        ctx.stroke();

                        // Create stem
                        ctx.beginPath();
                        ctx.moveTo(localAerobar.stemSteeringCenterXLocation(), localAerobar.stemSteeringCenterYLocation());
                        ctx.lineTo(localAerobar.stemEndCenterXLocation(), localAerobar.stemEndCenterYLocation());
                        ctx.lineWidth = 10 * config.aeroScalingFactor;
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create arm pads
                        ctx.beginPath();
                        ctx.moveTo(localAerobar.padCenterXLocation() - 10, localAerobar.padCenterYLocation());
                        ctx.lineTo(localAerobar.padCenterXLocation() + 10, localAerobar.padCenterYLocation());
                        ctx.lineWidth = 4 * config.aeroScalingFactor;
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create aero bar
                        ctx.beginPath();
                        ctx.moveTo(localAerobar.aeroBarStartXLocation(), localAerobar.aeroBarStartYLocation());
                        ctx.lineTo(localAerobar.aeroBarStartXLocation() + 200 * config.aeroScalingFactor, localAerobar.aeroBarStartYLocation());
                        ctx.lineWidth = 3 * config.aeroScalingFactor;
                        ctx.strokeStyle = color;
                        ctx.stroke();
                    }
                }
            }
            //#endregion
        };
    };
})();