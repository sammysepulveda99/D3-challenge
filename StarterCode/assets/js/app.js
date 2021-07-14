//Just like Hair Metal
//Chart parameters
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);
//Append SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Importing our Data
        d3.csv("assets/data/data.csv").then(function(journalismData) {
  
        journalismData.forEach(function(data) {
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
            data.age = +data.age;
            data.income = +data.income;
            data.obesity = +data.obesity;
            data.smokes = +data.smokes;
           // console.log(journalismData);
        });
//Creating our scales
var xLinearScale = d3.scaleLinear()
.domain([d3.min(journalismData, d => d.poverty),
  d3.max(journalismData, d => d.poverty)]) 
.range([0, width]);

//return xLinearScale;
var yLinearScale = d3.scaleLinear()
.domain([d3.min(journalismData, d => d.healthcare),
  d3.max(journalismData, d => d.healthcare)]) 
.range([height, 0]);
//return yLinearScale;


///updating our axis
var bottomAxis = d3.axisBottom(xLinearScale)
var leftAxis= d3.axisLeft(yLinearScale)

// Append an SVG group
 chartGroup.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(bottomAxis)

  chartGroup.append("g")
  .call(leftAxis);

// Appending circles to the Chart
chartGroup.selectAll("circle").data(journalismData).enter().append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", 12)
.attr("fill", "blue")
.attr("stroke","white")
.attr("opacity", 0.7);

//Appending x axis title
chartGroup.append("text")
.attr("transform", `translate(${height/2}, ${height + margin.top + 20})`)
.classed("dow-text", true)
.text("In Poverty (%)");

 //Appending y axis title
 chartGroup.append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", 0 - margin.left + 12)
 .attr("x", 0 - (height / 2))
 .text("Lacks HealthCare (%) ");
 
 //Adding Text on the Circles
 //https://stackoverflow.com/questions/13615381/d3-add-text-to-circle
 var circleLabel = chartGroup.selectAll(null).data(journalismData).enter().append("text");

 circleLabel
   .attr("x", function(d) {
     return xLinearScale(d.poverty);
   })
   .attr("y", function(d) {
     return yLinearScale(d.healthcare);
   })
   .text(function(d) {
     return d.abbr;
   })
   .attr("font-size", "12px")
   .attr("text-anchor", "middle")
   .attr("fill", "white");
    });