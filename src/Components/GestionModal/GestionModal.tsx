import "./GestionModal.scss";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";

interface GestionModalProps {
	handleCloseEditModal: () => void;
	modalState: ModalState;
	setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
}

const GestionModal: React.FC<GestionModalProps> = ({
	handleCloseEditModal,
	modalState,
	setModalState,
}) => {
	return (
		<Modal
			show={modalState.show}
			onHide={handleCloseEditModal}
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
								defaultValue="Toutou 1"
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
								defaultValue="Mâle"
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
								defaultValue="Chien"
								name="species"
							/>
						</label>
					</fieldset>

					<fieldset className="fieldset__dashboard">
						<label htmlFor="input_age">
							{" "}
							Age de l'animal :{" "}
							<input type="text" id="input_age" defaultValue="2" name="age" />
						</label>
					</fieldset>

					<fieldset className="fieldset__dashboard">
						<label htmlFor="input_size">
							Sélectionner une taille :{" "}
							<select id="input_size" name="size" defaultValue="Petit">
								<option defaultValue="Petit">Petit</option>
								<option defaultValue="Moyen">Moyen</option>
								<option defaultValue="Grand">Grand</option>
							</select>
						</label>
					</fieldset>

					<fieldset className="fieldset__dashboard">
						<label htmlFor="input_race">
							{" "}
							Race (optionnel) :{" "}
							<input type="text" id="input_race" defaultValue=" " name="race" />
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
				<Button className="btn--form" onClick={handleCloseEditModal}>
					Fermer
				</Button>
				<Button className="btn--form" onClick={handleCloseEditModal}>
					Enregistrer
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default GestionModal;
