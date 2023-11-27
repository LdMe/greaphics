import { useState } from 'react'
import './App.css'
import { getModes, getModeData } from './utils/modo_dia'

function App() {

  const [modes, setModes] = useState(getModes())
  const [data, setData] = useState([]);

  const handleModeClick = (mode) => {
    setData(getModeData(mode))
  }
  return (
    <>
      {modes.map((mode) => (
        <p key={mode} onClick={() => handleModeClick(mode)}>{mode}</p>
      ))}
      {data.map((item) => (
        <article key={item}>
          <p>{item["dia "]} | {item["modo"]} | {item["Numero"]}</p>
        </article>
      ))}
    </>
  )
}

export default App
