const settings = {};

d3.csv('../../data/safetyData/ADBDS.csv', function(data) {
    safetyResultsOverTime('#safety-results-over-time .content', settings)
        .init(data);
});
