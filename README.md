# GReaphics

Proyecto de React de ejemplo de uso de las librerías `react-plotly.js` y `leaflet`.

## React-plotly.js

### Instalación

```bash
npm install react-plotly.js plotly.js
```

### Uso

En este caso, se han utilizado los datos de uso de transporte público en bizkaia en diciembre del 2021.

En la carpeta `src/utils/modo_dia.js` encontramos las funciones de carga de datos y de procesado de los mismos.

En `App.jsx` guardamos todos los modos seleccionados y los datos correspondientes. Después se los pasamos al componente `Chart.jsx` para que los represente.

