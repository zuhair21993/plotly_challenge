function getTable_Plot(id) {
    d3.json("Data/samples.json").then(data => {
        //console.log(data)
        var wfreq = data.metadata.filter(element => element.id == id)[0].wfreq
        //console.log(wfreq)
        var samples = data.samples.filter(element => element.id == id)[0]
        //console.log(samples)
        var otu_ids = samples.otu_ids.slice(0,10).reverse()
        //console.log(otu_ids)
        var otu_ids_formatted = otu_ids.map(element => `OTU ${element}`)
        //console.log(otu_ids_formatted)
        var otu_labels = samples.otu_labels.slice(0,10).reverse()
        //console.log(otu_labels)
        var sampleValues = samples.sample_values.slice(0,10).reverse()
        //console.log(sampleValues)
        
        var trace1 = {
            x: sampleValues,
            y: otu_ids_formatted,
            type: 'bar',
            orientation: "h",
            text: otu_labels
        }
        var data1 = [trace1]
        
        var layout1 = {
            title: `Bar Chart Top 10 Stock Prices`,
        }
        Plotly.newPlot('bar', data1, layout1)

        var trace2 = {
            x: samples.otu_ids,
            y: samples.sample_values,
            mode: 'markers',
            marker: {
                size: samples.sample_values,
                color: samples.otu_ids,
                colorscale: 'Earth'
            },
            text: samples.otu_labels,
            type: "scatter"
        }
        var data2 = [trace2]
        var layout2 = {
            xaxis: {title:"OTU ID"},
            showlegend: false,
            }
        Plotly.newPlot('bubble', data2, layout2)

        var data3 = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: parseFloat(wfreq),
                title: { text: "Belly Button Washing Frequency - Scrubs per Week" },
                type: "indicator",
                mode: "gauge+number",
                gauge: { axis: { range: [null, 9] },
                    steps :[
                    {range: [0,1], color: "#f8f3ec"},
                    {range: [1,2], color: "#f4f1e4"},
                    {range: [2,3], color: "#e9e6c9"},
                    {range: [3,4], color: "#e5e8b0"},
                    {range: [4,5], color: "#d5e599"},
                    {range: [5,6], color: "#b7cd8f"},
                    {range: [6,7], color: "#8ac086"},
                    {range: [7,8], color: "#88bc8d"},
                    {range: [8,9], color: "#84b588"},
                    ],
                    axis: {range: [0, 9], 
                        tickvals: [0,1,2,3,4,5,6,7,8,9]},
                    bar: {color: "#840000"}
                }
            }
        ];
        
        var layout3 = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', data3, layout3);
        
    
    var metaDataBox = d3.select("#sample-metadata")
    var metaData = data.metadata.filter(element => element.id == id)[0]
    //console.log(metaData)
    metaDataBox.html("")
    Object.entries(metaData).forEach(([key, value]) => {
        metaDataBox.append("tr").text(`${key}: ${value}`)
    })
})
}

function subjectID() {
    var dropDown = d3.selectAll("#selDataset")
    d3.json("Data/samples.json").then(data => {
    //console.log(data)
    var names = data.names
    //console.log(names)
    names.forEach(name => {dropDown.append('option').text(name)})
    getTable_Plot(names[0])
})}
subjectID()

function optionChanged(id) {
    getTable_Plot(id);
}