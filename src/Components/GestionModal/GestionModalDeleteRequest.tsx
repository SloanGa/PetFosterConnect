import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../Context/AuthContext.tsx";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { IFamily } from "../../Interfaces/IFamily.ts";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import IRequest from "../../Interfaces/IRequest.ts";

interface GestionModalProps {
    handleCloseDelete: () => void,
    showDelete: boolean,
    selectedRequest: number
    setIsDeleteRequest?: React.Dispatch<React.SetStateAction<boolean>>;
}


const GestionModalDeleteRequest = ({
                                       handleCloseDelete,
                                       showDelete,
                                       selectedRequest,
                                       setIsDeleteRequest,
                                   }: GestionModalProps) => {

    const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/requests/family/${selectedRequest}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("auth_token")}` },
            });

            if (!response.ok) {
                const error = await response.json();
                const alert = {
                    message: error.error,
                    type: "danger",
                };
                setAlert(alert);

                setTimeout(() => {
                    setAlert(null);
                }, 2000);
                return;
            }

            const alert = {
                message: "Demande supprimée.",
                type: "success",
            };
            setAlert(alert);

            /* Permet de re render le dom */
            setIsDeleteRequest!((prev) => !prev);

            setTimeout(() => {
                handleCloseDelete();
                setAlert(null);
            }, 1500);


        } catch (error) {
            const alert = {
                message:
                    "Une erreur s'est produite, votre demande n'a pas abouti. Veuillez réessayer.",
                type: "danger",
            };
            setAlert(alert);
        }
    };

    return (
        <Modal show={showDelete} onHide={handleCloseDelete} centered className={"modal__confirm"}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmez-vous cette demande ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Si vous confirmez, votre demande sera définitivement supprimée.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete} className={"btn--cancel"}>
                    Annuler
                </Button>

                <Button
                    variant="primary"
                    onClick={handleDelete}
                    className={"btn--confirm"}
                >
                    Supprimer la demande
                </Button>
            </Modal.Footer>
            {alert && (
                <Alert variant={alert.type} dismissible className="alert">
                    {alert.message}
                </Alert>
            )}
        </Modal>
    );
};

export default GestionModalDeleteRequest;