import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple, Icon } from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface MapProps {
	longitude: number;
	latitude: number;
}

// Définir le chemin des icônes Leaflet
Icon.Default.mergeOptions({
	iconUrl: markerIcon, // Chemin vers l'icône principale
	iconRetinaUrl: markerIcon2x, // Chemin vers l'icône Retina
	shadowUrl: markerShadow, // Chemin vers l'ombre
});

const Map = ({ longitude, latitude }: MapProps) => {
	const position: LatLngTuple = [latitude, longitude];

	return (
		<MapContainer
			center={[latitude, longitude]}
			zoom={14}
			scrollWheelZoom={true}
			className="map"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}></Marker>
		</MapContainer>
	);
};

export default Map;
