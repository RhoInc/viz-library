var settings = {files:
    [{label: "ChickWeight", path: "../../data/ChickWeight.csv", settings: {}}
    ,{label: "discrete_scores", path: "../../data/discrete_scores.csv", settings: {}}
    ,{label: "fields", path: "../../data/queries/fields.csv", settings: {}}
    ,{label: "forms", path: "../../data/queries/forms.csv", settings: {}}
    ,{label: "queries", path: "../../data/queries/queries.csv", settings: {}}
    ,{label: "ADAE", path: "../../data/safetyData-queries/ADAE.csv", settings: {}}
    ,{label: "ADBDS", path: "../../data/safetyData-queries/ADBDS.csv", settings: {}}
    ,{label: "ADAE", path: "../../data/safetyData/ADAE.csv", settings: {}}
    ,{label: "ADBDS", path: "../../data/safetyData/ADBDS.csv", settings: {}}
    ,{label: "adverseEvents", path: "../../data/safetyData/adverseEvents.csv", settings: {}}
    ,{label: "AE", path: "../../data/safetyData/AE.csv", settings: {}}
    ,{label: "DM", path: "../../data/safetyData/DM.csv", settings: {}}
    ,{label: "labs", path: "../../data/safetyData/labs.csv", settings: {}}
    ,{label: "LB", path: "../../data/safetyData/LB.csv", settings: {}}
    ,{label: "scheduleOfEvents", path: "../../data/safetyData/scheduleOfEvents.csv", settings: {}}
    ,{label: "vitalSigns", path: "../../data/safetyData/vitalSigns.csv", settings: {}}
    ,{label: "VS", path: "../../data/safetyData/VS.csv", settings: {}}]};
var explorer = webcodebook.createExplorer(".explorer", settings).init();