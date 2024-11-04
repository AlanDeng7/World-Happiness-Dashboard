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

//call function selYear when year is changed
d3.selectAll("#selDataset").on("change", selYear);

//initial function to generate default charts and graphs
function init() {

  let countryTop = data2015.slice(0, 10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`);
  let countryBot = data2015.slice(-10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`);

  //default top 10 countries bar chart
  var trace1 = {
    x: countryTop,
    y: [1479263, 45322, 1064569, 844843, 5720374, 1107252, 3048357, 1929653, 667708, 3555144],
    name: 'Age 65+',
    type: 'bar'
  };
  var trace2 = {
    x: countryTop,
    y: [4635339, 171878, 2920956, 2742063, 19712742, 2831377, 9059636, 5001895, 2357478, 12614797],
    name: 'Age 25-64',
    type: 'bar'
  };
  var trace3 = {
    x: countryTop,
    y: [935987, 47073, 731475, 670175, 4497382, 644502, 2104973, 1208871, 645902, 3148141],
    name: 'Age 15-24',
    type: 'bar'
  };
  var trace4 = {
    x: countryTop,
    y: [810365, 44524, 666049, 626255, 3869501, 599061, 1940010, 1121155, 612762, 2947071],
    name: 'Age 5-14',
    type: 'bar'
  };
  var trace5 = {
    x: countryTop,
    y: [420781, 22271, 294746, 307021, 1932121, 297265, 888134, 587770, 306741, 1555088],
    name: 'Age < 5',
    type: 'bar'
  };
  var data = [trace1, trace2,trace3,trace4,trace5];
  var layout = {barmode: 'stack'};
  Plotly.newPlot('age_bar_top', data, layout);

  //default bot 10 countries bar chart
  var trace6 = {
    x: countryBot,
    y: [287343, 402388, null, 487589, 812050, 346737, 338026, 793558, 244066, 215465],
    name: 'Age 65+',
    type: 'bar'
  };
  var trace7 = {
    x: countryBot,
    y: [4293635, 3726442, null, 6062647, 10233436, 4189908, 3728271, 7307323, 3522664, 2725736],
    name: 'Age 25-64',
    type: 'bar'
  };
  var trace8 = {
    x: countryBot,
    y: [2722043, 2459930, null, 3641061, 7251576, 2312601, 2147927, 3212743, 1939875, 1434772],
    name: 'Age 15-24',
    type: 'bar'
  };
  var trace9 = {
    x: countryBot,
    y: [4050810, 3122467, null, 5185122, 9708575, 3081106, 2882558, 5427679, 2968631, 1926210],
    name: 'Age 5-14',
    type: 'bar'
  };
  var trace10 = {
    x: countryBot,
    y: [2786446, 1914776, null, 3341603, 5747862, 1712611, 1836009, 2463875, 2051917, 1171049],
    name: 'Age < 5',
    type: 'bar'
  };
  var data2 = [trace6, trace7,trace8,trace9,trace10];
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
  if (curYear === '2015') {data = data2015;}
  else if (curYear === '2016') {data = data2016;}
  else if (curYear === '2017') {data = data2017;}
  else if (curYear === '2018') {data = data2018;}
  else if (curYear === '2019') {data = data2019;}
  else if (curYear === '2020') {data = data2020;}
  else if (curYear === '2021') {data = data2021;}

  //map top 10 countries and age group into list 
  let country = data.slice(0, 10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`);
  let age65 = data.map(items => items["Age 65+"]).slice(0, 10);
  let age64_25 = data.map(items => items["Age 64-25"]).slice(0, 10);
  let age24_15 = data.map(items => items["Age 24-15"]).slice(0, 10);
  let age14_5 = data.map(items => items["Age 14-5"]).slice(0, 10);
  let age5 = data.map(items => items["Age <5"]).slice(0, 10);
    
  //map bot 10 countries and age group into list 
  let lastcountry = data.slice(-10).map(items => `${items.Country} (Rank:${items["Happiness Rank"]})`);
  let lastage65 = data.map(items => items["Age 65+"]).slice(-10);
  let lastage64_25 = data.map(items => items["Age 64-25"]).slice(-10);
  let lastage24_15 = data.map(items => items["Age 24-15"]).slice(-10);
  let lastage14_5 = data.map(items => items["Age 14-5"]).slice(-10);
  let lastage5 = data.map(items => items["Age <5"]).slice(-10);

  //update top 10 country bar chart
  Plotly.update('age_bar_top', {
    x: [country, country,country,country,country],
    y: [age65, age64_25,age24_15,age14_5,age5] 
  });

  //update bot 10 country bar chart
  Plotly.update('age_bar_bot', {
    x: [lastcountry, lastcountry,lastcountry,lastcountry,lastcountry],
    y: [lastage65, lastage64_25,lastage24_15,lastage14_5,lastage5] 
  });
}

init();