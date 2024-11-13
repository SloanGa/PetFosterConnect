import "./GestionModal.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { FormEvent, useState } from "react";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { IFamily } from "../../Interfaces/IFamily.ts";
import { useFetchDepartments } from "../../Hook/useFetchDepartments.ts";
import Alert from "react-bootstrap/Alert";

interface GestionModalProps {
    show: boolean;
    handleClose: () => void;
    entityToEdit: IAssociation | IFamily | null;
    setEntity: React.Dispatch<React.SetStateAction<IAssociation | IFamily | null>>;
}

const GestionEditEntityModal: React.FC<GestionModalProps> = ({
                                                                 show,
                                                                 handleClose,
                                                                 entityToEdit,
                                                                 setEntity,
                                                             }) => {

    const { departments } = useFetchDepartments();
    const [isSubmit, setIsSubmit] = useState(false);
    const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);


    const initialValues = {
        name: entityToEdit?.name || "",
        address: entityToEdit?.address || "",
        zip_code: entityToEdit?.zip_code || "",
        city: entityToEdit?.city || "",
        department_id: entityToEdit?.department_id || "",
        phone_number: entityToEdit?.phone_number || "",
        description: entityToEdit?.description || "",
        // Inclure email_association seulement si l'entité est une association
        email_association: entityToEdit && "email_association" in entityToEdit ? entityToEdit.email_association : "",
        family_img: entityToEdit?.family_img || "",
        association_img: entityToEdit && "email_association" in entityToEdit ? entityToEdit.association_img : "",
    };

    const fetchedURL = entityToEdit && "email_association" in entityToEdit ? `${import.meta.env.VITE_API_URL}/dashboard/association/profile` : `${import.meta.env.VITE_API_URL}/family`;
    
    const handleSubmitEdit = async (values) => {
        const formData = new FormData();

        for (const key in values) {
            if (values[key] !== null && values[key] !== undefined && values[key] !== "") {
                formData.append(key, values[key]);
            }
        }

        try {

            const response = await fetch(fetchedURL, {
                method: "PATCH",
                headers: { "Authorization": `Bearer ${localStorage.getItem("auth_token")}` },
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                setAlert(error);
                console.log(error);
                return;
            }

            const data = await response.json();

            setEntity(data);
            const alert = {
                message: "Modifications prises en compte.",
                type: "success",
            };
            setAlert(alert);

        } catch (error) {
            const alert = {
                message:
                    "Une erreur s'est produite, votre demande n'a pas abouti. Veuillez réessayer.",
                type: "danger",
            };
            setAlert(alert);
        } finally {
            setTimeout(() => {
                handleClose();
                setAlert(null);
            }, 1500);
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
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmitEdit}
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
                                aria-label="Modifier le nom"
                                className="mb-3"
                                controlId="name"
                            >
                                <Form.Label>Nom</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nom"
                                    name="name"
                                    value={values.name || ""}
                                    onChange={handleChange}
                                />

                            </Form.Group>

                            {/* Input adresse */}
                            <Form.Group controlId="formBasicAddress" className="form__address">
                                <Form.Label column="sm">
                                    Votre Adresse *
                                </Form.Label>
                                <Form.Control
                                    className="form__connexion_input"
                                    type="text"
                                    name="address"
                                    aria-label="Votre adresse"
                                    placeholder="Votre adresse"
                                    value={values.address}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            {/* Input zip_code */}
                            <Form.Group controlId="formBasicZipcode" className="form__zipcode">
                                <Form.Label column="sm">
                                    Votre code postal *
                                </Form.Label>
                                <Form.Control
                                    className="form__connexion_input"
                                    type="text"
                                    name="zip_code"
                                    aria-label="Votre code postal"
                                    placeholder="Votre code postal"
                                    value={values.zip_code}
                                    onChange={handleChange}
                                />
                            </Form.Group>


                            {/* Input city */}
                            <Form.Group controlId="formBasicCity" className="form__city">
                                <Form.Label column="sm">
                                    Votre Ville *
                                </Form.Label>
                                <Form.Control
                                    className="form__connexion_input"
                                    type="text"
                                    name="city"
                                    aria-label="Votre ville"
                                    placeholder="Votre ville"
                                    value={values.city}
                                    onChange={handleChange}
                                />
                            </Form.Group>


                            {/*/!* Input departments *!/*/}
                            <Form.Group controlId="formBasicDepartments" className="form__departement">
                                <Form.Label column="sm">Votre département *</Form.Label>
                                <Form.Control as="select" name="department_id"
                                              onChange={handleChange}
                                >
                                    <option value={entityToEdit!.department_id}>{entityToEdit?.department.name}</option>
                                    {departments.map((department) => (
                                        <option key={department.id} value={department.id}>
                                            {department.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>


                            {entityToEdit && "email_association" in entityToEdit ? (
                                <Form.Group controlId="formBasicEmailAsso">
                                    <Form.Label column="sm" className="form__emailAsso">
                                        Votre adresse mail d'association *
                                    </Form.Label>
                                    <Form.Control
                                        className="form__connexion_input"
                                        type="text"
                                        name="email_association"
                                        aria-label="Votre adresse mail d'association"
                                        placeholder="Votre adresse mail d'association"
                                        value={values.email_association}
                                        onChange={handleChange}
                                    />
                                </Form.Group>) : null}


                            {/* Input phone_number */}
                            <Form.Group controlId="formBasicPhoneNumber">
                                <Form.Label column="sm" className="form__number">
                                    Votre numéro de téléphone *
                                </Form.Label>
                                <Form.Control
                                    className="form__connexion_input"
                                    type="text"
                                    name="phone_number"
                                    aria-label="Votre numéro de téléphone"
                                    placeholder="Votre numéro de téléphone"
                                    value={values.phone_number}
                                    onChange={handleChange}
                                />
                            </Form.Group>


                            {/* Input file */}

                            {entityToEdit && "email_association" in entityToEdit ?
                                /* mode = family */
                                (<Form.Group controlId="formBasicFile" className="form__file">
                                    <Form.Label column="sm">
                                        Votre photo de profil
                                    </Form.Label>
                                    <Form.Control
                                        className="form__connexion_input"
                                        type="file"
                                        name="family_img"
                                        aria-label="Votre photo de profil"
                                        accept="image/png, image/jpeg, image/webp, image/jpg"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0];
                                            console.log(file);
                                            setFieldValue("association_img", file);
                                        }}
                                    />
                                </Form.Group>) :

                                /* mode = association */
                                <Form.Group controlId="formBasicFile" className="form__file">
                                    <Form.Label column="sm">
                                        Votre photo de profil *
                                    </Form.Label>
                                    <Form.Control
                                        className="form__connexion_input"
                                        type="file"
                                        name="association_img"
                                        aria-label="Votre photo de profil"
                                        accept="image/png, image/jpeg, image/webp, image/jpg"
                                        onChange={(event) => {
                                            const file = event.currentTarget.files[0] || null;
                                            console.log(file);
                                            setFieldValue("family_img", file);
                                        }}
                                    />
                                </Form.Group>}


                            <Form.Group
                                aria-label="Votre description"
                                controlId="description"
                                className="mb-3"
                            >

                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Description de l'animal"
                                    name="description"
                                    value={values.description || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                        </Form>
                    )}
                </Formik>
                {alert && (
                    <Alert variant={alert.type} dismissible className="alert">
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
