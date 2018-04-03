const settings = {};

d3.csv('../../data/safetyData/ADBDS.csv', function(data) {
    safetyOutlierExplorer('#safety-outlier-explorer .content', settings)
        .init(data);
});
