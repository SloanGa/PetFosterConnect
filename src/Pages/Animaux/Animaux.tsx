import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import Card from "../../Components/Card/Card.tsx";
import PaginationComposant from "../../Components/Pagination/Pagination";
import Footer from "../../Components/Footer/Footer";
import Filters from "../../Components/Filters/Filters.tsx";
import "./Animaux.scss";
import { useFetchAnimals } from "../../Hook/useFetchAnimals.ts";
import Loading from "../../Components/Loading/Loading.tsx";
import { Error } from "../../Components/Error/Error.tsx";
import { FormEvent, useEffect, useState, useRef } from "react";
import { IAnimal } from "../../Interfaces/IAnimal.ts";
import Icon from "../../Components/Icon/Icon.tsx";

const Animaux = () => {
    const { animals, paginatedAnimals, isLoading, setIsLoading, error, setError, baseURL } =
        useFetchAnimals();

    const [animalsToDisplay, setAnimalsToDisplay] = useState<IAnimal[]>([]);
    const [animalsFilterCount, setAnimalsFilterCount] = useState<number | null>(null);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [queryString, setQueryString] = useState("");
    const [form, setForm] = useState<{} | null>(null); // Permet de verifier sur le formulaire est vide ou non
    const [currentPage, setCurrentPage] = useState(1);

    // Section liste des animaux pour pouvoir utilise scrollIntoView au changement de page
    const animalList = useRef<HTMLDivElement | null>(null);

    /* Permet de set le state avec la valeurs "animals" reçu du hook useFetchAnimals */
    useEffect(() => {
        if (paginatedAnimals) {
            setAnimalsToDisplay(paginatedAnimals);
        }
    }, [paginatedAnimals, form]);

    /* Logique pour la gestion du filtre  */
    const handleSubmitFilter = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCurrentPage(1);
        const formData = new FormData(e.currentTarget);

        const params: { [key: string]: string } = {};

        // Parcourir chaque entrée de FormData et ignore les ""
        formData!.forEach((value, key) => {
            if (typeof value === "string") {
                // Gérer les options par défaut
                if (key === "availability" && value === "") {
                    return; // Ignore la valeur par défaut
                }
                if (key === "department_id" && value === "") {
                    return; // Ignore la valeur par défaut
                }
                if (key === "association_id" && value === "") {
                    return; // Ignore la valeur par défaut
                }
                if (key === "species" && value === "") {
                    return; // Ignore la valeur par défaut
                }
                if (key === "gender" && value === "") {
                    return; // Ignore la valeur par défaut
                }
                params[key] = value;
            }
        });
        /* Initialise le state Form pour verifier si on est dans le cadre d'une recherche avec filtre ou non */
        setForm(params);

        /* Convertir l'objet de paramètres en query string sous la forme : param1=value1&param2=value2... */
        const newQueryString = new URLSearchParams(params).toString();
        setQueryString(newQueryString);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/animals/search?${newQueryString}`
            );
            const data = await response.json();
            setAnimalsFilterCount(data.totalAnimalCount);
            setAnimalsToDisplay(data.paginatedAnimals);
            setIsFiltersVisible((prev) => !prev); //fermer les filtres sur mobile
        } catch (error) {
            console.error("Erreur lors de la récupération des données filtrées:", error);
        }
    };

    const toggleFiltersVisibility = () => {
        setIsFiltersVisible((prev) => !prev);
    };

    /* Logique pour la gestion de la pagination  */
    const handleChangePage = async (page: number) => {
        setCurrentPage(page);
        try {
            setIsLoading(true);

            let response;

            if (!form) {
                response = await fetch(`${import.meta.env.VITE_API_URL}/animals?page=${page}`);
            } else {
                response = await fetch(
                    `${import.meta.env.VITE_API_URL}/animals/search?${queryString}&page=${page}`
                );
            }

            if (!response.ok) {
                return setError("Une erreur est survenue, veuillez rafraîchir la page.");
            }
            const data = await response.json();
            setAnimalsToDisplay(data.paginatedAnimals);
        } catch (error) {
            setError("Une erreur est survenue, veuillez rafraîchir la page.");
            console.error("Erreur lors de la récupération des données:", error);
        } finally {
            setIsLoading(false);
            if (animalList.current !== null) {
                animalList.current.scrollIntoView();
            }
        }
    };

    return (
        <>
            <Helmet>
                <title>Les animaux | PetFoster Connect</title>
                <meta
                    name="description"
                    content="Découvrez tous les animaux des associations partenaires de PetFosterConnect. Notre application permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />
            </Helmet>
            <Header />
            <main>
                <div className="container-md">
                    <section className="intro">
                        <h1 className="main__title">Les animaux</h1>
                        <p className="intro__text__animals">
                            Rechercher facilement des animaux en fonction de plusieurs critères. Que
                            vous soyez à la recherche d'un compagnon spécifique ou que vous
                            souhaitiez simplement explorer les options disponibles, PetFoster
                            Connect vous aide à trouver l'animal qui correspond parfaitement à vos
                            attentes en attendant son adoption par une nouvelle famille !
                        </p>
                    </section>

                    <h2 className="animals__number__results">
                        {form ? `${animalsFilterCount} Résultats` : `${animals.length} Résultats`}
                    </h2>

                    <section className="animals__section" ref={animalList}>
                        <div className="animals__section__filter">
                            <Icon
                                ariaLabel="Ouvrir le menu de filtre"
                                src="/src/assets/icons/filter.svg"
                                alt="Filtrer les résultats"
                                onClick={toggleFiltersVisibility}
                                text="Filtres"
                            />

                            <Filters
                                animals={animals}
                                handleFilter={handleSubmitFilter}
                                isFiltersVisible={isFiltersVisible}
                                setForm={setForm}
                                setAnimalsFilterCount={setAnimalsFilterCount}
                                setIsFiltersVisible={setIsFiltersVisible}
                            />
                        </div>
                        <div className="cards">
                            {isLoading ? (
                                <Loading />
                            ) : error ? (
                                <Error error={error} />
                            ) : (
                                <ul className="cards__list">
                                    {animalsToDisplay.map((animal) => (
                                        <li key={animal.id}>
                                            <Card
                                                path={`/animaux/${animal.slug}`}
                                                src={`${baseURL}${animal.url_image!}`}
                                                alt={animal.name}
                                                name={animal.name}
                                                associationLocation={`${animal.association.department.name} (${animal.association.department.code})`}
                                                associationName={animal.association.name}
                                                animalType={animal.species}
                                                gender={animal.gender}
                                                age={animal.age}
                                                availability={animal.availability}
                                                isHomePage={false}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <PaginationComposant
                                items={form ? animalsToDisplay.length : animals.length}
                                currentPage={currentPage}
                                handleChangePage={handleChangePage}
                                animalsFilterCount={form ? animalsFilterCount : null}
                            />
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Animaux;
