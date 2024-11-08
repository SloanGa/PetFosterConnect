import "./TableauBord.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header.tsx";
import Footer from "../../Components/Footer/Footer.tsx";
import DashboardCard from "../../Components/DashboardCard/DashboardCard.tsx";
import AppLink from "../../Components/AppLink/AppLink.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
import { Error } from "../../Components/Error/Error.tsx";
import { Button, Modal } from "react-bootstrap";
import { IAnimal } from "../../Interfaces/IAnimal.ts";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";
import { useState, useEffect, useCallback } from "react";
import Icon from "../../Components/Icon/Icon.tsx";
import GestionEditModal from "../../Components/GestionModal/GestionEditModal.tsx";
import GestionAddModal from "../../Components/GestionModal/GestionAddModal.tsx";
import GestionModal from "../../Components/GestionModal/GestionModal.tsx";

const TableauBord = () => {
	const [showGestionModal, setShowGestionModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleShowGestionModal = useCallback((animal?: IAnimal) => {
		setShowGestionModal(true);
		setAnimalToEdit(animal || null);
	}, []);

	const handleCloseGestionModal = () => setShowGestionModal(false);

	const [showGestionEditModal, setShowGestionEditModal] = useState(false);
	const [showGestionAddModal, setShowGestionAddModal] = useState(false);
	// state qui permet de gérer si on a une modale edit ou créer un animal

	const [associationAnimals, setAssociationAnimals] = useState<IAnimal[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [animalToEdit, setAnimalToEdit] = useState<IAnimal | null>(null);
	const [animalToDelete, setAnimalToDelete] = useState<IAnimal | null>(null);

	const baseURL = import.meta.env.VITE_API_URL;

	// Modale modifier

	// ici le paramètre est optionnel
	const handleShowGestionEditModal = useCallback((animal) => {
		setShowGestionEditModal(true);
		setAnimalToEdit(animal);
	}, []);

	const handleCloseGestionEditModal = useCallback(() => {
		setShowGestionEditModal(false);
		setAnimalToEdit(null);
	}, []);

	const handleShowGestionAddModal = useCallback(() => {
		setShowGestionAddModal(true);
	}, []);

	const handleCloseGestionAddModal = useCallback(() => {
		setShowGestionAddModal(false);
	}, []);

	// L'event listener à la soumission du formulaire éditer
	const handleSubmitEdit = useCallback(
		async (values) => {
			// ici on ne récupère plus le formulaire via event.target mais values qui est passé par formik - les valeurs représentent les valeurs actuelles du formulaire

			console.log("values:", values);
			const formData = new FormData();

			// on construit FormData avec les values (la première condition sert à n'insérer que des propriétés de l'objet value propre et non héritées)
			for (const key in values) {
				if (Object.hasOwnProperty.call(values, key)) {
					const value = values[key];
					if (value !== undefined && value !== null && value !== "") {
						formData.append(key, value);
					}
				}
			}

			console.log("formData :", formData);

			try {
				const response = await fetch(
					// En attendant l'authentification, on passe pour le test en dur l'id de l'association.
					`${import.meta.env.VITE_API_URL}/dashboard/association/animals/${animalToEdit.id}`,
					{
						method: "PATCH",
						body: formData,
					},
				);

				if (response.ok) {
					// handleCloseGestionEditModal();
					handleCloseGestionModal();
					const updatedAnimal = await response.json(); // Récupère l'objet mis à jour
					console.log(updatedAnimal);

					// TODO ajouter une notification de succès si nécessaire
				} else {
					console.error("Erreur lors de la mise à jour");
				}
			} catch (error) {
				console.error("Erreur:", error);
			}
		},
		[handleCloseGestionModal, animalToEdit],
	);

	// L'eventListener à la soumission du formulaire ajouter un animal

	const handleSubmitAdd = useCallback(
		async (values) => {
			console.log("values: ", values);
			const formData = new FormData();

			for (const key in values) {
				if (Object.hasOwnProperty.call(values, key)) {
					const value = values[key];
					if (value !== undefined && value !== null && value !== "") {
						formData.append(key, value);
					}
				}
			}

			// Avec l'authentification, le back vient gérer à la place.
			formData.append("association_id", 1);

			console.log("formData: ", formData);

			try {
				const response = await fetch(
					// En attendant l'authentification, on passe pour le test en dur l'id de l'association.
					`${import.meta.env.VITE_API_URL}/dashboard/association/animals/`,
					{
						method: "POST",
						body: formData,
					},
				);

				if (response.ok) {
					// handleCloseGestionAddModal();
					handleCloseGestionModal();
					const createdAnimal = await response.json();
					console.log(createdAnimal);

					// TODO ajouter une notification de succès si nécessaire
				} else {
					console.error("Erreur lors de la création");
				}
			} catch (error) {
				console.error("Erreur:", error);
			}
		},
		[handleCloseGestionAddModal],
	);

	// Gestion de la modale confirmation de suppression

	const handleShowDeleteModal = useCallback((animal) => {
		setShowDeleteModal(true);
		setAnimalToDelete(animal);
	}, []);

	const handleCloseDeleteModal = useCallback((animal) => {
		setShowDeleteModal(false);
		setAnimalToDelete(null);
	}, []);

	const deleteAnimal = useCallback(async () => {
		try {
			const response = await fetch(
				// En attendant l'authentification, on passe pour le test en dur l'id de l'association.
				`${import.meta.env.VITE_API_URL}/dashboard/association/animals/${animalToDelete.id}`,
				{
					method: "DELETE",
				},
			);

			if (response.ok) {
				handleCloseDeleteModal();
				console.log("Animal supprimé");

				// TODO ajouter une notification de succès si nécessaire
			} else {
				console.error("Erreur lors de la suppression");
			}
		} catch (error) {
			console.error("Erreur:", error);
		}
	}, [animalToDelete, handleCloseDeleteModal]);

	// Gestion du fetch des animaux de l'association

	useEffect(() => {
		const fetchAnimals = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/dashboard/association/animals/?id=1`,
				);

				if (!response.ok) {
					return setError(
						"Une erreur est survenue, veuillez rafraîchir la page.",
					);
				}
				const data = await response.json();
				setAssociationAnimals(data);
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
			<Helmet>
				<title>Tableau de bord | PetFoster Connect</title>
				<meta
					name="description"
					content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
				/>
			</Helmet>
			<Header />
			<div className="content">
				<LeftNavBar />
				<div className="main__content">
					<h1 className="main__content__h1">Dashboard de XXX</h1>

					<div className="main__content__add-animal">
						Ajouter un animal{" "}
						<Icon
							ariaLabel={"Ajouter un animal"}
							src={"/src/assets/icons/plus.svg"}
							alt={"icône Ajout"}
							onClick={() => {
								// handleShowGestionAddModal();
								handleShowGestionModal();
							}}
						/>
					</div>

					<div className="main__content__cards__container">
						<div className="row gx-8 gy-3">
							{associationAnimals.map((animal) => (
								<div
									className="main__content__cards__container__card col-12 col-sm-6 col-md-4"
									key={animal.id}
								>
									<DashboardCard
										onShowEditModal={handleShowGestionEditModal}
										onShowDeleteModal={handleShowDeleteModal}
										onShowGestionModal={handleShowGestionModal}
										path={""}
										src={`${baseURL}${animal.url_image}`}
										alt={animal.name}
										name={animal.name}
										animal={animal}
										// On passe ce setter pour que quand on clique sur modifier, on ait en state l'animal à éditer et on lui a passé son animal
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>

			{/* Modale pour modifier un animal */}

			<GestionModal
				handleCloseGestionModal={handleCloseGestionModal}
				showGestionModal={showGestionModal}
				setShowGestionModal={setShowGestionModal}
				handleSubmitEdit={handleSubmitEdit}
				handleSubmitAdd={handleSubmitAdd}
				animalToEdit={animalToEdit}
			/>

			<GestionEditModal
				handleCloseGestionEditModal={handleCloseGestionEditModal}
				showGestionEditModal={showGestionEditModal}
				handleSubmitEdit={handleSubmitEdit}
				animalToEdit={animalToEdit}
			/>

			<GestionAddModal
				handleCloseGestionAddModal={handleCloseGestionAddModal}
				showGestionAddModal={showGestionAddModal}
				handleSubmitAdd={handleSubmitAdd}
			/>

			{/* Modale pour confirmer la suppression d'un animal */}

			<Modal
				show={showDeleteModal}
				onHide={handleCloseDeleteModal}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Confirmation suppression</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Voulez-vous vraiment supprimer {animalToDelete && animalToDelete.name}{" "}
					?{" "}
				</Modal.Body>
				<Modal.Footer>
					{" "}
					<Button className="btn--form" onClick={deleteAnimal}>
						Oui
					</Button>
					<Button className="btn--form" onClick={handleCloseDeleteModal}>
						Non
					</Button>
				</Modal.Footer>
			</Modal>

			<Footer />
		</>
	);
};

export default TableauBord;
