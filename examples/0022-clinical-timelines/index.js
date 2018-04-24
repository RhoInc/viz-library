var settings = {
    time_scale: 'day',
    day_range: [-2, 377],
    event_types: ['Enrollment', 'Randomization', 'Study Completion', 'Adverse Events', 'Concomitant Medications'],
    event_symbols: [
        {events: ['Enrollment'], symbol: 'triangle', direction: 'right'},
        {events: ['Randomization'], symbol: 'diamond', direction: 'right'},
        {events: ['Study Completion'], symbol: 'triangle', direction: 'left'},
    ],
    mark_thickness: 10,
    range_band: 100,
    groupings: ['ARM', 'SITEID'],
    grouping_initial: 'ARM',
    grouping_direction: 'vertical',
    filters: ['SEX', 'RACE'],
};
d3.csv('../../data/safetyData/ADTIMELINES.csv', function(data) {
    clinicalTimelines('.chart', settings)
        .init(data);
});
