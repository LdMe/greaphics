import { MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet';
import { useState, useEffect } from 'react';
import  './Map.scss';
// import leaflet css
import 'leaflet/dist/leaflet.css';

/**
 * 
 * @param {Object} props
 * @param {string} props.title title of the map
 * @param {number} props.zoom zoom of the map
 * @param {number} props.lat latitude of the map
 * @param {number} props.lng longitude of the map
 * @param {Object[]} props.markers markers, each marker has the following structure: {id: number, name: string, latitude: number, longitude: number}
 * @param {Object} props.geoJson geoJson data and config
 * @param {Object[]} props.geoJson.data geoJson data  (each element has the following structure: {properties: {name: string}, geometry: {coordinates: number[][][], type: string}})
 * @param {Object} props.geoJson.config geoJson config (has the following structure: {style: function, onEachFeature: function})
 * @returns 
 */
const Map = ({ title = "map",  zoom=13,lat=43.26271,lng=-2.92528,markers=[], geoJson={data:[],config:null}}) => {
    
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
                {geoJson.data.length !== 0 &&
                    <GeoJSON
                        data={geoJson.data}
                        style={geoJson.config.style}
                        onEachFeature={geoJson.config.onEachFeature}
                    />}
            </MapContainer>
        </section>
    )
}

export default Map