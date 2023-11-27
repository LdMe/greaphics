import { MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet';
import { useState, useEffect } from 'react';

// import leaflet css
import 'leaflet/dist/leaflet.css';


const Map = ({ title = "map", data, zoom=13,lat=43.26271,lng=-2.92528, isChoropleth = false,coroplethInfo={style:{},onEachFeature:{}} }) => {
    const [markers, setMarkers] = useState([]);
    useEffect(() => {
        console.log(data);
        if (!isChoropleth) {
            setMarkers(data);
            return;
        }
    }, [data, isChoropleth])
    
    return (
        <section className="map">
            <h2>{title}</h2>
            <MapContainer center={[lat, lng]} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker) => (
                    <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
                        <Popup>
                            <p>{marker.name}</p>
                        </Popup>
                    </Marker>
                ))}
                {isChoropleth &&
                    <GeoJSON
                        data={data}
                        style={coroplethInfo.style}
                        onEachFeature={coroplethInfo.onEachFeature}
                    />}
            </MapContainer>
        </section>
    )
}

export default Map