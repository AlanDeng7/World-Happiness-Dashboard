// define the initial dataColumn and title
var dataColumn = "Migrating into the country(combined)";
var title = "<b>Migrating into the country(combined)</b>";

// create a function to update the plots when the year and data type are changed
function updatePlots(year, dataType) {
    // select the appropriate column based on the data type
    if (dataType === "Combined") {
        dataColumn = "Migrating into the country(combined)";
        title = `<b>Migrating into the country(combined) till ${year}</b>`;
    } else if (dataType === "Males") {
        dataColumn = "Migrating into the country(males)";
        title = `<b>Migrating into the country(males) till ${year}</b>`;
    } else if (dataType === "Females") {
        dataColumn = "Migrating into the country(females)";
        title = `<b>Migrating into the country(females) till ${year}</b>`;
    }

    // filter the data by the selected year and data type
    var filteredData = data.filter(d => d.Year == year && d[dataColumn] != "");

    // update the locations and z values in the mapData array
    mapData[0].locations = filteredData.map(d => d.Country);
    mapData[0].z = filteredData.map(d => d[dataColumn]);

    // update the colorbar title and map title
    mapData[0].colorbar.title = "Migrants (" + dataType.toLowerCase() + ")";
    mapLayout.title = title;

    // update the choropleth map
    Plotly.newPlot('map', mapData, mapLayout);
}

// call the updatePlots function when the year or data type is changed
document.getElementById('year').addEventListener('change', function() {
    var dataType = document.getElementById('dataType').value;
    updatePlots(this.value, dataType);
});
document.getElementById('dataType').addEventListener('change', function() {
    var year = document.getElementById('year').value;
    updatePlots(year, this.value);
});


// define the data for the choropleth map
var mapData = [{
    type: 'choropleth',
    locationmode: 'country names',
    locations: data.map(d => d.Country),
    z: data.map(d => d['Migrating into the country(combined)']),
    colorscale: 'YlOrRd',
    autocolorscale: false,
    reversescale: true,
    marker: {
        line: {
            color: 'rgb(255,255,255)',
            width: 1
        }
    },
    colorbar: {
        title: 'Migrants (combined)',
        len: 0.5,
        thickness: 10
    }
}];

// define the layout for the choropleth map
var mapLayout = {
    title: title,
    geo: {
        showframe: false,
        showcoastlines: false,
        projection: {
            type: 'mercator'
        }
    }
};

// create the choropleth map
Plotly.newPlot('map', mapData, mapLayout);
