import "./Associations.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import PaginationComposant from "../../Components/Pagination/Pagination";
import Footer from "../../Components/Footer/Footer";
import Loading from "../../Components/Loading/Loading.tsx";
import { Error } from "../../Components/Error/Error.tsx";
import Icon from "../../Components/Icon/Icon.tsx";
import { FormEvent, useEffect, useRef, useState } from "react";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import AssociationsFilters from "../../Components/Filters/AssociationsFilters.tsx";
import AnimalCard from "../../Components/AnimalCard/AnimalCard.tsx";
import { useFetchAssociations } from "../../Hook/useFetchAssociations.ts";

const Associations = () => {
	const {
		associations,
		paginatedAssociations,
		error,
		isLoading,
		baseURL,
		setIsLoading,
		setError,
	} = useFetchAssociations();

	const [isFiltersVisible, setIsFiltersVisible] = useState(false);
	const [form, setForm] = useState<{} | null>(null); // Permet de verifier sur le formulaire est vide ou non
	const [queryString, setQueryString] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [associationsFilterCount, setAssociationsFilterCount] = useState<
		number | null
	>(null);
	const [associationsToDisplay, setAssociationsToDisplay] = useState<
		IAssociation[]
	>([]);

	// Section liste des associations pour pouvoir utilise scrollIntoView au changement de page
	const associationList = useRef<HTMLDivElement | null>(null);

	/* Permet de set le state avec la valeurs "associations" reçu du hook useFetchAnimals */
	useEffect(() => {
		if (paginatedAssociations) {
			setAssociationsToDisplay(paginatedAssociations);
		}
	}, [paginatedAssociations, form]);

	/* Logique pour la gestion du filtre  */
	const handleSubmitFilter = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentPage(1);

		const formData = new FormData(e.currentTarget);
		const params: { [key: string]: string } = {};

		formData.forEach((value: string, key: string) => {
			if (value !== "") {
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
				`${import.meta.env.VITE_API_URL}/associations/search?${newQueryString}`,
			);
			const data = await response.json();
			setAssociationsFilterCount(data.totalAssociationCount);
			setAssociationsToDisplay(data.paginatedAssociations);
		} catch (error) {
			console.error(
				"Erreur lors de la récupération des données filtrées:",
				error,
			);
		}
	};

	const toggleFiltersVisibility = () => {
		setIsFiltersVisible((prev) => !prev);
	};

	/* Logique pour la gestion de la pagination  */
	const handleChangePage = async (page: Number) => {
		setCurrentPage(page);
		try {
			setIsLoading(true);

			let response;

			if (!form) {
				response = await fetch(
					`${import.meta.env.VITE_API_URL}/associations?page=${page}`,
				);
			} else {
				response = await fetch(
					`${import.meta.env.VITE_API_URL}/associations/search?${queryString}&page=${page}`,
				);
			}

			if (!response.ok) {
				return setError(
					"Une erreur est survenue, veuillez rafraîchir la page.",
				);
			}
			const data = await response.json();
			setAssociationsToDisplay(data.paginatedAssociations);
		} catch (error) {
			setError("Une erreur est survenue, veuillez rafraîchir la page.");
			console.error("Erreur lors de la récupération des données:", error);
		} finally {
			setIsLoading(false);
			if (associationList.current !== null) {
				associationList.current.scrollIntoView();
			}
		}
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
							Dans notre application, vous avez la possibilité de rechercher des
							associations de protection animale en fonction de plusieurs
							critères. Que vous cherchiez une association près de chez vous ou
							une organisation spécialisée dans un type d'animal particulier,
							notre fonctionnalité de recherche vous permet de filtrer les
							résultats par localisation, type d'animaux ou par nom. Que vous
							souhaitiez soutenir une petite association locale ou une
							organisation plus établie, PetFoster Connect vous aide à trouver
							celle qui correspond à vos attentes et valeurs !
						</p>
					</section>

					<h2 className="associations__section__result">
						{form
							? `${associationsFilterCount} Résultats`
							: `${associations.length} Résultats`}
					</h2>

					<section className="associations__section">
						<div className="associations__section__filter">
							<Icon
								ariaLabel="Ouvrir le menu de filtre"
								src="/src/assets/icons/filter.svg"
								alt="icône filtre"
								onClick={toggleFiltersVisibility}
								text="Filtres"
							/>
							<AssociationsFilters
								associations={associations}
								handleFilter={handleSubmitFilter}
								isFiltersVisible={isFiltersVisible}
								setForm={setForm}
							/>
						</div>
						<div className="cards">
							{isLoading ? (
								<Loading />
							) : error ? (
								<Error error={error} />
							) : (
								<ul className="cards__list">
									{associationsToDisplay.map((association) => (
										<li key={association.id}>
											<AnimalCard
												path={`/association/${association.slug}`}
												src={`${baseURL}${association.url_image!}`}
												alt={association.name}
												name={association.name}
												associationLocation={`${association.department.name} (${association.department.code})`}
												isHomePage={true}
											/>
										</li>
									))}
								</ul>
							)}
						</div>
					</section>
					<PaginationComposant
						items={form ? associationsToDisplay.length : associations.length}
						currentPage={currentPage}
						handleChangePage={handleChangePage}
						animalsFilterCount={form ? associationsFilterCount : null}
					/>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Associations;
