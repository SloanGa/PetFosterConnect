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
}

const GestionModal: React.FC<GestionModalProps> = ({
	handleCloseEditModal,
	handleSubmit,
	showEditModal,
}) => {
	// remplace les defaultValue sur les inputs du formulaire/géré par Formik
	const initialValues = {
		animalName: "Toutou",
		animalImage: null, // Pour le fichier, il faut le gérer autrement
		animalGender: "Mâle",
		animalSpecies: "Chien",
		animalAge: "2",
		animalSize: "Moyen",
		animalRace: "", // Optionnel, vide par défaut
		animalAvailability: true, // Peut être décoché
	};

	// yup via valider les inputs et notamment si requis ou non
	const validationSchema = yup.object().shape({
		animalName: yup.string().required("Le nom de l'animal est requis"),
		animalGender: yup.string().required("Le genre de l'animal est requis"),
		animalSpecies: yup.string().required("L'espèce de l'animal est requise"),
		animalAge: yup.string().required("L'âge de l'animal est requis"),
		animalSize: yup.string().required("La taille de l'animal est requise"),
		animalRace: yup.string(), // Optionnel
		animalAvailability: yup.boolean(), // Optionnel
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
					{({ handleSubmit, handleChange, values, touched, errors }) => (
						<Form
							id="edit-animal-form"
							encType="multipart/form-data"
							onSubmit={handleSubmit} // C'est le handleSubmit de formik ici
						>
							<Form.Group
								aria-label="Entrer le nom de l'animal"
								className="mb-3"
								controlId="animalName"
							>
								<Form.Label>Nom de l'animal</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nom de l'animal"
									name="animalName"
									value={values.animalName}
									onChange={handleChange}
									isInvalid={touched.animalName && !!errors.animalName}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.animalName}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Télécharger l'image de l'animal"
								controlId="animalImage"
								className="mb-3"
							>
								<Form.Label>Image de l'animal</Form.Label>
								<Form.Control type="file" />
							</Form.Group>

							<Form.Group
								aria-label="Entrer le genre de l'animal"
								className="mb-3"
								controlId="animalGender"
							>
								<Form.Label>Genre</Form.Label>
								<Form.Control
									type="text"
									placeholder="Genre de l'animal"
									name="animalGender"
									value={values.animalGender}
									onChange={handleChange}
									isInvalid={touched.animalGender && !!errors.animalGender}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.animalGender}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Entrer l'espèce de l'animal"
								className="mb-3"
								controlId="animalSpecies"
							>
								<Form.Label>Espèce</Form.Label>
								<Form.Control
									type="text"
									placeholder="Espèce de l'animal"
									name="animalSpecies"
									value={values.animalSpecies}
									onChange={handleChange}
									isInvalid={touched.animalSpecies && !!errors.animalSpecies}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.animalSpecies}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Group
								aria-label="Entrer l'âge de l'animal"
								className="mb-3"
								controlId="animalAge"
							>
								<Form.Label>Age</Form.Label>
								<Form.Control
									type="text"
									placeholder="Age de l'animal"
									name="animalAge"
									value={values.animalAge}
									onChange={handleChange}
									isInvalid={touched.animalAge && !!errors.animalAge}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.animalAge}
								</Form.Control.Feedback>
							</Form.Group>

							<Form.Select
								aria-label="Selectionner la taille de l'animal"
								name="animalSize"
								value={values.animalSize}
								onChange={handleChange}
							>
								<option value="Petit">Petit</option>
								<option value="Moyen">Moyen</option>
								<option value="Grand">Grand</option>
							</Form.Select>

							<Form.Group
								aria-label="Entrer la race de l'animal (optionnel)"
								className="mb-3"
								controlId="animalRace"
							>
								<Form.Label>Race (optionnel)</Form.Label>
								<Form.Control
									type="text"
									placeholder="Race de l'animal"
									name="animalRace"
									value={values.animalRace}
									onChange={handleChange}
								/>
							</Form.Group>

							<Form.Check // prettier-ignore
								aria-label="Entrer la disponibilité de l'animal"
								type="switch"
								name="animalAvailability"
								id="animalAvailability"
								label="Disponible"
								checked={values.animalAvailability}
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
