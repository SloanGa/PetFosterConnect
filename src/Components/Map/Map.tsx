import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet"; // pour une bonne gestion des types
import "leaflet/dist/leaflet.css";

interface MapProps {
    longitude: number;
    latitude: number;
}

const Map: React.FC<MapProps> = ({ longitude, latitude }: MapProps) => {
    const position: LatLngExpression = [latitude, longitude];

    return (
        <MapContainer center={position} zoom={14} scrollWheelZoom={true} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}></Marker>
        </MapContainer>
    );
};

export default Map;
