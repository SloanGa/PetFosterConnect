import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple, L } from "leaflet";

interface MapProps {
	longitude: number;
	latitude: number;
}

// Définir le chemin des icônes Leaflet
L.Icon.Default.mergeOptions({
	iconUrl: "/assets/leaflet/marker-icon.png", // Chemin vers l'icône principale
	iconRetinaUrl: "/assets/leaflet/marker-icon-2x.png", // Chemin vers l'icône Retina
	shadowUrl: "/assets/leaflet/marker-shadow.png", // Chemin vers l'ombre
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
