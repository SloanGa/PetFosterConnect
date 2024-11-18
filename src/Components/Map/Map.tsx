import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";

interface MapProps {
    longitude: number;
    latitude: number;
}

const Map = ({ longitude, latitude }: MapProps) => {
    const position: LatLngTuple = [latitude, longitude];

    return (
        <MapContainer center={[latitude, longitude]} zoom={14} scrollWheelZoom={true} className="map">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}></Marker>
        </MapContainer>
    );
};

export default Map;
