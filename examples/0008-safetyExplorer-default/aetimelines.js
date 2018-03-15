const settings = {};

d3.csv('../../../data/safetyData/ADAE.csv', function(data) {
    aeTimelines('#ae-timelines .content', settings)
        .init(data);
});
