//to check if data is showing
//console.log(data);

//2015 data filter
function filter2015(data){return data["Year"]==2015;}
//2016 data filter
function filter2016(data){return data["Year"]==2016;}
//2017 data filter
function filter2017(data){return data["Year"]==2017;}
//2018 data filter
function filter2018(data){return data["Year"]==2018;}
//2019 data filter
function filter2019(data){return data["Year"]==2019;}
//2020 data filter
function filter2020(data){return data["Year"]==2020;}
//2021 data filter
function filter2021(data){return data["Year"]==2021;}

//data variables for each year 
let data2015 = data.filter(filter2015);
let data2016 = data.filter(filter2016);
let data2017 = data.filter(filter2017);
let data2018 = data.filter(filter2018);
let data2019 = data.filter(filter2019);
let data2020 = data.filter(filter2020);
let data2021 = data.filter(filter2021);

//map variable 
let map;

//call function selYear when year is changed
d3.selectAll("#selDataset").on("change", selYear);

// Create a custom filtering function
function selYear() {
    
    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    let curYear = dropdownMenu.property("value");

    //empty array to hold data
    let data =[];

    //set data depending on selected year
    if (curYear === '2015') {data = data2015;}
    else if (curYear === '2016') {data = data2016;}
    else if (curYear === '2017') {data = data2017;}
    else if (curYear === '2018') {data = data2018;}
    else if (curYear === '2019') {data = data2019;}
    else if (curYear === '2020') {data = data2020;}
    else if (curYear === '2021') {data = data2021;}

    //turn code and happiness score column into list 
    let code = data.map(items => items.Code);
    let score = data.map(items => items["Happiness Score"]);

    //happinessScore in dictionary for for jvectormap plugin
    var happinessScore = {};

    //get dictionary of code and happiness score
    for (var i = 0; i < data.length; i++) {
        happinessScore[code[i]] = score[i];
    }

    //if map is present, then remove the map and set map to null
    if (map) {
        map.vectorMap('get', 'mapObject').remove();
        map = null;
    }

    //draw map
    map = $('#world-map').vectorMap({
        map: 'world_mill',
        series: {
            regions: [{
                values: happinessScore,
                scale: ['#F50057','#40C4FF'],
                normalizeFunction: 'polynomial',
            legend: {
                    horizontal: true,
                    title: "Happiness Score"
                  }
            }]
        },
        onRegionTipShow: function(e, el, code){
            el.html(el.html()+' (Score: '+happinessScore[code]+')');
        }
    });

}
