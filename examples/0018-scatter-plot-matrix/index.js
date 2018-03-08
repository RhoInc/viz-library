
function toggleDetails(){
  var details = document.getElementById("vl-ex-details");
  if (details.style.display === "none") {
      details.style.display = "block";
  } else {
      details.style.display = "none";
    }
}

function openTab(evt, id) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}

function toggleDetails(){
  var details = document.getElementById("vl-ex-details");
  if (details.style.display === "none") {
      details.style.display = "block";
  } else {
      details.style.display = "none";
    }
}

/*------------------------------------------------------------------------------------------------\
  Iris Measurements
\------------------------------------------------------------------------------------------------*/

    var element3 = '#iris';
    var dataPath3 = '../../data/iris.csv';
    var settings3 = {
        keys: ['observation'],
        measure_col: 'dimension',
        measures: ['sepal length', 'sepal width', 'petal length', 'petal width'],
        result_col: 'length',
        group_col: 'species',
        size: 200,
        padding: 20};

    d3.csv(dataPath3, function(data) {
        var transposed = [];
        data.forEach((d,i) => {
                settings3.measures.forEach(measure => {
                    transposed.push(
                        {observation: i
                        ,dimension: measure
                        ,length: d[measure]
                        ,species: d.species});
                });
            });

        scatterPlotMatrix
            (element3
            ,transposed
            ,settings3);
    });

/*------------------------------------------------------------------------------------------------\
  Vital Signs
\------------------------------------------------------------------------------------------------*/

    var element1 = '#VS';
    var dataPath1 = '../../data/safetyData/SDTM/VS.csv';
    var settings1 = {
        keys: ['USUBJID', 'VISIT'],
        measure_col: 'VSTEST',
        result_col: 'VSSTRESN',
        group_col: 'site',
        size: 200,
        padding: 20};

    d3.csv(dataPath1, function(data) {
        data.forEach(function(d) {
                d.VSSTRESN = +d.VSSTRESN;
                d.site = d.USUBJID.split('-')[0];
                d.VSSTNRLO = +d.VSSTNRLO;
                d.VSSTNRHI = +d.VSSTNRHI;
                d.level = d.VSSTRESN >= d.VSSTNRLO && d.VSSTRESN <= d.VSSTNRHI
                    ? 'Normal'
                    : d.VSSTRESN < d.VSSTNRLO
                        ? 'Low'
                        : 'High';
            });

        scatterPlotMatrix
            (element1
            ,data.filter(d => d.VISIT === 'Screening')
            ,settings1);
    });

/*------------------------------------------------------------------------------------------------\
  Liver Function Tests
\------------------------------------------------------------------------------------------------*/

    var element2 = '#hy';
    var dataPath2 = '../0016-safety-outlier-explorer-hys-law/hy.csv';
    var settings2 = {
        keys: ['USUBJID', 'VISIT'],
        measure_col: 'TEST',
        result_col: 'STRESN',
        group_col: 'VISIT',
        size: 200,
        padding: 20};

    d3.csv(dataPath2, function(data) {
        data.forEach(function(d) {
                d.site = d.USUBJID.split('-')[0];
            });

        scatterPlotMatrix
            (element2
            ,data
            ,settings2);
    });
