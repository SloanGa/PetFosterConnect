import "./GestionModal.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";

interface GestionModalProps {
	handleCloseEditModal: () => void;
	showEditModal: () => void;
	setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
	handleSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
	animalToEdit: object;
}

const GestionModal: React.FC<GestionModalProps> = ({
	handleCloseEditModal,
	handleSubmit,
	showEditModal,
	animalToEdit,
}) => {
	// remplace les defaultValue sur les inputs du formulaire/géré par Formik
	const initialValues = animalToEdit
		? {
				name: animalToEdit.name,
				animal_img: null, // Pour le fichier, il faut le gérer autrement
				gender: animalToEdit.gender ?? "Mâle",
				species: animalToEdit.species ?? "Chien",
				age: animalToEdit.age ?? "2",
				size: animalToEdit.size ?? "Moyen",
				race: animalToEdit.race ?? "",
				description: animalToEdit.description ?? "Adorable chien",
				availability: animalToEdit.availability ?? true,
			}
		: {};

	// yup via valider les inputs et notamment si requis ou non
	const validationSchema = yup.object().shape({
		name: yup.string().required("Le nom de l'animal est requis"),
		gender: yup.string().required("Le genre de l'animal est requis"),
		species: yup.string().required("L'espèce de l'animal est requise"),
		age: yup.string().required("L'âge de l'animal est requis"),
		size: yup.string().required("La taille de l'animal est requise"),
		race: yup.string(),
		description: yup
			.string()
			.required("La description de l'animal est requise"),
		availability: yup.boolean(), // Optionnel
	});
	return (
		<Modal
			show={showEditModal}
			onHide={handleCloseEditModal}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Modifier les informations</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit} // C'est notre handlesubmit ici qui est passé à Formik
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
							onSubmit={handleSubmit} // C'est le handleSubmit de formik ici
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
									value={values.name}
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
								{/* Pour ajouter dans les values de formik le fichier */}
								<Form.Label>Image de l'animal</Form.Label>
								<Form.Control
									type="file"
									name="animal_img"
									onChange={(event) => {
										const file = event.currentTarget.files[0];
										setFieldValue("animal_img", file);
									}}
								/>
							</Form.Group>

							<Form.Group
								aria-label="Entrer le genre de l'animal"
								className="mb-3"
								controlId="gender"
							>
								<Form.Label>Genre</Form.Label>
								<Form.Control
									type="text"
									placeholder="Genre de l'animal"
									name="gender"
									value={values.gender}
									onChange={handleChange}
									isInvalid={touched.gender && !!errors.gender}
								/>
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
								<Form.Control
									type="text"
									placeholder="Espèce de l'animal"
									name="species"
									value={values.species}
									onChange={handleChange}
									isInvalid={touched.species && !!errors.species}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.species}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Entrer l'âge de l'animal"
								className="mb-3"
								controlId="age"
							>
								<Form.Label>Age</Form.Label>
								<Form.Control
									type="text"
									placeholder="Age de l'animal"
									name="age"
									value={values.age}
									onChange={handleChange}
									isInvalid={touched.age && !!errors.age}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.age}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Select
								aria-label="Selectionner la taille de l'animal"
								name="size"
								value={values.size}
								onChange={handleChange}
							>
								<option value="Petit">Petit</option>
								<option value="Moyen">Moyen</option>
								<option value="Grand">Grand</option>
							</Form.Select>

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
									value={values.race}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Group
								aria-label="Entrer la description de l'animal (optionnel)"
								className="mb-3"
								controlId="race"
							>
								<Form.Label>Description</Form.Label>
								<Form.Control
									type="text"
									placeholder="Description de l'animal"
									name="description"
									value={values.description}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Check // prettier-ignore
								aria-label="Entrer la disponibilité de l'animal"
								type="switch"
								name="availability"
								id="availability"
								label="Disponible"
								checked={values.availability}
								onChange={handleChange}
							/>
						</Form>
					)}
				</Formik>
			</Modal.Body>
			<Modal.Footer>
				<Button className="btn--form" onClick={handleCloseEditModal}>
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
