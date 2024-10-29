
import { Helmet } from "react-helmet-async";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Page d'accueil | PetFoster Connect</title>
                <meta
                    name="description"
                    content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />
            </Helmet>

            <Header/>
            <main>
                <section className="hero">
                    <p className="hero__text">
                        Familles d’accueil et associations, main dans la patte pour leur offrir une
                        seconde chance.
                    </p>
                </section>
                <div className="container-md">
                    <section className="intro">
                        <h1 className="main__title">PetFoster Connect</h1>

                        <p className="intro__text">
                            La plateforme qui met en liaison familles d’accueil et associations afin de
                            proposer aux animaux un foyer temporaire dans l’attente de leur adoption.
                            Que vous soyez une famille d’accueil ou une association, inscrivez-vous en
                            quelques clics.
                        </p>
                    </section>

                    <section className="animals__section">
                        <h2 className="animals__section__title">Découvrez nos animaux à accueillir</h2>

                        {/*<!-- Cards des animaux --> */}
                        <div className="cards">
                            <a href="#" className="card__link" aria-label="Voir la page de cet animal">
                                <article className="card">
                                    <img src="/src/assets/chien1.jpg" className="card__img card-img-top" alt="Chien"
                                         loading="lazy"/>
                                    <div className="card-body text-center">
                                        <h3 className="card__title card-title">Toutou1</h3>
                                        <p className="card__text card-text">Alpes-Maritimes (06)</p>
                                    </div>
                                </article>
                            </a>

                            <a href="#" className="card__link" aria-label="Voir la page de cet animal">
                                <article className="card">
                                    <img src="/src/assets/chien2.jpg" className="card__img card-img-top" alt="Chien2"
                                         loading="lazy"/>
                                    <div className="card-body text-center">
                                        <h3 className="card__title card-title">Toutou2</h3>
                                        <p className="card__text card-text">Var (83)</p>
                                    </div>
                                </article>
                            </a>

                            <a href="#" className="card__link" aria-label="Voir la page de cet animal">
                                <article className="card">
                                    <img src="/src/assets/chien2.jpg" className="card__img card-img-top" alt="Chien2"
                                         loading="lazy"/>
                                    <div className="card-body text-center">
                                        <h3 className="card__title card-title">Toutou3</h3>
                                        <p className="card__text card-text">Finistère (29)</p>
                                    </div>
                                </article>
                            </a>
                        </div>

                        <a href="/animaux" className="btn" title="Voir les animaux">Voir tous les animaux</a>
                    </section>
                </div>
            </main>
            <Footer/>

        </>
    );
};

export default Home;
