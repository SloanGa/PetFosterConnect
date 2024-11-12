import "./GestionModal.scss";
import { Modal, Button, Form } from "react-bootstrap";
import { Formik, FormikHelpers, FormikValues } from "formik";
import * as yup from "yup";
import { FormEvent } from "react";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { IFamily } from "../../Interfaces/IFamily.ts";

interface GestionModalProps {
    show: boolean;
    handleClose: () => void;
    entityToEdit: IAssociation | IFamily | null;
}

const GestionEditEntityModal: React.FC<GestionModalProps> = ({
                                                                 show,
                                                                 handleClose,
                                                                 entityToEdit,
                                                             }) => {

    const initialValues = {
        name: entityToEdit?.name || "",
        address: entityToEdit?.address || "",
        zip_code: entityToEdit?.zip_code || "",
        city: entityToEdit?.city || "",
        department_id: entityToEdit?.department_id || "",
        url_image: entityToEdit?.url_image || "",
        phone_number: entityToEdit?.phone_number || "",
        description: entityToEdit?.description || "",
        // Inclure email_association seulement si l'entité est une association
        email_association: entityToEdit && "email_association" in entityToEdit ? entityToEdit.email_association : "",
    };


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

    const handleSubmitEdit = (values) => {
        console.log(values);
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
                    validationSchema={validationSchema}
                    onSubmit={handleSubmitEdit} // C'est notre handlesubmit ici qui est passé à Formik
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
                                    value={values.gender || ""}
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
                                    value={values.species || ""}
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
                                    value={values.age || ""}
                                    onChange={handleChange}
                                    isInvalid={touched.age && !!errors.age}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.age}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group
                                aria-label="Selectionner la taille de l'animal"
                                className="mb-3"
                                controlId="size"
                            >
                                <Form.Label>Taille</Form.Label>
                                <Form.Select
                                    name="size"
                                    value={values.size || ""}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        Sélectionner une taille
                                    </option>
                                    <option value="Petit">Petit</option>
                                    <option value="Moyen">Moyen</option>
                                    <option value="Grand">Grand</option>
                                </Form.Select>
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
                                controlId="race"
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

                            <Form.Check // prettier-ignore
                                aria-label="Entrer la disponibilité de l'animal"
                                type="switch"
                                name="availability"
                                id="availability"
                                label="Disponible"
                                checked={values.availability || false}
                                onChange={handleChange}
                            />
                        </Form>
                    )}
                </Formik>
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
