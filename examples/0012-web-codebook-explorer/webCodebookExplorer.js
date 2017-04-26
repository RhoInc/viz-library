var settings = {files:
    [{label: 'Analysis AEs with Queries', path: '../../data/safetyData-queries/ADAE.csv', settings: {}}
    ,{label: 'Clinical Measures with Queries', path: '../../data/safetyData-queries/ADBDS.csv', settings: {}}
    ,{label: 'Analysis AEs', path: '../../data/safetyData/ADAE.csv', settings: {}}
    ,{label: 'Clinical Measures', path: '../../data/safetyData/ADBDS.csv', settings: {}}
    ,{label: 'Demographics', path: '../../data/safetyData/DM.csv', settings: {}}
    ,{label: 'Labs', path: '../../data/safetyData/LB.csv', settings: {}}
    ,{label: 'Vital Signs', path: '../../data/safetyData/VS.csv', settings: {}}
    ,{label: 'AEs', path: '../../data/safetyData/AE.csv', settings: {}}
    ,{label: 'Check Weight', path: '../../data/CheckWeight.csv', settings: {}}
    ,{label: 'Discrete Scores', path: '../../data/discrete_scores.csv', settings: {}}]};
var explorer = webcodebook.createExplorer(".explorer", settings).init();
