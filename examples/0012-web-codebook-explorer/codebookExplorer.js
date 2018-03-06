var settings = {
	labelColumn:"label",
	files:
    [{label: "Chick Weight", path: "../../data/ChickWeight.csv", settings: {}}
    ,{label: "Discrete Scores", path: "../../data/discrete_scores.csv", settings: {}}
    ,{label: "Fields", path: "../../data/queries/fields.csv", settings: {}}
    ,{label: "Forms", path: "../../data/queries/forms.csv", settings: {}}
    ,{label: "Queries", path: "../../data/queries/queries.csv", settings: {}}
    ,{label: "AEs with Queries", path: "../../data/safetyData-queries/ADAE.csv", settings: {}}
    ,{label: "Labs/Vitals with Queries", path: "../../data/safetyData-queries/ADBDS.csv", settings: {}}
    ,{label: "AEs", path: "../../data/safetyData/ADAE.csv", settings: {}}
    ,{label: "Labs/Vitals", path: "../../data/safetyData/ADBDS.csv", settings: {}}
    ,{label: "Demographics", path: "../../data/safetyData/DM.csv", settings: {}}
    ,{label: "Schedule Of Events", path: "../../data/safetyData/scheduleOfEvents.csv", settings: {}}
    ,{label: "Vital Signs", path: "../../data/safetyData/vitalSigns.csv", settings: {}}
    ]};

  var explorer = webcodebook.createExplorer(".explorer", settings).init();
