// @TODO: Complete the following function that builds the metadata panel
function buildMetadata(sample) {
  let url = "/metadata/" + sample;
  // Use `d3.json` to fetch the metadata for a sample
  d3.json(url).then(function(data) {
    console.log(data);
    // Use d3 to select the panel with id of `#sample-metadata`
    let table = d3.select("#sample-metadata");
    // Use `.html("") to clear any existing metadata
    table.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    let meta_sample = Object.entries(data);
    meta_sample.forEach( sample_data =>{
      // Hint: Inside the loop, you will need to use d3 to append new
      table
      .append("li")
      .text(`${sample_data[0]}: ${sample_data[1]}`) // tags for each key-value in the metadata.
    })
  });
};


function buildCharts(sample) {
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  let pieUrl = "/api/pie";
  d3.json(pieUrl).then(function(pieResponse) {
    console.log(pieResponse)
  let trace = {
    "values": pieResponse.sample_values,
    "labels": pieResponse.otu_ids,
    "hovertext": pieResponse.otu_labels.otu_labels,
    type: "pie"
  };
  let pieData = [trace]
  let layout = {
  title: "Top 10 Belly Button Cultured Bacteria Samples"
  };
    Plotly.newPlot("pie", pieData, layout);
  });
};

buildCharts();
  


function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
};

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
};

// Initialize the dashboard
init();
