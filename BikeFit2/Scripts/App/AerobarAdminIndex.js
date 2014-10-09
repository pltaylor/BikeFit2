(function () {
    require.config({
        paths: {
        }
    });

    define('jquery', function () { return jQuery; });
    define('knockout', ko);

    define(['services/datacontext',
        'services/logger'],
    function (datacontext, logger) {

        Q.all([applyViewModel()])
               .fail(failedInitialization);

        function failedInitialization(error) {
            var msg = 'App initialization failed: ' + error.message;
            logger.logError(msg, error, true);
        }

        function applyViewModel() {
            var vm = viewModel();
            vm.activate()
                .then(
                function () {
                    applyBindings(vm);
                });
        }

        function applyBindings(vm) {
            ko.applyBindings(vm);
            logger.log("Bindings Applied", null, true);
        }

        function viewModel() {
            var manufacturers = ko.observableArray();
            var manufacturer = ko.observable();
            var isSaving = ko.observable(false);
            var models = ko.observableArray();

            //manufacturer.subscribe(function (newValue) {
                //datacontext.getBikeModelsWithSizes(modelsWithSizes, newValue.manufacturerID());});
        

            var createNewModel = function () {
                var manufacturerId = this.manu().manufacturerID();
                var result = datacontext.createNewAerobarModel(manufacturerId);
                return models.push(result);
            };

            var hasChanges = ko.computed(function () {
                return datacontext.hasChanges();
            });

            var cancel = function () {
                var rejectedChanges = datacontext.cancelChanges();
                for (var i = 0; i < models().length; i++) {
                    model()[i].sizes.valueHasMutated();
                }

                for (var j = 0; j < rejectedChanges.length; j++) {
                    models.remove(rejectedChanges[j]);
                }
            };

            var canSave = ko.computed(function () {
                return hasChanges() && !isSaving();
            });

            var save = function () {
                isSaving(true);
                return datacontext.saveChanges().fin(complete);

                function complete() {
                    isSaving(false);
                }
            };

            var canCreateNewModel = ko.computed(function () {
                if (manufacturer() == null) {
                    return false;
                }
                var manufacturerId = manufacturer().manufacturerID();
                if (manufacturerId == '00000000-0000-0000-0000-000000000000') {
                    return false;
                }
                return true;
            });

            var canDeactivate = function () {
                if (hasChanges()) {
                    var title = 'Do you want to leave ?';
                    var msg = 'Navigate away and cancel your changes?';
                    var checkAnswer = function (selectedOption) {
                        if (selectedOption === 'Yes') {
                            cancel();
                        }
                        return selectedOption;
                    };
                    return app.showMessage(title, msg, ['Yes', 'No'])
                        .then(checkAnswer);

                }
                return true;
            };

            var vm = {
                activate: activate,
                cancel: cancel,
                canCreateNewModel: canCreateNewModel,
                canDeactivate: canDeactivate,
                canSave: canSave,
                createNewModel: createNewModel,
                hasChanges: hasChanges,
                manu: manufacturer,
                manufacturers: manufacturers,
                models: models,
                save: save
            };

            return vm;

            //#region Internal Methods
            function activate() {
                logger.log('Aero Bar Admin View Activated', null, 'frames', false);

                return datacontext.getAllAerobarManufacturers(manufacturers)
                    .then(function () {
                        manufacturer(manufacturers()[0]);
                    }).then(function () {
                        datacontext.getAerobarModels(models, manufacturers()[0].manufacturerID());
                    });
            }
        }

        //#endregion
    });
})();