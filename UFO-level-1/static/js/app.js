// from data.js
var UFOData = data;

// Define table
var table = d3.select("#ufo-table");
var tbody = d3.select("#ufo-table tbody");

// Define filter elements
var button = d3.select("#filter-btn");
var inputElement = d3.select("#datetime");

// Display table with raw data
UFOData.forEach((UFO) => {
    var row = tbody.append("tr");
    Object.entries(UFO).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});

button.on("click", function () {
    //remove message
    d3.select(".table-area").selectAll(".message-container").remove();
    //read filter input value
    var inputValue = inputElement.property("value");
    // Create filtered data.
    var filteredData = UFOData.filter(UFOData => UFOData.datetime === inputValue);
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
    }else{
        tbody.selectAll("tr").remove();
        d3.select(".table-area").append('div').attr('class', 'message-container').text('No records found.')
    }
    
});
