(function () {
    require.config({
        paths: {

        }
    });

    define('jquery', function () { return jQuery; });
    define('knockout', ko);

    define(['services/datacontext', 'services/logger'], boot);

    function boot(datacontext, logger) {
        datacontext.primeData()
            .then(applyViewModel)
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

            var bikeTypes = ko.observableArray();

            var frame1 = createFrame('Frame 1', 'bike1', 'blue');
            var frame2 = createFrame('Frame 2', 'bike2', 'green');
            var frame3 = createFrame('Frame 3', 'bike3', 'gray');

            var vm = {
                activate: activate,
                bikeTypes: bikeTypes,
                frame1: frame1,
                frame2: frame2,
                frame3: frame3,
                manufacturers: manufacturers,
                title: 'Frames'
            };

            return vm;

            //#region Internal Methods
            function activate() {
                var manufacturesPromise = datacontext.lookups.manufacturers();
                logger.log('Frames View Activated', null, false);
                $('.preloader').remove();

                return $.when(manufacturesPromise)
                    .then(function (results) {
                        manufacturers(results);
                    })
                    .then(function () {
                        datacontext.getBikeTypes(bikeTypes);
                    });
            }

            function createFrame(name, canvasName, color) {
                var bikeType = ko.observable();

                bikeType.subscribe(function () {
                    if (models().length != 0) {
                        models.removeAll();
                    }
                    if (sizes().length != 0) {
                        sizes.removeAll();
                    }
                    manufacturer(manufacturers()[0]);
                });

                var manufacturer = ko.observable();
                manufacturer.subscribe(function (newValue) {
                    datacontext.getBikeModels(models, newValue.manufacturerID(), bikeType());
                });

                var models = ko.observableArray();
                var model = ko.observable();
                model.subscribe(function (newValue) {
                    if (newValue != null) {
                        datacontext.getUniqueBikeSizes(sizes, newValue.bikeModelID());
                    }
                    size(sizes()[0]);
                });

                var sizes = ko.observableArray();
                var size = ko.observable();
                size.subscribe(function (newValue) {
                    drawFrame(newValue);
                });

                var output = {
                    color: color,
                    bikeType: bikeType,
                    manufacturer: manufacturer,
                    models: models,
                    model: model,
                    name: name,
                    sizes: sizes,
                    size: size
                };
                return output;

                function drawFrame(localSize) {

                    var drawingCanvas = document.getElementById(canvasName);
                    if (drawingCanvas.getContext) {
                        var ctx = drawingCanvas.getContext('2d');
                        // clear
                        ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
                        if (localSize == null) {
                            return;
                        }
                        // Create the rear wheel
                        ctx.beginPath();
                        ctx.arc(localSize.rearWheelXloc(), localSize.rearWheelYloc(), localSize.wheelRadius(), 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create front wheel
                        ctx.beginPath();
                        ctx.arc(localSize.frontWheelXloc(), localSize.frontWheelYloc(), localSize.wheelRadius(), 0, Math.PI * 2, true);
                        ctx.closePath();
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create rear chainstay
                        ctx.beginPath();
                        ctx.moveTo(localSize.rearWheelXloc(), localSize.rearWheelYloc());
                        ctx.lineTo(localSize.bbXloc(), localSize.bbYloc());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create seat tube
                        ctx.beginPath();
                        ctx.moveTo(localSize.seatTubeXloc(), localSize.seatTubeYloc());
                        ctx.lineTo(localSize.bbXloc(), localSize.bbYloc());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create seat stay
                        ctx.beginPath();
                        ctx.moveTo(localSize.seatTubeXloc(), localSize.seatTubeYloc());
                        ctx.lineTo(localSize.rearWheelXloc(), localSize.rearWheelYloc());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create downtube
                        ctx.beginPath();
                        ctx.moveTo(localSize.bbXloc(), localSize.bbYloc());
                        ctx.lineTo(localSize.headTubeBottomXloc(), localSize.headTubeBottomYloc());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create toptube
                        ctx.beginPath();
                        ctx.moveTo(localSize.seatTubeXloc(), localSize.seatTubeYloc());
                        ctx.lineTo(localSize.headTubeTopXloc(), localSize.headTubeTopYloc());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create headtube
                        ctx.beginPath();
                        ctx.moveTo(localSize.headTubeTopXloc(), localSize.headTubeTopYloc());
                        ctx.lineTo(localSize.headTubeBottomXloc(), localSize.headTubeBottomYloc());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                        // create fork
                        ctx.beginPath();
                        ctx.moveTo(localSize.frontWheelXloc(), localSize.frontWheelYloc());
                        ctx.lineTo(localSize.headTubeBottomXloc(), localSize.headTubeBottomYloc());
                        ctx.strokeStyle = color;
                        ctx.stroke();
                    }
                }
            }
            //#endregion
        };
    };
})();