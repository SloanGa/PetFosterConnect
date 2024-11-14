import { HelmetProvider } from "react-helmet-async";
import "./Erreur.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
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
				<h1 className="main__title">Oups, cette page a pris la fuite ! </h1>
				<img className="image__404" src="public/3818850.jpg" alt="" />
				<p className="text__404">
					Il semble que la page que vous cherchez ait trouvé une famille
					d'accueil temporaire ailleurs. Revenez à la page d'accueil pour
					découvrir comment nous aidons les animaux à trouver le foyer qu'ils
					méritent.
				</p>
			</main>
			<Footer />
		</>
	);
};

export default Erreur;
