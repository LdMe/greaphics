const highlightFeature = (e) => {
    let layer = e.target;
    const { NOMBRE_TOP,ZONA } = layer.feature.properties;
    layer.bindPopup(`<h3>${NOMBRE_TOP}</h3><p>Zona: ${ZONA}</p>`);
    layer.openPopup();
    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.9
    });

}
const resetHighlight = (e) => {
    e.target.setStyle(style(e.target.feature));
    e.target.closePopup();
}
const onEachFeature = (feature, layer) => {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}
const mapPolygonColor = (value) => {
    switch (value) {
        case 1: return '#f39834';
        case 2: return '#f0db32';
        case 3: return '#adcb5b';
        case 4: return '#64bbc5';
        case 5: return '#d19cba';
        default: return 'white';
    }
}
const style = (feature) => {
    return {
        fillColor: mapPolygonColor(feature.properties.ZONA),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

export {
    onEachFeature,
    style
}