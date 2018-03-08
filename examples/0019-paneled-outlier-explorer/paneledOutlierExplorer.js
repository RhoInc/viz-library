let settings = {
    measure_col: 'VSTEST',
    time_col: 'VSDY',
    value_col: 'VSSTRESN'
};
let chart = paneledOutlierExplorer('#container', {});
d3.csv('../../data/hys_law.csv', function(data) {
    chart.init(data);
});
