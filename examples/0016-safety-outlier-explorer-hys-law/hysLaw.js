const settings = {};

d3.csv('hy.csv', function(data) {
    safetyOutlierExplorer('#safety-outlier-explorer .content', settings)
        .init(data);
});
