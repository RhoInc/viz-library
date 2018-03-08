var dataElement = ".example-viz";
var dataPath = "primary_outcome_determination_24NOV.csv"
var settings = {
   "denominator":[
       {"type":"cat","positive":["1"],"name":"Stratum (char)","head":"Stratum"},
       {"type":"cat","positive":["1"],"name":"Treatment Group (char)","head":"Treatment Group"},
       {"type":"cat","positive":["1"],"name":"Outcome determination","head":"Outcome Determination"},
       {"type":"cat","positive":["1"],"name":"Outcome of OFC","head":"Outcome of OFC"},
       {"type":"cat","positive":["1"],"name":"Cummulative or Incremental","head":"Cumulative? "},
       {"type":"cat","positive":["1"],"name":"Mixed or Seperate","head":"Mixed/Separate?"},
       {"type":"cat","positive":["1"],"name":"Challenge Type","head":"Challenge Type"},
       {"type":"cat","positive":["1"],"name":"Serious AE Associated with Challenge?","head":"SAE associated with challenge?"},
       {"type":"cat","positive":["1"],"name":"Visit Number","head":"Visit"},
       {"type":"cat","positive":["1"],"name":"Peanut Rxn AE Severity (char)","head":"Peanut Rxn AE Severity"}],
   "numerator":[
       {"type":"num","positive":["1"],"name":"Arah1 Result","head":"Arah 1 Result"},
       {"type":"num","positive":["1"],"name":"Arah2 Result","head":"Arah 2 Result"},
       {"type":"num","positive":["1"],"name":"Arah3 Result","head":"Arah 3 Result"},
       {"type":"num","positive":["1"],"name":"Peanut IgE","head":"Peanut IgE"},
       {"type":"num","positive":["1"],"name":"Peanut SPT Wheal","head":"Peanut SPT Wheal"}],
   "rowUnits":"participant visits",
   "viz":true,
   "participantTable":{
       "cols":[
           "Subject ID","Stratum (char)","Treatment Group (char)","Study Flag","Visit Number","Outcome of OFC",
           "Serious AE Associated with Challenge?", "Peanut Rxn AE Severity (char)","Peanut IgE","Peanut SPT Wheal",
           "Arah1 Result","Arah2 Result","Arah3 Result","Cummulative or Incremental", "Mixed or Seperate","Challenge Type",
           "Confluent erythematout pruritic rash","Respiratory Signs","3 or more urticarial lesions","1 or more sites of angioedema",
           "Hypotension","Severe abdominal pain for 3+ minutes","Vomitting","Diarrhea","Rubbing or nose or eyes for 3+ minutes",
           "Rhinorrhea that lasts for 3+ minutes","Scratching that lasts for 3+ minutes", "Hospitalization","Important Medical Even",
           "Prolonged Hospitalization"
       ],
   "start":1,
   "n":10,
   "paginate":true}
}

d3.csv(dataPath,function(error,raw){
   //fill in blank values with "N/A"
   var columns = d3.keys(raw[0]);
   raw.forEach(function(row){
       columns.forEach(function(col){
           if(row[col]==""){row[col]=" N/A"}
       })
   })

   popExplore.init(dataElement,raw,settings);
});
