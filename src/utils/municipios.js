import municipios from '../assets/municipios.json';
import zonas from '../assets/zonas.json';
const getRawData = () => {
    return municipios.features;
}

// función que arregla los datos de municipios.json. En municipios2.json tenemos los datos de los municipios, pero las coordenadas están mal. En municipios.json no tenemos los datos de los municipios, pero las coordenadas están bien. Esta función coge los datos de municipios2.json y les añade las coordenadas de municipios.json

const getProvincias = () => {
    const provincias = municipios.features.map((item) => item.properties.TERRITORIO.toLowerCase());
    const uniqueProvincias = [...new Set(provincias)];
    return uniqueProvincias.sort();
}

const getZoneData = (localidad) => {
    const zona =  zonas.find((item) => {
        const localidades = item.municipios.map((item) => item.toLowerCase());
        return localidades.includes(localidad);
    });
    if(!zona) return 0;
    return zona.zona;
}

const getMunicipios = (provincia = null,zonaRequired=false) => {
    if(!provincia) {
        const result =  municipios.features.map((item) => {
            item.properties.ZONA = getZoneData(item.properties.NOMBRE_TOP.toLowerCase());
            return item;
        });
        if(zonaRequired) {
            const data = {...municipios}
            data.features = result.filter((item) => item.properties.ZONA !== 0);
            return data;
        }
        const data = {...municipios}
        data.features = result;
        return data;
    }
    const filteredData= municipios.features.filter((item) => {
        return item.properties.TERRITORIO.toLowerCase() === provincia;
    });
    const results =  filteredData.map((item) => {
        item.properties.ZONA = getZoneData(item.properties.NOMBRE_TOP.toLowerCase());
        return item;
    });
    if(zonaRequired) {
        const data = {...municipios}
        data.features = results.filter((item) => item.properties.ZONA !== null);
        return data;
    }
    const data = {...municipios}
    data.features = results;
    return data;
    
}

export  {
    getRawData,
    getProvincias,
    getMunicipios
}