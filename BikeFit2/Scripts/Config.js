define(function() {

    var remoteServiceName = 'breeze/breeze';

    function xOffset(input) {
        return input + 250;
    }

    function yOffset(input) {
        return (245 - input);
    }

    var scalingFactor = .22;

    return {
        remoteServiceName: remoteServiceName,
        scalingFactor: scalingFactor,
        xOffset: xOffset,
        yOffset: yOffset
    };
});