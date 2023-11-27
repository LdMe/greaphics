import { useState, useEffect } from 'react'
import './App.css'
import { getModes, getModeData } from './utils/modo_dia'
import { getFormattedData as getParkings } from './utils/bilbao_parkings'
import { getProvincias,getMunicipios } from './utils/municipios'
import Chart from './components/Chart'
import Map from './components/Map'
import { onEachFeature,style } from './utils/zonas_map'

const parkings = getParkings();
const provincias = getProvincias();
const municipios = getMunicipios(null,true);
const modes = getModes();

function App() {
  const [data, setData] = useState([]);
  const [selectedModes, setSelectedModes] = useState([])

  const handleModeClick = (mode) => {
    const newSelectedModes = [...selectedModes];
    const newData = [...data];
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
    setData(newData);
  }
  return (
    <>
      <h1>Información de transporte en Bilbao</h1>
      <h2>Modos de transporte</h2>
      {modes.map((mode) => (
        <p
          className={selectedModes.includes(mode) ? "mode selected" : "mode"}
          key={mode} onClick={() => handleModeClick(mode)}
        >
          {mode}
        </p>
      ))}
      
      {data.length !== 0 &&
        <Chart
          data={data}
          multi={true}
          title="Modo de transporte por dia"
        />
      }
      <Map
        data={parkings}
        title="Aparcamientos de Bilbao"
      />
      <Map
        data={municipios}
        title="Zonas de transoporte público de Bizkaia"
        isChoropleth={true}
        zoom={10}
        lat={43.23}
        lng={-2.92}
        coroplethInfo={{style:style,onEachFeature:onEachFeature}}
      />

    </>
  )
}

export default App
