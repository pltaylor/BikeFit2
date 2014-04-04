(function () {
    require.config({
        paths: {
        }
    });

    define('jquery', function () { return jQuery; });
    define('knockout', ko);

    define(['services/datacontext', 'services/logger'], boot);

    function boot(datacontext, logger) {
        return datacontext.primeData()
                .fail(failedInitialization);

        function failedInitialization(error) {
            var msg = 'App initialization failed: ' + error.message;
            logger.logError(msg, error, true);
        }
    }
})();