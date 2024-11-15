import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import './PlanDuSite.scss';

const PlanDuSite = () => {
    return (
        <>
            <Helmet>
                <title>Plan du site | PetFoster Connect</title>
                <meta 
                    name="description" 
                    content="Découvrez le plan du site de PetFoster Connect, facilitant la mise en relation entre familles d'accueil et associations de protection animale." 
                />
            </Helmet>

            <Header />

            <main>

                <div className="mapsite__presentation">

                <h1 className="main__title">Plan du site</h1>
                
                <section>
                    <h2 className="main__information">Pages principales</h2>
                    <ul className="main__information__list">
                        <li className="main__information__list__link"><a href="/">Accueil</a></li>
                        <li className="main__information__list__link"><a href="/associations">Associations</a></li>
                        <li className="main__information__list__link"><a href="/animaux">Animaux à adopter</a></li>
                        <li className="main__information__list__link"><a href="/inscription">Inscription</a></li>
                        <li className="main__information__list__link"><a href="/connexion">Connexion</a></li>
                        <li className="main__information__list__link"><a href="/mentions-legales">Mentions légales</a></li>
                        <li className="main__information__list__link"><a href="/plan-du-site">Plan du site</a></li>
                        <li className="main__information__list__link"><a href="/politique-confidentialite">Politique de confidentialité</a></li>
                    </ul>
                </section>

                </div>
                
            </main>

            <Footer />
        </>
    );
};

export default PlanDuSite;