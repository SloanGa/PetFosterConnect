import { Helmet } from "react-helmet-async";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import AnimalCard from "../Components/AnimalCard/AnimalCard.tsx";
import AppLink from "../Components/AppLink/AppLink.tsx";
import { useEffect, useState } from "react";
import Loading from "../Components/Loading/Loading.tsx";

const Home = () => {

    const [animals, setAnimals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/animals`);
                const data = await response.json();
                setAnimals(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAnimals();
    }, []);

    return (
        <>
            {/*Composant qui gere les meta données*/}
            <Helmet>
                <title>Page d'accueil | PetFoster Connect</title>
                <meta
                    name="description"
                    content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />
            </Helmet>

            <Header />
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
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <>
                                    <AnimalCard
                                        path={"/animaux/name-id"}
                                        src={"/src/assets/chien1.jpg"}
                                        alt={"Chien"}
                                        name={"Toutou1"}
                                        associationLocation={"Alpes-Maritimes (06)"}
                                        isHomePage={true}
                                    />

                                    <AnimalCard
                                        path={"/animaux/name-id"}
                                        src={"/src/assets/chien2.jpg"}
                                        alt={"Chien2"}
                                        name={"Toutou2"}
                                        associationLocation={"Var (83)"}
                                        isHomePage={true}
                                    />

                                    <AnimalCard
                                        path={"/animaux/name-id"}
                                        src={"/src/assets/chat1.jpg"}
                                        alt={"Chat1"}
                                        name={"Chat1"}
                                        associationLocation={"Finistère (29)"}
                                        isHomePage={true}
                                    />
                                </>
                            )}
                        </div>
                        <AppLink to={"/animaux"} className={"btn"} title={"Voir les animaux"}
                                 text={"Voir tous les animaux"} />

                    </section>
                </div>
            </main>
            <Footer />

        </>
    );
};

export default Home;
