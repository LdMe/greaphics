import Plot from 'react-plotly.js';
import { useState } from 'react';

const types = ['scatter', 'bar', 'pie', 'histogram', 'box']
const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'black', 'white', 'gray']
const Chart = ({ title = "chart", data, multi = false }) => {

    const formatData = () => {
        if (multi) {
            return data.map((singleDataset, index) => {
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
        else {
            const x = data.map((item) => item["dia "])
            const y = data.map((item) => item["Numero"])
            return [{
                x: x,
                y: y,
                type: type,
                mode: 'lines+markers',
                marker: { color: 'red' },
            }]
        }
    }
    const [type, setType] = useState(types[0])
    return (
        <section className="chart">
            <select onChange={(e) => setType(e.target.value)}>
                {types.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
            <Plot
                data={formatData()}
                layout={{ width: 720, height: 440, title: title}}
            />
        </section>
    )
}

export default Chart
