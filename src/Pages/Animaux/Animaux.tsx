import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import AnimalCard from "../../Components/AnimalCard/AnimalCard";
import Pagination from "../../Components/Pagination/Pagination";
import Footer from "../../Components/Footer/Footer";
import Filters from "../../Components/Filters/Filters.tsx";
import "./Animaux.scss";
import { useFetchAnimals } from "../../Hook/useFetchAnimals.ts";
import Loading from "../../Components/Loading/Loading.tsx";
import { Error } from "../../Components/Error/Error.tsx";

const Animaux = () => {

    const { animals, isLoading, error } = useFetchAnimals();

    return (
        <>
            <Helmet>
                <title>Les animaux | PetFoster Connect</title>
                <meta
                    name="description"
                    content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />
            </Helmet>
            <Header />
            <main>
                <div className="container-md">
                    <section className="intro">
                        <h1 className="main__title">Les animaux</h1>
                        <p className="intro__text__animals">
                            Dans notre application, vous pouvez facilement rechercher des animaux en fonction de
                            plusieurs critères.
                            Que vous soyez à la recherche d'un compagnon spécifique ou que vous souhaitiez simplement
                            explorer les options disponibles, notre fonctionnalité de recherche
                            vous permet de filtrer les résultats par type d'animal, localisation, association, genre,
                            âge et taille. Que vous souhaitiez un petit chien dynamique ou un chat âgé et calme,
                            PetFoster Connect vous aide à trouver l'animal qui correspond parfaitement à vos attentes !
                        </p>
                    </section>

                    <h2 className="animals__section__result">{`${animals.length} Résultats`}</h2>

                    <section className="animals__section">
                        <div className="animals__section__filter">
                            <button type="button" className="icon icon__filter" aria-label="Ouvrir le menu de filtre">
                                <img src="/src/assets/icons/filter.svg" alt="icône filtre" />
                                <span>Filtres</span>
                            </button>
                            <Filters animals={animals} />
                        </div>
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
                                                associationLocation={`${animal.association.department.name} (${animal.association.department.code})`}
                                                isHomePage={true}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </section>

                    <Pagination />
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Animaux;