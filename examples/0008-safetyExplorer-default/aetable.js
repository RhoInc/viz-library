const settings = {
    defaults:{
        placeholderFlag:{
            value_col:"AEBODSYS",
            values:[""]
        }
    }
};

d3.csv('../../data/safetyData/ADAE.csv', function(data) {
    aeTable.createChart('#ae-table .content', settings)
        .init(data);
});
