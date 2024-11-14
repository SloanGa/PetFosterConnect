import { HelmetProvider } from "react-helmet-async";
import "./Erreur.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import { useRef } from "react";
import Footer from "../../Components/Footer/Footer";

const Erreur = () => {
	// const { name-id } = useParams();
	return (
		<>
			<Helmet>
				<title>Page non trouvée | PetFoster Connect</title>
				<meta
					name="description"
					content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
				/>
			</Helmet>
			<Header />
			<main className="container">
				<h1 className="main__title">Page non trouvée</h1>
			</main>
			<Footer />
		</>
	);
};

export default Erreur;
