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

//data variables for each year
let data2015 = data.filter(filter2015);
let data2016 = data.filter(filter2016);
let data2017 = data.filter(filter2017);
let data2018 = data.filter(filter2018);
let data2019 = data.filter(filter2019);
let data2020 = data.filter(filter2020);

let sorted2015 = data2015.sort((firstCountry, secondCountry)=>secondCountry["Education Expenditure"] - firstCountry["Education Expenditure"] );
let sorted2016 = data2016.sort((firstCountry, secondCountry)=>secondCountry["Education Expenditure"] - firstCountry["Education Expenditure"] );
let sorted2017 = data2017.sort((firstCountry, secondCountry)=>secondCountry["Education Expenditure"] - firstCountry["Education Expenditure"] );
let sorted2018 = data2018.sort((firstCountry, secondCountry)=>secondCountry["Education Expenditure"] - firstCountry["Education Expenditure"] );
let sorted2019= data2019.sort((firstCountry, secondCountry)=>secondCountry["Education Expenditure"] - firstCountry["Education Expenditure"] );
let sorted2020= data2020.sort((firstCountry, secondCountry)=>secondCountry["Education Expenditure"] - firstCountry["Education Expenditure"] );

let filtered2015 = sorted2015.filter(country =>country["Education Expenditure"] !== null);
let filtered2016 = sorted2016.filter(country =>country["Education Expenditure"] !== null);
let filtered2017 = sorted2017.filter(country =>country["Education Expenditure"] !== null);
let filtered2018 = sorted2018.filter(country =>country["Education Expenditure"] !== null);
let filtered2019 = sorted2019.filter(country =>country["Education Expenditure"] !== null);
let filtered2020 = sorted2020.filter(country =>country["Education Expenditure"] !== null);

//call function selYear when year is changed
d3.selectAll("#selDataset").on("change", selYear);

//initial function to generate default charts and graphs
function init() {

  let xLabelsTop = filtered2015.slice(0, 10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`);
  let xLabelsBot = filtered2015.slice(-10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`);

  //default top 10 countries bar chart
  var trace1 = {
    x: xLabelsTop,
    y: filtered2015.map(items => items["Education Expenditure"]).slice(0, 10),
    name: 'Education Expenditure (% of Country\'s GDP)',
    type: 'bar'
  };

  var data1 = [trace1];
  var layout = {barmode: 'stack'};
  Plotly.newPlot('age_bar_top', data1, layout);

  //default bot 10 countries bar chart
  var trace6 = {
    x: xLabelsBot,
    y: filtered2015.map(items => items["Education Expenditure"]).slice(-10),
    name: 'Education Expenditure (% of Country\'s GDP)',
    type: 'bar'
  };
  
  var data2 = [trace6];
  var layout = {barmode: 'stack'};
  Plotly.newPlot('age_bar_bot', data2, layout);
}

//function to redraw graphs and charts
function selYear() {
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");

  // Assign the value of the dropdown menu option to a variable
  let curYear = dropdownMenu.property("value");

  //empty data array 
  let data =[];

  //set data depending on selected year
  if (curYear === '2015') {data = filtered2015;}
  else if (curYear === '2016') {data = filtered2016;}
  else if (curYear === '2017') {data = filtered2017;}
  else if (curYear === '2018') {data = filtered2018;}
  else if (curYear === '2019') {data = filtered2019;}
  else if (curYear === '2020') {data = filtered2020;}

  
  //map top 10 countries and age group into list 
  let TopCountry = data.slice(0, 10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`);
  let EE = data.map(items => items["Education Expenditure"]).slice(0, 10);


  //map bot 10 countries and age group into list 
  let BotCountry = data.slice(-10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`);
  let lastEE = data.map(items => items["Education Expenditure"]).slice(-10);

  //update top 10 country bar chart
  Plotly.update('age_bar_top', {
    x: [TopCountry],
    y: [EE] 
  });

  //update bot 10 country bar chart
  Plotly.update('age_bar_bot', {
    x: [BotCountry],
    y: [lastEE] 
  });
}

init();