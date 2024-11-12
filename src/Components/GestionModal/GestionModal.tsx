import "./GestionModal.scss";
import { Modal, Button, Form, Toast } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { IAnimal } from "../../Interfaces/IAnimal.ts";

interface GestionModalProps {
	handleCloseGestionModal: () => void;
	showGestionModal: () => void;
	handleSubmitEdit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	handleSubmitAdd: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	animalToEdit: IAnimal | null;
	callbackTest: () => void;
	showToast: boolean;
	toggleToast: () => void;
	toastMessage: string;
	toastClassname: string;
}

const GestionModal: React.FC<GestionModalProps> = ({
	handleCloseGestionModal,
	handleSubmitEdit,
	handleSubmitAdd,
	showGestionModal,
	animalToEdit,
	callbackTest,
	showToast,
	toggleToast,
	toastMessage,
	toastClassname,
}) => {
	// remplace les defaultValue sur les inputs du formulaire/géré par Formik mais est aussi obligatoire pour la validation - pour que ce soit des champs contrôlés
	const initialValues = {
		name: animalToEdit?.name || "",
		animal_img: null,
		gender: animalToEdit?.gender || "",
		species: animalToEdit?.species || "",
		age: animalToEdit?.age || 0,
		size: animalToEdit?.size || "",
		race: animalToEdit?.race || "",
		description: animalToEdit?.description || "",
		availability: animalToEdit?.availability || false,
	};

	// Les filtres pour la validation de l'image

	const FILE_SIZE = 5 * 1024 * 1024; // 5 MB
	const SUPPORTED_FORMATS = [
		"image/jpg",
		"image/jpeg",
		"image/webp",
		"image/png",
	];

	// yup via valider les inputs et notamment si requis ou non
	const validationSchema = yup.object().shape({
		name: yup.string().required("Le nom de l'animal est requis"),
		gender: yup.string().required("Le genre de l'animal est requis"),
		animal_img: animalToEdit
			? yup
					.mixed()
					.nullable()
					.notRequired()
					.test("fileSize", "L'image ne doit pas dépasser 5 MB", (value) => {
						if (!value) return true;
						return value.size <= FILE_SIZE;
					})
					.test(
						"fileFormat",
						"Format non supporté. Utilisez JPG, JPEG, WEBP ou PNG",
						(value) => {
							if (!value) return true;
							return SUPPORTED_FORMATS.includes(value.type);
						},
					)
			: yup
					.mixed()
					.nullable()
					.required("L'image de l'animal est requise")
					.test("fileSize", "L'image ne doit pas dépasser 5 MB", (value) => {
						if (!value) return true;
						return value.size <= FILE_SIZE;
					})
					.test(
						"fileFormat",
						"Format non supporté. Utilisez JPG, JPEG, WEBP ou PNG",
						(value) => {
							if (!value) return true;
							return SUPPORTED_FORMATS.includes(value.type);
						},
					),
		species: yup.string().required("L'espèce de l'animal est requise"),
		age: yup
			.number()
			.nullable()
			.min(0)
			.required("L'âge de l'animal est requis"),
		size: yup.string().required("La taille de l'animal est requise"),
		race: yup.string(),
		description: yup
			.string()
			.required("La description de l'animal est requise"),
		availability: animalToEdit
			? yup.boolean().notRequired()
			: yup.boolean().required("Vous devez spécifier la disponibilité"),
	});

	const handleSubmitAction = animalToEdit ? handleSubmitEdit : handleSubmitAdd;
	return (
		<Modal
			show={showGestionModal}
			onHide={handleCloseGestionModal}
			size="lg"
			centered
			dialogClassName="custom-modal-dialog"
		>
			<Modal.Header closeButton>
				<Modal.Title>
					{animalToEdit ? "Modifier les informations" : "Ajouter un animal"}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={animalToEdit ? handleSubmitEdit : handleSubmitAdd}
					validateOnBlur={false}
					validateOnChange={false}
				>
					{({
						handleSubmit,
						handleChange,
						values,
						touched,
						errors,
						setFieldValue,
					}) => (
						<Form
							id="edit-animal-form"
							encType="multipart/form-data"
							onSubmit={handleSubmit} // C'est le handleSubmitEdit de formik ici
						>
							<Form.Group
								aria-label="Entrer le nom de l'animal"
								className="mb-3"
								controlId="name"
							>
								<Form.Label>Nom de l'animal</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nom de l'animal"
									name="name"
									value={values.name || ""}
									onChange={handleChange}
									isInvalid={touched.name && !!errors.name}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.name}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Télécharger l'image de l'animal"
								controlId="animal_img"
								className="mb-3"
							>
								<Form.Label>Image de l'animal</Form.Label>
								<Form.Control
									type="file"
									name="animal_img"
									onChange={(event) => {
										const file = event.currentTarget.files[0];
										setFieldValue("animal_img", file);
									}}
									isInvalid={!!errors.animal_img}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.animal_img}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Entrer le genre de l'animal"
								className="mb-3"
								controlId="gender"
							>
								<Form.Label>Genre</Form.Label>
								<Form.Select
									name="genre"
									value={values.gender || ""}
									onChange={handleChange}
									isInvalid={!!errors.gender}
								>
									<option value="" disabled>
										Sélectionner un genre
									</option>
									<option value="Femelle">Femelle</option>
									<option value="Mâle">Mâle</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.gender}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Entrer l'espèce de l'animal"
								className="mb-3"
								controlId="species"
							>
								<Form.Label>Espèce</Form.Label>
								<Form.Select
									name="species"
									value={values.species || ""}
									onChange={handleChange}
									isInvalid={!!errors.species}
								>
									<option value="" disabled>
										Sélectionner une espèce
									</option>
									<option value="Chat">Chat</option>
									<option value="Chien">Chien</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.gender}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Entrer l'âge de l'animal (en année(s))"
								className="mb-3"
								controlId="age"
							>
								<Form.Label>Âge (en année(s))</Form.Label>
								<Form.Control
									type="number"
									placeholder="Exemple : 2"
									name="age"
									value={values.age || 0}
									min="0"
									onChange={handleChange}
									isInvalid={touched.age && !!errors.age}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.age}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Sélectionner la taille de l'animal"
								className="mb-3"
								controlId="size"
							>
								<Form.Label>Taille</Form.Label>
								<Form.Select
									name="size"
									value={values.size || ""}
									onChange={handleChange}
									isInvalid={!!errors.size}
								>
									<option value="" disabled>
										Sélectionner une taille
									</option>
									<option value="Petit">Petit</option>
									<option value="Moyen">Moyen</option>
									<option value="Grand">Grand</option>
								</Form.Select>
								<Form.Control.Feedback type="invalid">
									{errors.size}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Entrer la race de l'animal (optionnel)"
								className="mb-3"
								controlId="race"
							>
								<Form.Label>Race (optionnel)</Form.Label>
								<Form.Control
									type="text"
									placeholder="Race de l'animal"
									name="race"
									value={values.race || ""}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group
								aria-label="Entrer la description de l'animal (optionnel)"
								className="mb-3"
								controlId="description"
							>
								<Form.Label>Description</Form.Label>
								<Form.Control
									as="textarea"
									className="form__description"
									placeholder="Description de l'animal"
									name="description"
									value={values.description || ""}
									onChange={handleChange}
									isInvalid={!!errors.description}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.description}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Disponibilité</Form.Label>
								<div className="d-flex align-items-center">
									<Form.Check
										type="switch"
										id="availability"
										name="availability"
										checked={values.availability || false}
										onChange={handleChange}
										isInvalid={!!errors.availability}
										aria-label="Changer la disponibilité de l'animal"
									/>
									<span className="ms-2">
										{values.availability ? "Disponible" : "Non disponible"}
									</span>
								</div>
								{errors.availability && (
									<Form.Text className="text-danger">
										{errors.availability}
									</Form.Text>
								)}
							</Form.Group>
						</Form>
					)}
				</Formik>
				<div className="toast__modal d-flex justify-content-center mb-1">
					<Toast show={showToast} onClose={toggleToast}>
						<Toast.Body>{toastMessage}</Toast.Body>
					</Toast>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button className="btn--form" onClick={handleCloseGestionModal}>
					Fermer
				</Button>
				<Button className="btn--form" type="submit" form="edit-animal-form">
					Enregistrer
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default GestionModal;
