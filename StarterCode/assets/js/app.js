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


// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


function responsivef() {
    svgWidth = 800;
    svgHeight = 600;
    chartWidth = svgWidth - chartMargin.left - chartMargin.right;
    chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;
    //Chart is refreshed 
    refreshChart();
    }

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
function createSVG() {
    svg = d3.select("#scatter").append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
    chartGroup = svg.append("g")
        .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);
}

//Importing our Data
function chartData(journalismData) {
    createSVG();
    createAxisLabels();
    d3.csv("assets/data/data.csv").then(journalismData => {
        journalismData.forEach(row => {
            data.poverty = +data.poverty;
            data.healthcare = +data.healthcare;
            data.age = +data.age;
            data.income = +data.income;
            data.obesity = +data.obesity;
            data.smokes = +data.smokes;
            console.log(journalistdata);
        })
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

/// function used for updating xAxis var and yAxis upon click on axis label
var bottomAxis = d3.axisBottom(xLinearScale)
var leftAxis= d3.axisLeft(yLinearScale)

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(0,${height}`)
  .call(bottomAxis)

  chartGroup.append("g")
  .call(leftAxis);

// Appending circles to the Chart
chartGroup.selectAll("circle").data(journalistdata).enter().append("circle")
.attr("cx", d => xLinearScale(d.poverty))
.attr("cy", d => yLinearScale(d.healthcare))
.attr("r", 12)
.attr("fill", "#blue")
.attr("stroke","white")
.attr("opacity", 0.7)

//Appending x axis title
chartGroup.append("text")
.attr("transform", `translate(${height/2},{height + margin.top + 20})`)
.classed("dow-text text", true)
.text("In Poverty %");

 //Appending y axis title
 chartGroup.append("text")
 .attr("transform", "rotate(-90)")
 .attr("y", 0 - margin.left + 12)
 .attr("x", 0 - (height / 2))
 .text("Lacks HealthCare (%) ");
    })
 //Adding Text on the Circles
 //https://stackoverflow.com/questions/13615381/d3-add-text-to-circle
 var circleLabel = chartGroup.selectAll(null).data(journalismData).enter().append("text");

 circleLabels
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
   .attr("color", "red");
    };