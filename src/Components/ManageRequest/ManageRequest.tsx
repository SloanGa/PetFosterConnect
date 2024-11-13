import "./ManageRequest.scss";

const baseURL = import.meta.env.VITE_API_URL;

const ManageRequest = () => {
    return (
        <div className="manage-request">
            <section className="request">
                <div className="request__header">
                    <img src={`${baseURL}/images/animals/Oscar-1.webp`} alt="" loading="lazy" />
                    <h2>Oscar</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className="min">Demande n°</th>
                            <th>Famille</th>
                            <th>Email</th>
                            <th>Date de la demande</th>
                            <th>Status de la demande</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="min">1</td>
                            <td>Dupont</td>
                            <td>dupont@gmail.com</td>
                            <td>01/11/2024</td>
                            <td>En attente</td>
                        </tr>
                        <tr>
                            <td className="min">1</td>
                            <td>Dupont</td>
                            <td>dupont@gmail.com</td>
                            <td>01/11/2024</td>
                            <td>En attente</td>
                        </tr>
                        <tr>
                            <td className="min">1</td>
                            <td>Dupont</td>
                            <td>dupont@gmail.com</td>
                            <td>01/11/2024</td>
                            <td>En attente</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};
export default ManageRequest;
