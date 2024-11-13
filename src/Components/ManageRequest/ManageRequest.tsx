import { Table, Form } from "react-bootstrap";
import "./ManageRequest.scss";
import Icon from "../Icon/Icon";
import { useEffect, useState } from "react";

const baseURL = import.meta.env.VITE_API_URL;

const ManageRequest = () => {
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const [selectedStatus, setSelectedStatus] = useState("");

    const [requests, setRequests] = useState([]);
    // Faire interface

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
                        if (request.animal_id in groupedRequests) {
                            groupedRequests[request.animal_id].requests.push(request);
                        } else {
                            groupedRequests[request.animal_id] = {
                                animal: request.animal,
                                requests: [request],
                            };
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

    const handleClickOnEditStatus = (index: number, status: string) => {
        setEditingIndex(index === editingIndex ? null : index);
        if (index !== editingIndex) {
            setSelectedStatus(status);
        }
    };

    const handleClickOnSaveNewStatus = () => {
        console.log(selectedStatus);
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
                            <a href="/animaux/oscar-1" className="link">
                                {animalGroup.animal.name}
                            </a>
                        </h2>
                    </div>
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
                            {animalGroup.requests.map((request, index) => (
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
                                        <a href={`mailto:{dupont@gmail.com}`} className="link">
                                            dupont@gmail.com
                                        </a>
                                    </td>
                                    <td>{request.formattedDate}</td>
                                    <td>
                                        {editingIndex === index ? (
                                            <Form.Select
                                                name="status"
                                                value={selectedStatus}
                                                onChange={(e) => setSelectedStatus(e.target.value)}
                                            >
                                                <option value="En attente">En attente</option>
                                                <option value="Acceptée">Acceptée</option>
                                                <option value="Refusée">Refusée</option>
                                            </Form.Select>
                                        ) : (
                                            <span>{request.status}</span>
                                        )}
                                    </td>
                                    {editingIndex === index ? (
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn--save-status"
                                                onClick={handleClickOnSaveNewStatus}
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
                                                    handleClickOnEditStatus(index, request.status)
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
