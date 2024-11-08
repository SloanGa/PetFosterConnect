import "./Associations.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import PaginationComposant from "../../Components/Pagination/Pagination";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Loading/Loading.tsx";
import { Error } from "../../Components/Error/Error.tsx";
import Icon from "../../Components/Icon/Icon.tsx";
import { FormEvent, useEffect, useState } from "react";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import AssociationsFilters from "../../Components/Filters/AssociationsFilters.tsx";

const Associations = () => {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [associations, setAssociations] = useState<IAssociation[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
            const fetchAssociations = async () => {
                setIsLoading(true);
                try {
                    const response = await
                        fetch(`${import.meta.env.VITE_API_URL}/associations`);

                    if (!response.ok) {
                        setIsLoading(false);
                        return setError("Une erreur est survenue, veuillez rafraîchir la page.");
                    }
                    const data = await response.json();
                    setAssociations(data);

                } catch (error) {
                    setError("Une erreur est survenue, veuillez rafraîchir la page.");
                    console.error("Erreur lors de la récupération des données:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAssociations();
        },
        []);

    /* Logique pour la gestion du filtre  */
    const handleSubmitFilter = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("submit");
    };


    const toggleFiltersVisibility = () => {
        setIsFiltersVisible((prev) => !prev);
    };

    return (
        <>
            <Helmet>
                <title>Les associations | PetFoster Connect</title>
                <meta
                    name="description"
                    content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />
            </Helmet>
            <Header />
            <main>
                <div className="container-md">
                    <section className="intro">
                        <h1 className="main__title">Les associations</h1>
                        <p className="intro__text__associations">
                            Dans notre application, vous avez la possibilité de rechercher des associations de
                            protection animale en fonction de plusieurs critères. Que vous cherchiez une association
                            près de chez vous ou une organisation spécialisée dans un type d'animal particulier, notre
                            fonctionnalité de recherche vous permet de filtrer les résultats par localisation, type
                            d'animaux ou par nom. Que vous souhaitiez
                            soutenir une petite association locale ou une organisation plus établie, PetFoster Connect
                            vous aide à trouver celle qui correspond à vos attentes et valeurs !
                        </p>
                    </section>

                    <h2 className="associations__section__result">
                        {/*{form ? `${animalsFilterCount} Résultats` : `${animals.length} Résultats`}*/}
                    </h2>

                    <section className="associations__section">
                        {/*<div className="associations__section__filter">*/}
                        <Icon
                            ariaLabel="Ouvrir le menu de filtre"
                            src="/src/assets/icons/filter.svg"
                            alt="icône filtre"
                            onClick={toggleFiltersVisibility}
                            text="Filtres"
                        />
                        <AssociationsFilters associations={associations} handleFilter={handleSubmitFilter}
                                             isFilterVisible={isFiltersVisible} />

                        <div className="cards">

                        </div>
                    </section>


                </div>
            </main>
            <Footer />
        </>
    );
};

export default Associations;
