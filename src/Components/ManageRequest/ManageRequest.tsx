import { Table, Form, Toast, ToastBody } from "react-bootstrap";
import "./ManageRequest.scss";
import Icon from "../Icon/Icon";
import { useEffect, useState } from "react";

const baseURL = import.meta.env.VITE_API_URL;
const statusList = ["En attente", "Acceptée", "Refusée", "Terminée"];

const ManageRequest = () => {
    const [requests, setRequests] = useState([]);
    // Faire interface

    const [editingItem, setEditingItem] = useState<number | null>(null);

    const [selectedStatus, setSelectedStatus] = useState("");

    const [toastAnimalId, setToastAnimalId] = useState<null | number>(null);
    const [toastData, setToastData] = useState<object | null>(null);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem("auth_token");
                const response = await fetch(`${baseURL}/dashboard/association/request`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    let requests = await response.json();
                    // Formater la date en jour/mois/année
                    requests = requests.map((request) => ({
                        ...request,
                        formattedDate: new Date(request.created_at).toLocaleDateString("fr-FR"),
                    }));

                    // On groupe les demandes par animaux
                    let groupedRequests = [];
                    requests.forEach((request) => {
                        let animalFound = false;
                        for (let group of groupedRequests) {
                            if (request.animal_id === group.animal.id) {
                                group.requests.push(request);
                                animalFound = true;
                                break;
                            }
                        }
                        if (animalFound === false) {
                            groupedRequests.push({
                                animal: request.animal,
                                requests: [request],
                            });
                        }
                    });
                    setRequests(groupedRequests);
                } else {
                    // Afficher une erreur
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchRequests();
    }, []);

    const handleClickOnEditStatus = (requestId: number, status: string) => {
        setEditingItem(requestId === editingItem ? null : requestId);
        if (requestId !== editingItem) {
            setSelectedStatus(status);
        }
    };

    const handleClickOnSaveNewStatus = async (request) => {
        console.log(selectedStatus);
        const previousStatus = request.status;
        if (previousStatus === selectedStatus) {
            setEditingItem(null);
            setSelectedStatus("");
            return;
        }
        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(`${baseURL}/dashboard/association/request/${request.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: selectedStatus }),
            });
            const updatedRequest = await response.json();
            if (response.ok) {
                setRequests((prevRequests) => {
                    return prevRequests.map((animalGroup) => {
                        // Si ce n'est pas le bon groupe d'animal, on le retourne tel quel
                        if (animalGroup.animal.id !== updatedRequest.animal_id) {
                            return animalGroup;
                        }
                        // Si c'est le bon groupe, on met à jour la requête concernée
                        return {
                            ...animalGroup,
                            requests: animalGroup.requests.map((request) => {
                                if (request.id === updatedRequest.id) {
                                    return {
                                        ...request,
                                        status: selectedStatus,
                                    };
                                }
                                return request;
                            }),
                        };
                    });
                });
                setToastAnimalId(updatedRequest.animal_id);
                setToastData({
                    message: "Statut mis à jour avec succès",
                    color: "success",
                });
            } else {
                setToastAnimalId(updatedRequest.animal_id);
                setToastData({
                    message:
                        "Erreur lors de la mise à jour du statut. Veuillez rafraîchir la page et réessayer.",
                    color: "danger",
                });
            }
            setEditingItem(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="manage-request">
            {requests.map((animalGroup) => (
                <section className="request" key={animalGroup.animal.id}>
                    <div className="request__header">
                        <img
                            src={`${baseURL}${animalGroup.animal.url_image}`}
                            alt=""
                            loading="lazy"
                        />
                        <h2>
                            <a href={`/animaux/${animalGroup.animal.slug}`} className="link">
                                {animalGroup.animal.name}
                            </a>
                        </h2>
                    </div>
                    <Toast
                        onClose={() => setToastAnimalId(null)}
                        show={toastAnimalId === animalGroup.animal.id}
                        delay={3000}
                        autohide
                        bg={toastData?.color}
                        className={"mb-2"}
                    >
                        <Toast.Body>{toastData?.message}</Toast.Body>
                    </Toast>
                    <Table striped bordered responsive className={"text-center"}>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Famille</th>
                                <th>Email</th>
                                <th>Date de la demande</th>
                                <th>Statut de la demande</th>
                                <th>Modifier</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animalGroup.requests.map((request) => (
                                <tr key={request.id}>
                                    <td>{request.id}</td>
                                    <td>
                                        <a
                                            href={`/famille/${request.family.slug}`}
                                            className="link"
                                        >
                                            {request.family.name}
                                        </a>
                                    </td>
                                    <td>
                                        {/* TODO Ajouter user dans le back pour recup mail */}
                                        <a href={`mailto:dupont@gmail.com`} className="link">
                                            dupont@gmail.com
                                        </a>
                                    </td>
                                    <td>{request.formattedDate}</td>
                                    <td>
                                        {editingItem === request.id ? (
                                            <Form.Select
                                                name="status"
                                                defaultValue={request.status}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                            >
                                                {statusList.map((status, index) => (
                                                    <option value={status} key={index}>
                                                        {status}
                                                    </option>
                                                ))}
                                            </Form.Select>
                                        ) : (
                                            <span>{request.status}</span>
                                        )}
                                    </td>
                                    {editingItem === request.id ? (
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn--save-status"
                                                onClick={() => handleClickOnSaveNewStatus(request)}
                                            >
                                                Ok
                                            </button>
                                        </td>
                                    ) : (
                                        <td className="edit">
                                            <Icon
                                                ariaLabel={"Modifier le statut de la demande"}
                                                src={"/src/assets/icons/pen.svg"}
                                                alt={"icône modifier"}
                                                onClick={() =>
                                                    handleClickOnEditStatus(
                                                        request.id,
                                                        request.status
                                                    )
                                                }
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </section>
            ))}
        </div>
    );
};
export default ManageRequest;
