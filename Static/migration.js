// select the plot divs using their IDs
var plot1Div = document.getElementById('plot1');
var plot2Div = document.getElementById('plot2');
var plot3Div = document.getElementById('plot3');

// create a function to update the plots when the year and data type are changed
function updatePlots(year, dataType) {
    // select the appropriate column based on the data type
    var dataColumn = "";
    if (dataType === "Combined") {
        dataColumn = "Migrating into the country(combined)";
    } else if (dataType === "Males") {
        dataColumn = "Migrating into the country(males)";
    } else if (dataType === "Females") {
        dataColumn = "Migrating into the country(females)";
    }
    console.log(`Selected dataColumn: ${dataColumn}`);

    // filter the data by the selected year and data type
    var filteredData = data.filter(d => d.Year == year && d[dataColumn] != "");
    console.log(`Filtered data for year ${year} and dataType ${dataType}:`, filteredData);

    // sort the data by the selected column
    filteredData.sort((a, b) => b[dataColumn] - a[dataColumn]);

    // define a custom color scale
    var customColorScale = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b'];

    // create the first plot
    var plot1Data = [{
        x: filteredData.slice(0,10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`),
        y: filteredData.slice(0,10).map(d => d[dataColumn]),
        type: 'bar',
        marker: {
            color: filteredData.slice(0,10).map((d,i) => customColorScale[i % customColorScale.length])
        }
    }];
    console.log("Plot 1 data:", plot1Data);
    Plotly.newPlot(plot1Div, plot1Data, {
        title: `<b>Top ten countries favoured for immigration till ${year} (${dataType})</b>`
    });

    // select the appropriate column for the second plot based on the data type
    if (dataType === "Combined") {
        dataColumn = "Migrating from the country(combined)";
    } else if (dataType === "Males") {
        dataColumn = "Migrating from the country(males)";
    } else if (dataType === "Females") {
        dataColumn = "Migrating from the country(females)";
    }
    console.log(`Selected dataColumn for second plot: ${dataColumn}`);

    // filter the data by the selected year and data type
    var filteredData_1 = data.filter(d => d.Year == year && d[dataColumn] != "");
    console.log(`Filtered data for second plot:`, filteredData_1);
    // sort the data by the selected column
    filteredData_1.sort((a, b) => b[dataColumn] - a[dataColumn]);

    
    // create the second plot
    var plot2Data = [{
        x: filteredData_1.slice(0,10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`),
        y: filteredData_1.slice(0,10).map(d => d[dataColumn]),
        type: 'bar',
        marker: {
            color: filteredData_1.slice(0,10).map((d,i) => customColorScale[i % customColorScale.length])
        }
    }];
    console.log("Plot 2 data:", plot2Data);
    Plotly.newPlot(plot2Div, plot2Data, {
        title: `<b>Top ten countries favoured for emigration till ${year} (${dataType})</b>`
    });
}
// create a function to update the heatmap when the year and data type are changed
function createHeatmap(year, dataType) {
    // select the appropriate column based on the data type
    var dataColumn = "";
    if (dataType === "Combined") {
        dataColumn = "Migrating into the country(combined)";
    } else if (dataType === "Males") {
        dataColumn = "Migrating into the country(males)";
    } else if (dataType === "Females") {
        dataColumn = "Migrating into the country(females)";
    }
    console.log(`Selected dataColumn for heatmap: ${dataColumn}`);

    // filter the data by the selected year and data type
    var filteredData = data.filter(d => d.Year == year && d[dataColumn] != "");
    console.log(`Filtered data for heatmap:`, filteredData);

    // define the data for the heatmap
    var heatmapData = [{
        z: filteredData.map(d => d[dataColumn]),
        x: filteredData.map(d => d.Country),
        y: filteredData.map(d => d["Happiness Score"]),
        type: 'heatmap',
        colorscale: 'Viridis',
        zmax: 500
    }];
    console.log("Heatmap data:", heatmapData);
    // define the layout for the heatmap
    var heatmapLayout = {
        title: `<b>Happiness Score vs ${dataType} immigration till ${year}</b>`,
        xaxis: {
            title: "Country"
        },
        yaxis: {
            title: "Happiness Score"
        }
    };
    
    // create the heatmap
    Plotly.newPlot('plot3', heatmapData, heatmapLayout);
}

// call the createHeatmap function when the year or data type is changed
document.getElementById('year').addEventListener('change', function() {
    var dataType = document.getElementById('dataType').value;
    createHeatmap(this.value, dataType);
});
document.getElementById('dataType').addEventListener('change', function() {
    var year = document.getElementById('year').value;
    createHeatmap(year, this.value);
});

// initialize the heatmap with the default year and data type
createHeatmap(2015, "Combined");

// call the updatePlots function when the year or data type is changed
document.getElementById('year').addEventListener('change', function() {
    var dataType = document.getElementById('dataType').value;
    updatePlots(this.value, dataType);
});
document.getElementById('dataType').addEventListener('change', function() {
    var year = document.getElementById('year').value;
    updatePlots(year, this.value);
});

// call the updatePlots and createHeatmap functions with the default values
updatePlots(2015, "Combined");
