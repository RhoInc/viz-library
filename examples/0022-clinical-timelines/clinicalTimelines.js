var settings = {
  //ID settings
    id_col: 'USUBJID',
    id_unit: 'participant',
    id_characteristics: null,

  //Event settings
    event_col: 'DOMAIN',
    event_types: ['Adverse Events', 'Concomitant Medications', 'Randomization', 'Study Completion'],
    event_highlighted: 'Randomization',
    event_highlight_color: 'black',

  //Filter settings
    filters: [
        {value_col: 'ARM', label: 'Arm'},
        {value_col: 'SEX', label: 'Sex'},
        {value_col: 'RACE', label: 'Race'}
    ],

  //Grouping settings
    groupings: [
        {value_col: 'SITEID', label: 'Site ID'},
        {value_col: 'ARM', label: 'Arm'},
        {value_col: 'SEX', label: 'Sex'},
        {value_col: 'RACE', label: 'Race'},
        {value_col: 'AGE', label: 'Age'}
    ],
    grouping_initial: 'SITEID',
    grouping_direction: 'horizontal',

  //Timing settings
    time_scale: 'day',

      //Date settings
        stdt_col: 'STDT',
        endt_col: 'ENDT',
        date_range: null,
        date_format: '%Y-%m-%d',
        date_display_format: '%b %y', // sync in syncSettings()

      //Day settings
        stdy_col: 'STDY',
        endy_col: 'ENDY',
        day_range: null,

  //Miscellaneous settings
    seq_col: 'SEQ',
    tooltip_col: 'TOOLTIP',
    ongo_col: 'ONGO',
    ongo_val: 'Y',
    reference_lines: [
        {timepoint: 56, label: 'Randomization'},
        {timepoint: '2016-01-01', label: 'Enrollment Halfway Point'}
    ],
    range_band: 50,

  //Listing settings
    details: null,
    details_config: null,
};
d3.csv('../../data/safetyData/ADTIMELINES.csv', function(data) {
    clinicalTimelines('.chart', settings)
        .init(data);
});
