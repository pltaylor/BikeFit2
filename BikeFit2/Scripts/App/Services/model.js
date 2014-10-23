define(['config'],
    function (config) {
        var entityNames = {
            bikeModel: 'BikeModel',
            bikeSize: 'BikeSize',
            manufacturer: 'Manufacturer',
            bikeType: 'BikeType',
            aeroBar: 'AerobarModel',
            aerobarManufacturer: 'AerobarManufacturer',
            baseBarWidth: 'BaseBarWidth',
            aerobarHeight: 'AerobarHeight',
            padHeight: 'PadHeight',
            padWidth: 'PadWidth',
            padReach: 'PadReach',
            stem: 'Stem'
        };

        var model = {
            configureMetadataStore: configureMetadataStore,
            createNullos: createNullos,
            entityNames: entityNames
        };

        return model;

        //#region Internal Methods
        function configureMetadataStore(metadataStore) {
            metadataStore.registerEntityTypeCtor(
                entityNames.manufacturer, null, manufacturerInitializer);
            metadataStore.registerEntityTypeCtor(
                entityNames.bikeModel, null, bikeModelInitializer);
            metadataStore.registerEntityTypeCtor(
                entityNames.bikeSize, null, bikeSizeInitializer);
            metadataStore.registerEntityTypeCtor(
                entityNames.bikeType, null, bikeTypeInitializer);
            metadataStore.registerEntityTypeCtor(
                entityNames.aeroBar, null, aerobarModelInitializer);
            metadataStore.registerEntityTypeCtor(
                entityNames.aerobarManufacturer, null, aerobarManufacturerInitializer);
            metadataStore.registerEntityTypeCtor(
                entityNames.stem, null, stemInitializer);
        }

        function createNullos(manager) {
            var unchanged = breeze.EntityState.Unchanged;
            
            createNullo(entityNames.manufacturer);

            function createNullo(entityName, values) {
                var abbr = entityName;
                if (entityName == 'Manufacturer') {
                    abbr = 'Mfg.';
                }
                var initialValues = values
                    || { name: ' Select a ' + abbr };
                return manager.createEntity(entityName, initialValues, unchanged);
            }

        }

        function stemInitializer(stem) {
            stem.formatedName = ko.computed(function() {
                return stem.length() + "mm x " + stem.angle() + "°";
            }, stem);
        }

        function aerobarManufacturerInitializer(aerobarManufacturer) {

        }

        function aerobarModelInitializer(aerobar) {
            
        }

        function manufacturerInitializer(manufacturer) {
            //Add computed observables here
        }

        function bikeTypeInitializer(bikeType) {
            //Add computed observables here
        }

        function bikeModelInitializer(bikeModel) {
            bikeModel.sizes = ko.observableArray();

            bikeModel.manufacturedStartDateFormatted = ko.computed({
                read: function () {
                    var manufacturedStartDate = bikeModel.manufacturedStartDate();
                    var calendar = moment(manufacturedStartDate).calendar();
                    return calendar;
                },
                write: function (value) {
                    var time = moment(value, "MM-DD-YYYY").toJSON();
                    bikeModel.manufacturedStartDate(time);
                },
                owner: bikeModel
            });
            
            bikeModel.manufacturedEndDateFormatted = ko.computed({
                read: function () {
                    return moment(bikeModel.manufacturedEndDate()).calendar();
                },
                write: function (value) {
                    var time = moment(value, "MM-DD-YYYY").toJSON();
                    bikeModel.manufacturedEndDate(time);
                },
                owner: bikeModel
            });
        }

        function bikeSizeInitializer(bikeSize) {

            // based off a 700cc wheel with a 23mm tire and 650 wheel with 23mm tire
            bikeSize.wheelRadius = ko.computed(function () {
                var radius;
                if (bikeSize.wheelSize() == "SevenHundred") {
                    radius = 668 / 2;
                } else {
                    radius = 617.0 / 2;
                }
                return radius * config.scalingFactor;
            });

            bikeSize.bbXloc = ko.computed(function () {
                return config.xOffset(0.0);
            });

            bikeSize.bbYloc = ko.computed(function () {
                return config.yOffset(bikeSize.wheelRadius() - (bikeSize.bottomBracketDrop() * config.scalingFactor));
            });

            bikeSize.headTubeTopXloc = ko.computed(function () {
                return bikeSize.bbXloc() + (bikeSize.reach() * config.scalingFactor);
            });

            bikeSize.headTubeTopYloc = ko.computed(function () {
                return bikeSize.bbYloc() - (bikeSize.stack() * config.scalingFactor);
            });

            bikeSize.headTubeBottomXloc = ko.computed(function () {
                var xDelta = Math.sin((90 - bikeSize.headTubeAngle()) * (Math.PI / 180)) * (bikeSize.headTubeLength() * config.scalingFactor);
                return bikeSize.headTubeTopXloc() + xDelta;
            });

            bikeSize.headTubeBottomYloc = ko.computed(function () {
                var yDelta = Math.cos((90 - bikeSize.headTubeAngle()) * (Math.PI / 180)) * (bikeSize.headTubeLength() * config.scalingFactor);
                return bikeSize.headTubeTopYloc() + yDelta;
            });

            bikeSize.rearWheelXloc = ko.computed(function () {
                return config.xOffset(-Math.sqrt(Math.pow(bikeSize.rearCenter(), 2) - Math.pow(bikeSize.bottomBracketDrop(), 2)) * config.scalingFactor);
            });

            bikeSize.rearWheelYloc = ko.computed(function () {
                return config.yOffset(bikeSize.wheelRadius());
            });

            bikeSize.frontWheelXloc = ko.computed(function () {
                return config.xOffset(Math.sqrt(Math.pow(bikeSize.frontCenter(), 2) - Math.pow(bikeSize.bottomBracketDrop(), 2)) * config.scalingFactor);
            });

            bikeSize.frontWheelYloc = ko.computed(function () {
                return config.yOffset(bikeSize.wheelRadius());
            });

            bikeSize.avgSeatTubeAngle = ko.computed(function () {
                return (bikeSize.maxSeatAngle() + bikeSize.minSeatAngle()) / 2;
            });

            bikeSize.seatTubeXloc = ko.computed(function () {
                var xDelta = Math.tan((90 - bikeSize.avgSeatTubeAngle()) * (Math.PI / 180)) * bikeSize.stack();
                return bikeSize.bbXloc() - (xDelta * config.scalingFactor);
            });

            bikeSize.seatTubeYloc = ko.computed(function () {
                return bikeSize.headTubeTopYloc();
            });

            bikeSize.wheelSizeFormatted = ko.computed(function () {
                if (bikeSize.wheelSize() == "SevenHundred") {
                    return "700c";
                } else {
                    return "650c";
                }
            });

            bikeSize.stackFormatted = ko.computed(function () {
                return bikeSize.stack() + 'mm';
            });

            bikeSize.reachFormatted = ko.computed(function () {
                return bikeSize.reach() + 'mm';
            });

            bikeSize.frontCenterFormatted = ko.computed(function () {
                return bikeSize.frontCenter() + 'mm';
            });

            bikeSize.rearCenterFormatted = ko.computed(function () {
                return bikeSize.rearCenter() + 'mm';
            });

            bikeSize.headTubeLengthFormatted = ko.computed(function () {
                return bikeSize.headTubeLength() + 'mm';
            });

            bikeSize.minSeatAngleFormatted = ko.computed(function () {
                return bikeSize.minSeatAngle() + '°';
            });

            bikeSize.maxSeatAngleFormatted = ko.computed(function () {
                return bikeSize.maxSeatAngle() + '°';
            });

            bikeSize.headSetTopCap = ko.observable(0);

            bikeSize.steeringSpacers = ko.observable(10);

            bikeSize.stemThickness = ko.observable(34);

            bikeSize.stemAngle = ko.observable(0);

            bikeSize.stemLength = ko.observable(90);

            bikeSize.aeroBarSpacers = ko.observable(0);

            bikeSize.armPadSpacers = ko.observable(0);

            bikeSize.armPadOffset = ko.observable(0);

            bikeSize.barReach = ko.observable(80);

            bikeSize.barDrop = ko.observable(128);

            bikeSize.stemSteeringCenterXLocation = ko.computed(function() {
                var totalHeight = parseFloat(bikeSize.headSetTopCap()) + parseFloat(bikeSize.steeringSpacers()) + parseFloat(bikeSize.stemThickness()) / 2;
                var xDelta = Math.sin((90 - bikeSize.headTubeAngle()) * (Math.PI / 180)) * (totalHeight * config.scalingFactor);
                return bikeSize.headTubeTopXloc() - xDelta;
            });
            
            bikeSize.stemSteeringCenterYLocation = ko.computed(function () {
                var totalHeight = parseFloat(bikeSize.headSetTopCap()) + parseFloat(bikeSize.steeringSpacers()) + parseFloat(bikeSize.stemThickness()) / 2;
                var yDelta = Math.cos((90 - bikeSize.headTubeAngle()) * (Math.PI / 180)) * (totalHeight * config.scalingFactor);
                return bikeSize.headTubeTopYloc() - yDelta;
            });

            bikeSize.stemEndCenterXLocation = ko.computed(function() {
                var angle = (bikeSize.stemAngle()) - bikeSize.headTubeAngle();
                var xDelta = Math.sin(angle * (Math.PI / 180)) * bikeSize.stemLength() * config.scalingFactor;
                return bikeSize.stemSteeringCenterXLocation() - xDelta;
            });

            bikeSize.stemEndCenterYLocation = ko.computed(function () {
                var angle = (bikeSize.stemAngle()) - bikeSize.headTubeAngle();
                var yDelta = Math.cos(angle * (Math.PI / 180)) * bikeSize.stemLength() * config.scalingFactor;
                return bikeSize.stemSteeringCenterYLocation() - yDelta;
            });

            bikeSize.padCenterXLocation = ko.computed(function() {
                return bikeSize.stemEndCenterXLocation() + bikeSize.armPadOffset() * config.scalingFactor;
            });

            bikeSize.padCenterYLocation = ko.computed(function () {
                return bikeSize.stemEndCenterYLocation() - bikeSize.armPadSpacers() * config.scalingFactor;
            });

            bikeSize.aeroBarStartXLocation = ko.computed(function() {
                return bikeSize.stemEndCenterXLocation() + bikeSize.armPadOffset() * config.scalingFactor;
            });

            bikeSize.aeroBarStartYLocation = ko.computed(function () {
                return bikeSize.stemEndCenterYLocation() - bikeSize.aeroBarSpacers() * config.scalingFactor;
            });

            bikeSize.padStack = ko.computed(function() {
                return Math.round(-(bikeSize.padCenterYLocation() - bikeSize.bbYloc()) / config.scalingFactor) + 'mm';
            });

            bikeSize.padReach = ko.computed(function() {
                return Math.round((bikeSize.padCenterXLocation() - bikeSize.bbXloc()) / config.scalingFactor) + 'mm';
            });

            bikeSize.bbToSeatDistance = ko.observable(650);

            bikeSize.seatLength = ko.observable(50);

            bikeSize.seatTubeAngle = ko.observable(bikeSize.avgSeatTubeAngle());

            bikeSize.seatXLocation = ko.computed(function() {
                var xDelta = Math.sin((90 - bikeSize.seatTubeAngle()) * (Math.PI / 180)) * (bikeSize.bbToSeatDistance() * config.scalingFactor);
                return bikeSize.bbXloc() - xDelta;
            });

            bikeSize.seatYLocation = ko.computed(function() {
                var yDelta = Math.cos((90 - bikeSize.seatTubeAngle()) * (Math.PI / 180)) * (bikeSize.bbToSeatDistance() * config.scalingFactor);
                return bikeSize.bbYloc() - yDelta;
            });
        }

        //#endregion
    });