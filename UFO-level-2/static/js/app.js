// from data.js
var UFOData = data;

// Define table
var table = d3.select("#ufo-table");
var tbody = d3.select("#ufo-table tbody");

// Define filter elements
var button = d3.select("#filter-btn");
var datetimeElement = d3.select("#datetime");
var cityElement = d3.select("#city");
var stateElement = d3.select("#state");
var countryElement = d3.select("#country");
var shapeElement = d3.select("#shape");
var selectedFilterOptions = {};

// Define filter options
var cityOptions = Array.from(new Set(UFOData.map(UFO => UFO.city)));
var stateOptions = Array.from(new Set(UFOData.map(UFO => UFO.state)));
var countryOptions = Array.from(new Set(UFOData.map(UFO => UFO.country)));
var shapeOptions = Array.from(new Set(UFOData.map(UFO => UFO.shape)));

// Create drop down lists with filter options
var filters = d3.select("#filters")

var cityFilter = filters.append('li').attr('class', 'filter list-group-item');
cityFilter.append('label').attr('for', 'city').text('Select City:');

var cityFilterOptions = cityFilter.append('select').attr('class', 'form-control').attr('id', 'city');
cityFilterOptions.selectAll('option').data(cityOptions).enter()
    .append('option').text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }); // corresponding value returned by the button

var stateFilter = filters.append('li').attr('class', 'filter list-group-item');
stateFilter.append('label').attr('for', 'state').text('Select State:');

var stateFilterOptions = stateFilter.append('select').attr('class', 'form-control').attr('id', 'state');
stateFilterOptions.selectAll('option').data(stateOptions).enter()
    .append('option').text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }); // corresponding value returned by the button

var countryFilter = filters.append('li').attr('class', 'filter list-group-item');
countryFilter.append('label').attr('for', 'country').text('Select Country:');

var countryFilterOptions = countryFilter.append('select').attr('class', 'form-control').attr('id', 'country');
countryFilterOptions.selectAll('option').data(countryOptions).enter()
    .append('option').text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }); // corresponding value returned by the button

var shapeFilter = filters.append('li').attr('class', 'filter list-group-item');
shapeFilter.append('label').attr('for', 'shape').text('Select Shape:');

var shapeFilterOptions = shapeFilter.append('select').attr('class', 'form-control').attr('id', 'shape');
shapeFilterOptions.selectAll('option').data(shapeOptions).enter()
    .append('option').text(function (d) { return d; }) // text showed in the menu
    .attr("value", function (d) { return d; }); // corresponding value returned by the button

// Display table with raw data
UFOData.forEach((UFO) => {
    var row = tbody.append("tr");
    Object.entries(UFO).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});


button.on("click", function () {

    d3.select(".table-area").selectAll(".message-container").remove();

    // Create selectedFilterOptions object with selected filter options.
    if (datetimeElement.property("value").length) selectedFilterOptions.datetime = datetimeElement.property("value");
    if (cityElement.property("value").length) selectedFilterOptions.city = cityElement.property("value");
    if (stateElement.property("value").length) selectedFilterOptions.state = stateElement.property("value");
    if (countryElement.property("value").length) selectedFilterOptions.country = countryElement.property("value");
    if (shapeElement.property("value").length) selectedFilterOptions.shape = shapeElement.property("value");

    // Create filtered data.
    const filterKeys = Object.keys(selectedFilterOptions);
    var filteredData = UFOData.filter(UFO => {
        return filterKeys.every(key => {
            return selectedFilterOptions[key].includes(UFO[key]);
        });
    });

    // Display table with filtered data
    if (filteredData.length) {
        tbody.selectAll("tr").remove();
        filteredData.forEach((UFO) => {
            var row = tbody.append("tr");
            Object.entries(UFO).forEach(([key, value]) => {
                var cell = row.append("td");
                cell.text(value);
            });
        });
    } else {
        tbody.selectAll("tr").remove();
        d3.select(".table-area").append('div').attr('class', 'message-container').text('No records found.')
    }
});
