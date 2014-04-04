(function () {
    require.config({
        paths: {
        }
    });

    // Durandal 2.x assumes no global libraries. It will ship expecting 
    // Knockout and jQuery to be defined with requirejs. .NET 
    // templates by default will set them up as standard script
    // libs and then register them with require as follows: 
    define('jquery', function () { return jQuery; });
    define('knockout', ko);

    define(['services/logger']);
})();