import "./TableauBord.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header.tsx";
import Footer from "../../Components/Footer/Footer.tsx";
import DashboardCard from "../../Components/DashboardCard/DashboardCard.tsx";
import AppLink from "../../Components/AppLink/AppLink.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
// import { Error } from "../../Components/Error/Error.tsx";
import { Button, Modal } from "react-bootstrap";
import { IAnimal } from "../../Interfaces/IAnimal.ts";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";
import { useState, useCallback } from "react";
import Icon from "../../Components/Icon/Icon.tsx";
import GestionModal from "../../Components/GestionModal/GestionModal.tsx";

const TableauBord = () => {
	// Gestion centralisée du state de la modale modifier : est-ce qu'elle est visible, à quelle association et quel animal elle est associée.

	const [modalState, setModalState] = useState({
		show: false,
		animalId: null,
	});
	// Quand on ouvre la modale, on lui transmet également l'id de l'association et de l'animal
	const handleShowEditModal = useCallback((animalId) => {
		setModalState({ show: true, animalId });
	}, []);
	// prev permet de conserver les autres informations de state et seul show est passé à false.
	const handleCloseEditModal = useCallback(() => {
		setModalState((prev) => ({ ...prev, show: false }));
	}, []);

	// L'event listener à la soumission du formulaire

	const handleSubmit = useCallback(
		async (event) => {
			event.preventDefault();
			const formData = new FormData(event.target);
			const data = Object.fromEntries(formData.entries());

			try {
				const response = await fetch(
					// En attendant l'authentification, on passe pour le test en dur l'id de l'association.
					`${import.meta.env.VITE_API_URL}/association/animals/search/1`,
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							...data,
							animalId: modalState.animalId,
						}),
					},
				);

				if (response.ok) {
					handleCloseEditModal();
					// TODO ajouter une notification de succès si nécessaire
				} else {
					console.error("Erreur lors de la mise à jour");
				}
			} catch (error) {
				console.error("Erreur:", error);
			}
		},
		[modalState.animalId, handleCloseEditModal],
	);

	// Gestion de la modale confirmation de suppression

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleCloseDeleteModal = () => setShowDeleteModal(false);
	const handleShowDeleteModal = () => setShowDeleteModal(true);

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
							onClick={() => onShowDeleteModal()}
						/>
					</div>

					<div className="main__content__cards__container">
						<div className="row gx-8 gy-3">
							<div className="main__content__cards__container__card col-12 col-sm-6 col-md-4">
								<DashboardCard
									onShowEditModal={() => handleShowEditModal(1)}
									onShowDeleteModal={() => handleShowDeleteModal()}
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									animalId={1}
									associationId={1}
								/>
							</div>

							<div className="main__content__cards__container__card col-12 col-sm-6 col-md-4">
								<DashboardCard
									onShowEditModal={() => handleShowEditModal(1)}
									onShowDeleteModal={() => handleShowDeleteModal()}
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									animalId={1}
									associationId={1}
								/>
							</div>
							<div className=" main__content__cards__container__card col-12 col-sm-6 col-md-4">
								<DashboardCard
									onShowEditModal={() => handleShowEditModal(1)}
									onShowDeleteModal={() => handleShowDeleteModal()}
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									animalId={1}
									associationId={1}
								/>
							</div>
							<div className="main__content__cards__container__card col-12 col-sm-6 col-md-4">
								<DashboardCard
									onShowEditModal={() => handleShowEditModal(1)}
									onShowDeleteModal={() => handleShowDeleteModal()}
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									animalId={1}
									associationId={1}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modale pour modifier un animal */}

			<GestionModal
				handleCloseEditModal={handleCloseEditModal}
				modalState={modalState}
				setModalState={setModalState}
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
				<Modal.Body>Voulez-vous vraiment supprimer XXX ? </Modal.Body>
				<Modal.Footer>
					{" "}
					<Button className="btn--form" onClick={handleCloseDeleteModal}>
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
