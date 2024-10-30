import { Helmet } from "react-helmet-async";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import AnimalCard from "../Components/AnimalCard/AnimalCard.tsx";
import AppLink from "../Components/AppLink/AppLink.tsx";
import Loading from "../Components/Loading/Loading.tsx";
import { Error } from "../Components/Error/Error.tsx";
import { IAnimal } from "../Interfaces/IAnimal.ts";
import { useEffect, useState } from "react";

const Home = () => {

    const [animals, setAnimals] = useState<IAnimal[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    const getRandomizeAnimals = (animals: IAnimal[], count: number): IAnimal[] => {
        // Trie le tableau dans un ordre aléatoire
        const shuffledAnimals = animals.sort(() => 0.5 - Math.random());
        //Retourne un tableau avec "count" element (ici 3)
        return shuffledAnimals.slice(0, count);
    };

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/animals`);

                if (!response.ok) {
                    return setError("Une erreur est survenue, veuillez rafraîchir la page.");
                }
                const data = await response.json();
                console.log(data);
                setAnimals(getRandomizeAnimals(data, 3));

            } catch (error) {
                setError("Une erreur est survenue, veuillez rafraîchir la page.");
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
                            ) : error ? (
                                <Error error={error} />
                            ) : (
                                <ul className="cards">
                                    {animals.map((animal) => (
                                        <li key={animal.id}>
                                            <AnimalCard
                                                path={`/animaux/${animal.name}-${animal.id}`}
                                                src={animal.url_image!}
                                                alt={animal.name}
                                                name={animal.name}
                                                associationLocation={animal.association.department}
                                                isHomePage={true}
                                            />
                                        </li>
                                    ))}
                                </ul>
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
