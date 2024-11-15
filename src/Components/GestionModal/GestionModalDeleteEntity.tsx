import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useAuth } from "../../Context/AuthContext.tsx";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { IFamily } from "../../Interfaces/IFamily.ts";

interface GestionModalProps {
    handleCloseDelete: () => void,
    showDelete: boolean,
    entityToDelete: IAssociation | IFamily | null
}


const GestionModalDeleteEntity = ({ handleCloseDelete, showDelete, entityToDelete }: GestionModalProps) => {


    const { logout } = useAuth();

    const fetchedURL = entityToDelete && "email_association" in entityToDelete ? `${import.meta.env.VITE_API_URL}/dashboard/association/profile` : `${import.meta.env.VITE_API_URL}/family`;

    const handleDelete = async () => {
        try {
            const response = await fetch(fetchedURL, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${localStorage.getItem("auth_token")}` },
            });

            if (!response.ok) {
                const error = await response.json();
                console.log(error);
                return;
            }
            logout();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal show={showDelete} onHide={handleCloseDelete} centered className={"modal__confirm"}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmez-vous cette demande ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Si vous confirmez votre demande, votre compte sera définitivement supprimé.
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
                    Supprimer le profil
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default GestionModalDeleteEntity;