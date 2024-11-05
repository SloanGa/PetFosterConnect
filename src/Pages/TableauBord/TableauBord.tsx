import "./TableauBord.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header.tsx";
import Footer from "../../Components/Footer/Footer.tsx";
import DashboadCard from "../../Components/DashboardCard/DashboardCard.tsx";
import AppLink from "../../Components/AppLink/AppLink.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
// import { Error } from "../../Components/Error/Error.tsx";
import { Button, Modal } from "react-bootstrap";
import { IAnimal } from "../../Interfaces/IAnimal.ts";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";
import { useState, useCallback } from "react";
import Icon from "../../Components/Icon/Icon.tsx";

const TableauBord = () => {
	// Gestion centralisée du state de la modale modifier : est-ce qu'elle est visible, à quelle association et quel animal elle est associée.

	const [modalState, setModalState] = useState({
		show: false,
		animalId: null,
	});
	// Quand on ouvre la modale, on lui transmet également l'id de l'association et de l'animal
	const handleShow = useCallback((animalId) => {
		setModalState({ show: true, animalId });
	}, []);
	// prev permet de conserver les autres informations de state et seul show est passé à false.
	const handleClose = useCallback(() => {
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
					handleClose();
					// TODO ajouter une notification de succès si nécessaire
				} else {
					console.error("Erreur lors de la mise à jour");
				}
			} catch (error) {
				console.error("Erreur:", error);
			}
		},
		[modalState.animalId, handleClose],
	);

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

					<div className="main__content__cards__container">
						<div className="row gx-8 gy-3">
							<div className="main__content__cards__container__card col-12 col-sm-6 col-md-4">
								<DashboadCard
									onShowModal={() => handleShow(1)}
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									animalId={1}
									associationId={1}
								/>
							</div>

							<div className="main__content__cards__container__card col-12 col-sm-6 col-md-4">
								<DashboadCard
									onShowModal={() => handleShow(1)}
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									animalId={1}
									associationId={1}
								/>
							</div>
							<div className=" main__content__cards__container__card col-12 col-sm-6 col-md-4">
								<DashboadCard
									onShowModal={() => handleShow(1)}
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									animalId={1}
									associationId={1}
								/>
							</div>
							<div className="main__content__cards__container__card col-12 col-sm-6 col-md-4">
								<DashboadCard
									onShowModal={() => handleShow(1)}
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

			<Modal
				show={modalState.show}
				onHide={handleClose}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title>Modifier les informations</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<fieldset className="fieldset__dashboard">
							<label htmlFor="input_name">
								{" "}
								Nom de l'animal :{" "}
								<input
									type="text"
									id="input_name"
									value="Toutou 1"
									name="name"
								/>
							</label>
						</fieldset>
						<fieldset className="fieldset__dashboard">
							<label htmlFor="img_upload">
								Télécharger un fichier :{" "}
								<input
									type="file"
									id="img_upload"
									name="animal_img"
									accept=".jpg, .jpeg, .png, .webp"
								/>
							</label>
						</fieldset>

						<fieldset className="fieldset__dashboard">
							<label htmlFor="input_gender">
								{" "}
								Genre de l'animal :{" "}
								<input
									type="text"
									id="input_gender"
									value="Mâle"
									name="gender"
								/>
							</label>
						</fieldset>

						<fieldset className="fieldset__dashboard">
							<label htmlFor="input_species">
								{" "}
								Espèce de l'animal :{" "}
								<input
									type="text"
									id="input_species"
									value="Chien"
									name="species"
								/>
							</label>
						</fieldset>

						<fieldset className="fieldset__dashboard">
							<label htmlFor="input_age">
								{" "}
								Age de l'animal :{" "}
								<input type="text" id="input_age" value="2" name="age" />
							</label>
						</fieldset>

						<fieldset className="fieldset__dashboard">
							<label htmlFor="input_size">
								Sélectionner une taille :{" "}
								<select id="input_size" name="size" defaultValue="Petit">
									<option value="Petit">Petit</option>
									<option value="Moyen">Moyen</option>
									<option value="Grand">Grand</option>
								</select>
							</label>
						</fieldset>

						<fieldset className="fieldset__dashboard">
							<label htmlFor="input_race">
								{" "}
								Race (optionnel) :{" "}
								<input type="text" id="input_race" value=" " name="race" />
							</label>
						</fieldset>

						<fieldset className="fieldset__dashboard">
							<legend className="fieldset--legend">Disponible</legend>

							<div className="ckeckbox-availibility">
								<label htmlFor="input_availability_yes">
									<input
										type="checkbox"
										id="input_availability_yes"
										name="availability"
										defaultChecked // "Oui" est cochée par défaut
									/>
									Oui
								</label>
								<label htmlFor="input_availability_no">
									<input
										type="checkbox"
										id="input_availability_no"
										name="availability"
									/>
									Non
								</label>
							</div>
						</fieldset>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button
						className="btn--form"
						variant="secondary"
						onClick={handleClose}
					>
						Fermer
					</Button>
					<Button className="btn--form" variant="primary" onClick={handleClose}>
						Enregistrer
					</Button>
				</Modal.Footer>
			</Modal>

			{/* Modale pour confirmer la suppression d'un animal */}

			<Footer />
		</>
	);
};

export default TableauBord;
