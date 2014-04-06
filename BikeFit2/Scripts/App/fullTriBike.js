
(function () {
    require.config({
        paths: {
        }
    });

    define('jquery', function () { return jQuery; });
    define('knockout', ko);

    define(['services/logger', "services/datacontext"],
        function (logger, datacontext) {

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

                var frame = createFrame('Bike', 'bike', 'black');

                var vm = {
                    activate: activate,
                    frame: frame,
                    manufacturers: manufacturers,
                    title: 'Full Bike'
                };

                return vm;

                //#region Internal Methods
                function activate() {
                    var manufacturesPromise = datacontext.lookups.manufacturers();
                    logger.log('Frames View Activated', null, 'frames', false);

                    return $.when(manufacturesPromise).then(function (results) {
                        manufacturers(results);
                    });
                }

                function createFrame(name, canvasName, color) {
                    var manufacturer = ko.observable();
                    manufacturer.subscribe(function (newValue) {
                        datacontext.getBikeModels(models, newValue.manufacturerID());
                    });

                    var models = ko.observableArray();
                    var model = ko.observable();
                    model.subscribe(function (newValue) {
                        datacontext.getBikeSizes(sizes, newValue.bikeModelID());
                        size(sizes()[0]);


                    });

                    var sizes = ko.observableArray();
                    var size = ko.observable();
                    size.subscribe(function (newValue) {
                        drawFrame(newValue);

                        newValue.headSetTopCap.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.steeringSpacers.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.stemThickness.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.stemAngle.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.stemLength.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.aeroBarSpacers.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.armPadSpacers.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.armPadOffset.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.bbToSeatDistance.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.seatLength.subscribe(function () {
                            drawFrame(newValue);
                        });
                        newValue.seatTubeAngle.subscribe(function () {
                            drawFrame(newValue);
                        });

                    });

                    var output = {
                        color: color,
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

                            // create headset stack
                            ctx.beginPath();
                            ctx.moveTo(localSize.headTubeTopXloc(), localSize.headTubeTopYloc());
                            ctx.lineTo(localSize.stemSteeringCenterXLocation(), localSize.stemSteeringCenterYLocation());
                            ctx.strokeStyle = color;
                            ctx.stroke();
                            // Create stem
                            ctx.beginPath();
                            ctx.moveTo(localSize.stemSteeringCenterXLocation(), localSize.stemSteeringCenterYLocation());
                            ctx.lineTo(localSize.stemEndCenterXLocation(), localSize.stemEndCenterYLocation());
                            ctx.strokeStyle = color;
                            ctx.stroke();
                            // create arm pads
                            ctx.beginPath();
                            ctx.moveTo(localSize.padCenterXLocation() - 5, localSize.padCenterYLocation());
                            ctx.lineTo(localSize.padCenterXLocation() + 5, localSize.padCenterYLocation());
                            ctx.strokeStyle = color;
                            ctx.stroke();
                            // create aero bar
                            ctx.beginPath();
                            ctx.moveTo(localSize.aeroBarStartXLocation(), localSize.aeroBarStartYLocation());
                            ctx.lineTo(localSize.aeroBarStartXLocation() + 30, localSize.aeroBarStartYLocation());
                            ctx.strokeStyle = color;
                            ctx.stroke();
                            // create seat tube
                            ctx.beginPath();
                            ctx.moveTo(localSize.seatTubeXloc(), localSize.seatTubeYloc());
                            ctx.lineTo(localSize.seatXLocation(), localSize.seatYLocation());
                            ctx.strokeStyle = color;
                            ctx.stroke();
                            // Create seat
                            ctx.beginPath();
                            ctx.moveTo(localSize.seatXLocation() - localSize.seatLength() / 2, localSize.seatYLocation());
                            ctx.lineTo(localSize.seatXLocation() + localSize.seatLength() / 2, localSize.seatYLocation());
                            ctx.strokeStyle = color;
                            ctx.stroke();
                        }
                    }
                }
                //#endregion
            }
        });
})();