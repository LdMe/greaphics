import Plot from 'react-plotly.js';
import { useState } from 'react';


const Chart = ({ title = "chart", data }) => {
    return (
        <section className="chart">
            
            <Plot
                data={data}
                layout={{ width: 720, height: 440, title: title}}
            />
        </section>
    )
}

export default Chart
