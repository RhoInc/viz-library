const settings = {};

d3.csv('../../data/safetyData/ADBDS.csv', function(data) {
    console.log(data)
    safetyHistogram('div.content', {}).init(data);
});
