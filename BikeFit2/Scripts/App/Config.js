define(function () {

    var remoteServiceName = '../breeze/breeze';

    function xOffset(input) {
        return input + 250;
    }

    function yOffset(input) {
        return (200 - input);
    }

    var scalingFactor = .22;

    var aeroScalingFactor = 1.0;

    return {
        remoteServiceName: remoteServiceName,
        aeroScalingFactor: aeroScalingFactor,
        scalingFactor: scalingFactor,
        xOffset: xOffset,
        yOffset: yOffset
    };
});