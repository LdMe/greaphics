import bilbaoParkings from '../assets/bilbao-parkings-rotacion.json';

const getRawData = () => {
    return bilbaoParkings;
}

const getFormattedData = () => {
    const data = bilbaoParkings.features.map((item,index) => {
        return {
            id: index,
            name: item.properties.nombre,
            latitude: item.geometry.coordinates[1],
            longitude: item.geometry.coordinates[0],
        }
    });
    return data;
}

export  {
    getRawData,
    getFormattedData
}