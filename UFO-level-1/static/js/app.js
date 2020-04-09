// from data.js
var UFOData = data;

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
var inputElement = d3.select("#datetime");

button.on("click", function () {
    var inputValue = inputElement.property("value");
    var filteredData = UFOData.filter(UFOData => UFOData.datetime === inputValue);
    tbody.selectAll("tr").remove();
    filteredData.forEach((UFO) => {
        var row = tbody.append("tr");
        Object.entries(UFO).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
});
