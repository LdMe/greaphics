import { useState, useEffect } from 'react'
import './App.css'
import { getModes, getModeData } from './utils/modo_dia'
import Chart from './components/Chart'

function App() {

  const [modes, setModes] = useState(getModes())
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
      {data.map((item) => (
        <article key={JSON.stringify(item)}>
          <p >{item["dia "]} | {item["modo"]} | {item["Numero"]}</p>
        </article>
      ))}

    </>
  )
}

export default App
