const settings =
    {measure: 'STRESN'
    ,panel: 'RACE'
    ,margin:
        {left: 125}};

d3.csv('../../data/safetyData/ADBDS.csv', function(data) {
    spikeHistogram('#container .chart .content', settings)
        .init(data
            .filter(function(d) {
                return d.TEST === 'Albumin'; }));
});
