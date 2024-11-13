import { Table, Form } from "react-bootstrap";
import "./ManageRequest.scss";
import Icon from "../Icon/Icon";
import { useState } from "react";

const baseURL = import.meta.env.VITE_API_URL;

const ManageRequest = () => {
    const [isEditing, setIsEditing] = useState(false);

    const handleClickOnEditStatus = () => {
        setIsEditing(true);
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
                        <tr>
                            <td>1</td>
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
                            <td>En attente</td>
                            <td className="edit">
                                <Icon
                                    ariaLabel={"Modifier le statut de la demande"}
                                    src={"/src/assets/icons/pen.svg"}
                                    alt={"icône modifier"}
                                    onClick={handleClickOnEditStatus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Dupont</td>
                            <td>dupont@gmail.com</td>
                            <td>01/11/2024</td>
                            <td>En attente</td>
                            <td className="edit">
                                <Icon
                                    ariaLabel={"Modifier le statut de la demande"}
                                    src={"/src/assets/icons/pen.svg"}
                                    alt={"icône modifier"}
                                    onClick={handleClickOnEditStatus}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>Dupont</td>
                            <td>dupont@gmail.com</td>
                            <td>01/11/2024</td>
                            <td>
                                {/* <span>En attente</span> */}
                                <Form.Select name="status">
                                    <option value="En attente">En attente</option>
                                    <option value="Acceptée">Acceptée</option>
                                    <option value="Refusée">Refusée</option>
                                </Form.Select>
                            </td>
                            <td className="edit">
                                <Icon
                                    ariaLabel={"Modifier le statut de la demande"}
                                    src={"/src/assets/icons/pen.svg"}
                                    alt={"icône modifier"}
                                    onClick={handleClickOnEditStatus}
                                />
                                {/* <button type="button" className="btn btn--save-status">
                                    Ok
                                </button> */}
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </section>
        </div>
    );
};
export default ManageRequest;
