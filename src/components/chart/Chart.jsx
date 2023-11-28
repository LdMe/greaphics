import Plot from 'react-plotly.js';
import { useState } from 'react';
import styles from './Chart.module.scss';

const Chart = ({ title = "chart", data }) => {
    return (
        <section className={styles.chart}>
            
            <Plot
                data={data}
                layout={{ width: 720, height: 440, title: title}}
            />
        </section>
    )
}

export default Chart
