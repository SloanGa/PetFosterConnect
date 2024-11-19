import "./GestionModal.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik } from "formik";
import { useState } from "react";
import type { IAssociation } from "../../Interfaces/IAssociation.ts";
import type { IFamily } from "../../Interfaces/IFamily.ts";
import { useFetchDepartments } from "../../Hook/useFetchDepartments.ts";
import Alert from "react-bootstrap/Alert";
import type { IUser } from "../../Interfaces/IUser.ts";

interface GestionModalProps {
	show: boolean;
	handleClose: () => void;
	entityToEdit: IAssociation | IFamily | null;
	setEntity: React.Dispatch<
		React.SetStateAction<IAssociation | IFamily | null>
	>;
	userToEdit: IUser | null;
	setAssociationData: React.Dispatch<
		React.SetStateAction<IAssociation | null | undefined>
	>;
}

const GestionEditEntityModal: React.FC<GestionModalProps> = ({
	show,
	handleClose,
	entityToEdit,
	userToEdit,
	setEntity,
	setAssociationData,
}) => {
	const { departments } = useFetchDepartments();
	const [alert, setAlert] = useState<{ message: string; type: string } | null>(
		null,
	);

	const initialValues = {
		name: entityToEdit?.name || "",
		address: entityToEdit?.address || "",
		zip_code: entityToEdit?.zip_code || "",
		city: entityToEdit?.city || "",
		department_id: entityToEdit?.department_id || "",
		phone_number: entityToEdit?.phone_number || "",
		description: entityToEdit?.description || "",
		email: userToEdit?.email || "",
		password: "",
		confirmPassword: "",
		// Inclure email_association seulement si l'entité est une association
		email_association:
			entityToEdit && "email_association" in entityToEdit
				? entityToEdit.email_association
				: "",
		family_img: null,
		association_img: null,
	};

	const fetchedURL =
		entityToEdit && "email_association" in entityToEdit
			? `${import.meta.env.VITE_API_URL}/dashboard/association/profile`
			: `${import.meta.env.VITE_API_URL}/family`;

	const handleSubmitEdit = async (values: any) => {
		const formData = new FormData();

		for (const key in values) {
			if (
				values[key] !== null &&
				values[key] !== undefined &&
				values[key] !== ""
			) {
				formData.append(key, values[key]);
			}
		}

		try {
			const response = await fetch(fetchedURL, {
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
				},
				body: formData,
			});

			if (!response.ok) {
				const error = await response.json();
				const alert = {
					message: error.error,
					type: "custom-red",
				};
				setAlert(alert);

				setTimeout(() => {
					setAlert(null);
				}, 2000);
				return;
			}

			const data = await response.json();
			setAssociationData(data);
			setEntity(data);
			const alert = {
				message: "Modifications prises en compte.",
				type: "custom-green",
			};
			setAlert(alert);

			setTimeout(() => {
				handleClose();
				setAlert(null);
			}, 1500);
		} catch (error) {
			const alert = {
				message:
					"Une erreur s'est produite, votre demande n'a pas abouti. Veuillez réessayer.",
				type: "custom-red",
			};
			setAlert(alert);
		}
	};

	return (
		<Modal
			show={show}
			onHide={handleClose}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title>Modifier les informations</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Formik initialValues={initialValues} onSubmit={handleSubmitEdit}>
					{({ handleSubmit, handleChange, values, setFieldValue }) => (
						<Form
							id="edit-animal-form"
							encType="multipart/form-data"
							onSubmit={handleSubmit}
						>
							<Form.Group className="mb-1" controlId="name">
								<Form.Label column="sm">Nom</Form.Label>
								<Form.Control
									type="text"
									placeholder="Nom"
									name="name"
									value={values.name || ""}
									onChange={handleChange}
								/>
							</Form.Group>

							{/* Input adresse */}
							<Form.Group
								controlId="formBasicAddress"
								className="form__address mb-1"
							>
								<Form.Label column="sm">Adresse *</Form.Label>
								<Form.Control
									className="form__connexion_input"
									type="text"
									name="address"
									placeholder="Adresse"
									value={values.address}
									onChange={handleChange}
								/>
							</Form.Group>

							{/* Input zip_code */}
							<Form.Group
								controlId="formBasicZipcode"
								className="form__zipcode mb-1"
							>
								<Form.Label column="sm">Code postal *</Form.Label>
								<Form.Control
									className="form__connexion_input"
									type="text"
									name="zip_code"
									placeholder="Code postal"
									value={values.zip_code}
									onChange={handleChange}
								/>
							</Form.Group>

							{/* Input city */}
							<Form.Group controlId="formBasicCity" className="form__city mb-1">
								<Form.Label column="sm">Ville *</Form.Label>
								<Form.Control
									className="form__connexion_input"
									type="text"
									name="city"
									placeholder="Ville"
									value={values.city}
									onChange={handleChange}
								/>
							</Form.Group>

							{/*/!* Input departments *!/*/}
							<Form.Group
								controlId="formBasicDepartments"
								className="form__departement mb-1"
							>
								<Form.Label column="sm">Département *</Form.Label>
								<Form.Control
									as="select"
									name="department_id"
									onChange={handleChange}
								>
									<option value={entityToEdit!.department_id}>
										{entityToEdit?.department.name}
									</option>
									{departments.map((department) => (
										<option key={department.id} value={department.id}>
											{department.name}
										</option>
									))}
								</Form.Control>
							</Form.Group>

							{entityToEdit && "email_association" in entityToEdit ? (
								<Form.Group controlId="formBasicEmailAsso" className="mb-1">
									<Form.Label column="sm" className="form__emailAsso">
										Adresse mail de contact *
									</Form.Label>
									<Form.Control
										className="form__connexion_input"
										type="text"
										name="email_association"
										placeholder="Adresse mail de contact de l'association"
										value={values.email_association}
										onChange={handleChange}
									/>
								</Form.Group>
							) : null}

							{/* Input phone_number */}
							<Form.Group controlId="formBasicPhoneNumber" className="mb-1">
								<Form.Label column="sm" className="form__number">
									Numéro de téléphone *
								</Form.Label>
								<Form.Control
									className="form__connexion_input"
									type="text"
									name="phone_number"
									placeholder="Numéro de téléphone"
									value={values.phone_number}
									onChange={handleChange}
								/>
							</Form.Group>

							{/* Input file */}

							{entityToEdit && "email_association" in entityToEdit ? (
								/* mode = association */
								<Form.Group
									controlId="formBasicFile"
									className="form__file mb-1"
								>
									<Form.Label column="sm">
										Photo / Logo de l'association *
									</Form.Label>
									<Form.Control
										className="form__connexion_input"
										type="file"
										name="association_img"
										accept="image/png, image/jpeg, image/webp, image/jpg"
										onChange={(event) => {
											const file =
												(event.currentTarget as HTMLInputElement).files?.[0] ||
												null;
											setFieldValue("family_img", file);
										}}
									/>
								</Form.Group>
							) : (
								/* mode = family */
								<Form.Group
									controlId="formBasicFile"
									className="form__file mb-1"
								>
									<Form.Label column="sm">Photo de profil</Form.Label>
									<Form.Control
										className="form__connexion_input"
										type="file"
										name="family_img"
										accept="image/png, image/jpeg, image/webp, image/jpg"
										onChange={(event) => {
											const file =
												(event.currentTarget as HTMLInputElement).files?.[0] ||
												null;
											setFieldValue("association_img", file);
										}}
									/>
								</Form.Group>
							)}

							<Form.Group
								aria-label="Description"
								controlId="description"
								className="mb-2"
							>
								<Form.Label column="sm">Description</Form.Label>
								<Form.Control
									type="text"
									placeholder="Description de l'animal"
									name="description"
									value={values.description || ""}
									onChange={handleChange}
								/>
							</Form.Group>

							<p className="info__form">Informations utilisateur</p>
							{/* Input email */}
							<Form.Group
								controlId="formBasicEmail"
								className="form__email mb-1"
							>
								<Form.Label column="sm" className="label">
									Email de connexion *
								</Form.Label>
								<Form.Control
									className="input"
									type="email"
									name="email"
									placeholder="Email de connexion"
									value={values.email}
									onChange={handleChange}
								/>
							</Form.Group>

							{/* Input mot de passe */}
							<Form.Group
								controlId="formBasicPassword"
								className="form__password mb-1"
							>
								<Form.Label column="sm" className="label">
									Changer de mot de passe :
								</Form.Label>
								<Form.Control
									className="input input__password"
									type={"password"}
									name="password"
									placeholder="Nouveau mot de passe"
									onChange={handleChange}
								/>
							</Form.Group>

							{/* Input confirme mot de passe */}
							<Form.Group
								controlId="formBasicConfirmPassword"
								className="form__passwordconfirm mb-1"
							>
								<Form.Label column="sm" className="label">
									Confirmez votre nouveau mot de passe
								</Form.Label>
								<Form.Control
									className="input input__password"
									type={"password"}
									name="confirmPassword"
									placeholder="Confirmez votre nouveau mot de passe"
									onChange={handleChange}
								/>
							</Form.Group>
						</Form>
					)}
				</Formik>
				{alert && (
					<Alert
						variant={alert.type}
						dismissible
						className={`alert ${alert?.type ? `toast-${alert?.type}` : ""}`}
					>
						{alert.message}
					</Alert>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button className="btn--form" onClick={handleClose}>
					Fermer
				</Button>
				<Button className="btn--form" type="submit" form="edit-animal-form">
					Enregistrer
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default GestionEditEntityModal;
