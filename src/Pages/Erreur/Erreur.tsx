import "./Erreur.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const Erreur = () => {
    return (
        <>
            <Helmet>
                <title>Page non trouvée | PetFoster Connect</title>
                <meta
                    name="description"
                    content="Oups ! La page que vous cherchez n'existe pas ou a été déplacée. Explorez nos ressources pour trouver ce que vous cherchez sur PetFoster Connect."
                />
            </Helmet>
            <Header />
            <main className="container">
                <h1 className="main__title">Oups, cette page a pris la fuite ! </h1>
                <img
                    className="image__404"
                    src="/assets/erreur404.webp"
                    alt="Image d'erreur page non trouvée"
                ></img>
                <p className="text__404">
                    Il semble que la page que vous cherchez ait trouvé une famille d'accueil
                    temporaire ailleurs. Revenez à la page d'accueil pour découvrir comment nous
                    aidons les animaux à trouver le foyer qu'ils méritent.
                </p>
            </main>
            <Footer />
        </>
    );
};

export default Erreur;
