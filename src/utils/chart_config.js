

const types = ['scatter', 'bar', 'pie', 'histogram', 'box']
const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'black', 'white', 'gray']

/**
 *  Format data to be used in Plotly
 * @param {*} data  
 * @param {string} type {scatter, bar, pie, histogram, box}
 * @returns {array} [{x:[],y:[],type: string, mode: string, marker: {color: string}, name: string}
 */
const formatChartData = (data,type) => {
    console.log("datasetss",data)
    return data.map((singleDataset, index) => {
        console.log("dataset",singleDataset)
        const x = singleDataset.map((item) => item["dia "])
        const y = singleDataset.map((item) => item["Numero"])
        return {
            x: x,
            y: y,
            type: type,
            mode: 'lines+markers',
            marker: { color: colors[index] },
            name: singleDataset[0]["modo"]
        }
    });

}

export {
    types,
    colors,
    formatChartData
}