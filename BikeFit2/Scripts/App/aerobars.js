(function () {
    require.config({
        paths: {

        }
    });

    define('jquery', function () { return jQuery; });
    define('knockout', ko);

    define(['services/datacontext', 'services/logger'], boot);

    function boot(datacontext, logger) {
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

                        drawFrame(newValue);
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

                function drawFrame(localSize) {

                    var drawingCanvas = document.getElementById(canvasName);
                    if (drawingCanvas.getContext) {
                        var ctx = drawingCanvas.getContext('2d');
                        // clear
                        //ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
                        //if (localSize == null) {
                        //    return;
                        //}
                        //// Create the rear wheel
                        //ctx.beginPath();
                        //ctx.arc(localSize.rearWheelXloc(), localSize.rearWheelYloc(), localSize.wheelRadius(), 0, Math.PI * 2, true);
                        //ctx.closePath();
                        //ctx.strokeStyle = color;
                        //ctx.stroke();
                        //// create front wheel
                        //ctx.beginPath();
                        //ctx.arc(localSize.frontWheelXloc(), localSize.frontWheelYloc(), localSize.wheelRadius(), 0, Math.PI * 2, true);
                        //ctx.closePath();
                        //ctx.strokeStyle = color;
                        //ctx.stroke();
                        //// create rear chainstay
                        //ctx.beginPath();
                        //ctx.moveTo(localSize.rearWheelXloc(), localSize.rearWheelYloc());
                        //ctx.lineTo(localSize.bbXloc(), localSize.bbYloc());
                        //ctx.strokeStyle = color;
                        //ctx.stroke();
                        //// create seat tube
                        //ctx.beginPath();
                        //ctx.moveTo(localSize.seatTubeXloc(), localSize.seatTubeYloc());
                        //ctx.lineTo(localSize.bbXloc(), localSize.bbYloc());
                        //ctx.strokeStyle = color;
                        //ctx.stroke();
                        //// create seat stay
                        //ctx.beginPath();
                        //ctx.moveTo(localSize.seatTubeXloc(), localSize.seatTubeYloc());
                        //ctx.lineTo(localSize.rearWheelXloc(), localSize.rearWheelYloc());
                        //ctx.strokeStyle = color;
                        //ctx.stroke();
                        //// create downtube
                        //ctx.beginPath();
                        //ctx.moveTo(localSize.bbXloc(), localSize.bbYloc());
                        //ctx.lineTo(localSize.headTubeBottomXloc(), localSize.headTubeBottomYloc());
                        //ctx.strokeStyle = color;
                        //ctx.stroke();
                        //// create toptube
                        //ctx.beginPath();
                        //ctx.moveTo(localSize.seatTubeXloc(), localSize.seatTubeYloc());
                        //ctx.lineTo(localSize.headTubeTopXloc(), localSize.headTubeTopYloc());
                        //ctx.strokeStyle = color;
                        //ctx.stroke();
                        //// create headtube
                        //ctx.beginPath();
                        //ctx.moveTo(localSize.headTubeTopXloc(), localSize.headTubeTopYloc());
                        //ctx.lineTo(localSize.headTubeBottomXloc(), localSize.headTubeBottomYloc());
                        //ctx.strokeStyle = color;
                        //ctx.stroke();
                        //// create fork
                        //ctx.beginPath();
                        //ctx.moveTo(localSize.frontWheelXloc(), localSize.frontWheelYloc());
                        //ctx.lineTo(localSize.headTubeBottomXloc(), localSize.headTubeBottomYloc());
                        //ctx.strokeStyle = color;
                        //ctx.stroke();
                    }
                }
            }
            //#endregion
        };
    };
})();