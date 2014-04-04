define([],
    function () {
        var logger = {
            log: log,
            logError: logError
        };

        return logger;

        function log(message, data, showToast) {
            logIt(message, data, showToast, 'info');
        }

        function logError(message, data, showToast) {
            logIt(message, data, showToast, 'error');
        }

        function logIt(message, data, showToast, toastType) {
            if (showToast) {
                if (toastType === 'error') {
                    toastr.error(message);
                } else {
                    toastr.info(message);
                }

            }

        }
    });