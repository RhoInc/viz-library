const settings = {};

d3.csv('../../data/safetyData/ADBDS.csv', function(data) {
    safetyShiftPlot('#safety-shift-plot .content', settings)
        .init(data);
});
