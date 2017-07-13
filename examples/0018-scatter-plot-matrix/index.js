var element = '#scatter-lattice';
var dataPath = '../../data/safetyData/LB.csv';
var dataPath = '../0016-safety-outlier-explorer-hys-law/hy.csv';
var settings = {
    measure_col: 'LBTEST',
    result_col: 'LBSTRESN',
    group_col: 'SITE',
    size: 200,
    padding: 20};
var settings = {
    measure_col: 'TEST',
    result_col: 'STRESN',
    group_col: 'VISIT',
    size: 200,
    padding: 20};

d3.csv(dataPath, function(data) {
    data.forEach(function(d) {
            d.SITE = d.USUBJID.split('-')[0];
        });
    settings.measures = d3.set(
            data.map(d => d[settings.measure_col]))
        .values()
        //.filter(measure =>
        //    ['Alkaline phosphatase (ALP)'
        //    ,'Aminotransferase, alanine (ALT)'
        //    ,'Aminotransferase, aspartate (AST)'
        //    ,'Total Bilirubin'].indexOf(measure) > -1);
    var nested = d3.nest()
        .key(d => d['USUBJID'] + '|' + d['ARM'])
        .key(d => d['VISIT'])
        .rollup(d => {
            var results = {};
            d.forEach(di => {
                var measure = di[settings.measure_col];
                results[measure] = di[settings.result_col];
            });
            return results;
        })
        .entries(data);
    var transposed = [];
    nested.forEach(USUBJID => {
        USUBJID.values.forEach(VISIT => {
            VISIT.values.USUBJID = USUBJID.key.split('|')[0];
            VISIT.values.ARM = USUBJID.key.split('|')[1];
            VISIT.values.VISIT = VISIT.key;
            transposed.push(VISIT.values);
        });
    });

    //scatterPlotMatrix
    //    (element
    //    ,'../../data/iris.csv'
    //    ,['sepal length', 'sepal width', 'petal length', 'petal width']
    //    ,'species');
    var HysLaw = scatterPlotMatrix
        (element
        ,transposed
        ,settings);
});

