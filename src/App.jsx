import { useState, useRef } from 'react'
import './App.scss'
import { getModes, getModeData } from './utils/modo_dia'
import { getFormattedData as getParkings } from './utils/bilbao_parkings'
import { getProvincias, getMunicipios } from './utils/municipios'
import Chart from './components/chart/Chart'
import Map from './components/map/Map'
import { onEachFeature, style } from './utils/zonas_map'
import { types as chartTypes, formatChartData } from './utils/chart_config'

const parkings = getParkings();
const municipios = getMunicipios(null, true);
const modes = getModes();
const geoJson = {
  data: municipios,
  config: {
    style: style,
    onEachFeature: onEachFeature
  }
};
function App() {
  const [chartData, setChartData] = useState([]);
  const [chartType, setChartType] = useState("scatter");
  const [selectedModes, setSelectedModes] = useState([]);
  const modesRef = useRef(null);
  const markerMapRef = useRef(null);
  const choroMapRef = useRef(null);

  /**
   * Function to handle the click on a mode, it adds or removes the mode from the selected modes and updates the chart data
   * @param {string} mode transport mode 
   */
  const handleModeClick = (mode) => {
    const newSelectedModes = [...selectedModes];
    const newData = [...chartData];
    if (newSelectedModes.includes(mode)) {
      const index = newSelectedModes.indexOf(mode);
      newSelectedModes.splice(index, 1);
      newData.splice(index, 1);
    }
    else {
      newSelectedModes.push(mode);
      const modeData = getModeData(mode);
      newData.push(modeData);

    }
    setSelectedModes(newSelectedModes);
    setChartData(newData);
  }
  return (
    <>
      <section className="header">
        <nav>
          <div className="nav-link">
            <p onClick={() => { modesRef.current.scrollIntoView({ behavior: 'smooth' }); }}>
              Usos
            </p>
          </div>
          <div className="nav-link">
            <p onClick={() => { markerMapRef.current.scrollIntoView({ behavior: 'smooth' }); }}>
              Aparcamientos
            </p>
          </div>
          <div className="nav-link">
            <p onClick={() => { choroMapRef.current.scrollIntoView({ behavior: 'smooth' }); }}>
              Zonas
            </p>
          </div>

        </nav>
      </section>
      <section className="main">

        <section className="modes-section">
          <h1>Información de transporte en Bilbao</h1>
          <h2>Modos de transporte</h2>
          <section className="modes" ref={modesRef}>
            {modes.map((mode) => (
              <p
                className={selectedModes.includes(mode) ? "mode selected" : "mode"}
                key={mode} onClick={() => handleModeClick(mode)}
              >
                {mode}
              </p>
            ))}
          </section>
        </section>

        {chartData.length !== 0 &&
          <section className="chart-outer">
            <select onChange={(e) => setChartType(e.target.value)}>
              {chartTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <Chart
              data={formatChartData(chartData, chartType)}
              multi={true}
              title="Modo de transporte por dia"
            />
          </section>
        }
        <article className="map-outer" ref={markerMapRef}>
          <Map
            markers={parkings}
            title="Aparcamientos de Bilbao"

          />
        </article>
        <article className="map-outer" ref={choroMapRef}>
          <Map
            geoJson={geoJson}
            title="Zonas de transoporte público de Bizkaia"
            zoom={10}
            lat={43.23}
            lng={-2.92}
          />
        </article>
      </section>

    </>
  )
}

export default App
