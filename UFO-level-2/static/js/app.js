// from data.js
var UFOData = data;
var cityOptions = new Set(UFOData.map(UFO => UFO.city));
var stateOptions = new Set(UFOData.map(UFO => UFO.state));
var countryOptions = new Set(UFOData.map(UFO => UFO.country));
var shapeOptions = new Set(UFOData.map(UFO => UFO.shape));

// YOUR CODE HERE!

var tbody = d3.select("#ufo-table tbody");

UFOData.forEach((UFO) => {
    var row = tbody.append("tr");
    Object.entries(UFO).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});

var button = d3.select("#filter-btn");
var datetimeElement = d3.select("#datetime");
var cityElement = d3.select("#city");
var stateElement = d3.select("#state");
var countryElement = d3.select("#country");
var shapeElement = d3.select("#shape");

button.on("click", function () {
    var datetimeValue = datetimeElement.property("value");
    var cityValue = cityElement.property("value");
    var stateValue = stateElement.property("value");
    var countryValue = countryElement.property("value");
    var shapeValue = shapeElement.property("value");

    var filteredData = UFOData.filter(UFOData => (
        UFOData.datetime === datetimeValue && 
        UFOData.city === cityValue && 
        UFOData.state === stateValue &&
        UFOData.country === countryValue &&
        UFOData.shape === shapeValue
        ));
    if (filteredData.length == 0) filteredData = UFOData;
    tbody.selectAll("tr").remove();
    filteredData.forEach((UFO) => {
        var row = tbody.append("tr");
        Object.entries(UFO).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});
