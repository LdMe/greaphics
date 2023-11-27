import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useState, useEffect } from 'react';

// import leaflet css
import 'leaflet/dist/leaflet.css';
const lat = 43.26271;
const lng = -2.92528;
const zoom = 13;

const Map = ({ title = "map", data }) => {
    const [markers, setMarkers] = useState([]);
    useEffect(() => {
        console.log(data);
        setMarkers(data);
    }, [data])
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
            </MapContainer>
        </section>
    )
}

export default Map