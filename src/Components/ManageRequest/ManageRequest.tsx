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

    useEffect(async () => {
        try {
            const token = localStorage.getItem("auth_token");
            const response = await fetch(`${baseURL}/dashboard/association/request`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }, []);

    const handleClickOnEditStatus = (index: number) => {
        setEditingIndex(index === editingIndex ? null : index);
    };

    const handleClickOnSaveNewStatus = () => {
        console.log(selectedStatus);
    };

    return (
        <div className="manage-request">
            <section className="request">
                <div className="request__header">
                    <img src={`${baseURL}/images/animals/Oscar-1.webp`} alt="" loading="lazy" />
                    <h2>
                        <a href="/animaux/oscar-1" className="link">
                            Oscar
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
                        {[1, 2, 3].map((request, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    <a href="/famille/dupont-1" className="link">
                                        Dupont
                                    </a>
                                </td>
                                <td>
                                    <a href="mailto:dupont@gmail.com" className="link">
                                        dupont@gmail.com
                                    </a>
                                </td>
                                <td>01/11/2024</td>
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
                                        <span>En attente</span>
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
                                            onClick={() => handleClickOnEditStatus(index)}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </section>
        </div>
    );
};
export default ManageRequest;
