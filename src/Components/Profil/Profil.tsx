import "./Profil.scss";
import Header from "../Header/Header.tsx";
import Footer from "../Footer/Footer.tsx";
import Loading from "../Loading/Loading.tsx";
import { Error } from "../Error/Error.tsx";
import Map from "../Map/Map.tsx";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { IFamily } from "../../Interfaces/IFamily.ts";
import { useState } from "react";
import GestionEditEntityModal from "../GestionModal/GestionEditEntityModal.tsx";
import GestionModalDeleteEntity from "../GestionModal/GestionModalDeleteEntity.tsx";
import { IUser } from "../../Interfaces/IUser.ts";
import { Table } from "react-bootstrap";
import Icon from "../Icon/Icon.tsx";
import IRequest from "../../Interfaces/IRequest.ts";
import GestionModalDeleteRequest from "../GestionModal/GestionModalDeleteRequest.tsx";
import AppLink from "../Links/AppLink.tsx";

interface ProfilProps {
	entity: IAssociation | IFamily | null;
	baseURL: string;
	isLoading: boolean;
	error: string | null;
	isLegitimate: boolean;
	setEntity: React.Dispatch<
		React.SetStateAction<IAssociation | IFamily | null>
	>;
	userHasEntity: IUser | null;
	requestData?: IRequest[] | null;
	selectedRequest?: number;
	setIsDeleteRequest?: React.Dispatch<React.SetStateAction<boolean>>;
	setAssociationData: React.Dispatch<
		React.SetStateAction<IAssociation | null | undefined>
	>;
}

const Profil = ({
	entity,
	baseURL,
	isLoading,
	error,
	isLegitimate,
	setEntity,
	userHasEntity,
	requestData,
	setIsDeleteRequest,
	isDashboard,
	setAssociationData,
}: ProfilProps) => {
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showDeleteProfil, setShowDeleteProfil] = useState(false);
    const handleCloseDeleteProfil = () => setShowDeleteProfil(false);
    const handleShowDeleteProfil = () => setShowDeleteProfil(true);

    const [selectedRequest, setSelectedRequest] = useState<number | null>(null);
    const [showDeleteRequest, setShowDeleteRequest] = useState(false);

    const handleCloseDeleteRequest = () => setShowDeleteRequest(false);
    const handleShowDeleteRequest = (id: number) => {
        setSelectedRequest(id);
        setShowDeleteRequest(true);
    };

    /* Fonction pour convertir la date */
    function formatDate(dateFromDB: string): string {
        const date = new Date(dateFromDB);
        return date.toLocaleDateString("fr-FR");
    }

    /* Fonction pour normaliser le texte (supprimer les accents et remplacer les espaces par des tirets) */
    const normalizeStatus = (status: string) => {
        return status
            .normalize("NFD") // Décompose les caractères accentués
            .replace(/[\u0300-\u036f]/g, "") // Supprime les diacritiques (accents)
            .replace(/\s+/g, "-") // Remplace les espaces par des tirets
            .toLowerCase(); // Convertit en minuscule
    };

    return (
        <>
            {!isDashboard && <Header />}
            <main className="main--entity">
                <div className="container">
                    {isLoading ? (
                        <Loading />
                    ) : error ? (
                        <Error error={error} />
                    ) : (
                        <>
                            <section className="section__entity">
                                {!isDashboard && (
                                    <div className="section__entity__header">
                                        <div className="entity__identity">
                                            <h1 className="main__title">{entity!.name}</h1>
                                            <img
                                                className="icon icon--title"
                                                src="/src/assets/icons/id-card.svg"
                                                alt=""
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="section__entity__main">
                                    <div className="entity__img">
                                        <img
                                            src={`${baseURL}${entity!.url_image}`}
                                            alt={`Photo de ${entity!.name}`}
                                        />
                                    </div>
                                    <div className="entity__infos">
                                        <div className="entity__infos__data">
                                            <div className="entity__infos__data__item">
                                                <div className="infos__container">
                                                    <img
                                                        className="icon"
                                                        src="/src/assets/icons/heart-handshake.svg"
                                                        alt=""
                                                    />
                                                    <p className="item__title" aria-label="Nom">
                                                        {entity!.name}
                                                    </p>
                                                </div>

                                                <div className="infos__container">
                                                    <img
                                                        className="icon"
                                                        src="/src/assets/icons/house.svg"
                                                        alt=""
                                                    />
                                                    <p className="item__title" aria-label="Adresse">
                                                        {entity!.address} - {entity?.zip_code}{" "}
                                                        {entity?.city}
                                                    </p>
                                                </div>

                                                <div className="infos__container">
                                                    <img
                                                        className="icon"
                                                        src="/src/assets/icons/phone.svg"
                                                        alt=""
                                                    />

                                                    <a
                                                        href={`tel:${entity!.phone_number}`}
                                                        className="item__title entity__link"
                                                        title="Appeler"
                                                        aria-label="Numéro de téléphone"
                                                    >
                                                        {entity!.phone_number}
                                                    </a>
                                                </div>

                                                <div className="infos__container">
                                                    <img
                                                        className="icon"
                                                        src="/src/assets/icons/mail.svg"
                                                        alt=""
                                                    />
                                                    {entity && "email_association" in entity ? (
                                                        <a
                                                            href={`mailto:${entity!.email_association}`}
                                                            className="item__title entity__link"
                                                            title="Contacter par email"
                                                        >
                                                            {entity!.email_association}
                                                        </a>
                                                    ) : (
                                                        <a
                                                            href={`mailto:${userHasEntity?.email}`}
                                                            className="item__title entity__link"
                                                            title="Contacter par email"
                                                        >
                                                            {" "}
                                                            {userHasEntity?.email}{" "}
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                            {entity &&
                                            "email_association" in entity &&
                                            !isDashboard ? (
                                                <AppLink
                                                    to={`/animaux?association_id=${entity?.id}`}
                                                    title={`Page des animaux de l'association ${entity!.name}`}
                                                    text="Voir les animaux"
                                                    className="btn btn--entity"
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>

                                <p className="description" aria-label="description">
                                    {entity!.description}
                                </p>

                                {/* Cette condition permet de vérifier si soit on a affaire à une famille (elle est légitime et il n'y a 
								pas d'email asso dans l'entité) soit on a affaire à une asso (ce qui est garantit par le fait que dashboard 
								est vrai - protégé par ProtectedRoute dans app) */}
                                {(isLegitimate && !("email_association" in entity!)) ||
                                isDashboard ? (
                                    <div className="btn__container">
                                        <button
                                            className="btn btn--profil"
                                            onClick={handleShowEdit}
                                        >
                                            Modifier le profil
                                        </button>
                                        <button
                                            className=" btn btn--profil"
                                            onClick={handleShowDeleteProfil}
                                        >
                                            Supprimer le profil
                                        </button>
                                    </div>
                                ) : null}
                            </section>
                            <section className="section__bottom">
                                {/* Vérifie si c'est une association ou une famille à afficher */}
                                {entity && "email_association" in entity ? (
                                    <>
                                        <div className="map__container map__container--entity">
                                            <Map
                                                longitude={entity.longitude}
                                                latitude={entity.latitude}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    isLegitimate && (
                                        <div className="request">
                                            <h2 className="request__title">Demande en cours</h2>
                                            <Table
                                                striped
                                                bordered
                                                responsive
                                                className="text-center"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>Nom animal</th>
                                                        <th>Association</th>
                                                        <th>Email association</th>
                                                        <th>Date de la demande</th>
                                                        <th>Statut de la demande</th>
                                                        {isLegitimate ? <th>Supprimer</th> : null}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {requestData?.map((request) => (
                                                        <tr key={request.id}>
                                                            <td>
                                                                <a
                                                                    href={`/animaux/${request.animal?.slug}`}
                                                                    className="link"
                                                                    title="Consulter la page de l'animal"
                                                                >
                                                                    {request.animal?.name}
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <a
                                                                    href={`/association/${request.association?.slug}`}
                                                                    className="link"
                                                                    title="Consulter la page de l'association"
                                                                >
                                                                    {request.association?.name}
                                                                </a>
                                                            </td>
                                                            <td>
                                                                <a
                                                                    href={`mailto:${request.association?.email_association}`}
                                                                    className="link"
                                                                    title="Envoyer un email à l'association"
                                                                >
                                                                    {
                                                                        request.association
                                                                            ?.email_association
                                                                    }
                                                                </a>
                                                            </td>
                                                            <td>
                                                                {formatDate(request.created_at)}
                                                            </td>
                                                            <td>
                                                                <span
                                                                    className={`status status--${normalizeStatus(request.status)}`}
                                                                >
                                                                    {request.status}
                                                                </span>
                                                            </td>
                                                            <td className="delete">
                                                                {request.status !== "Acceptée" ? (
                                                                    <Icon
                                                                        ariaLabel="Supprimer la demande"
                                                                        src="/src/assets/icons/trash.svg"
                                                                        alt="Supprimer la demande"
                                                                        onClick={() =>
                                                                            handleShowDeleteRequest(
                                                                                request.id
                                                                            )
                                                                        }
                                                                    />
                                                                ) : null}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )
                                )}
                            </section>
                        </>
                    )}
                </div>
            </main>

			{!isDashboard && <Footer />}
			<GestionEditEntityModal
				show={showEdit}
				handleClose={handleCloseEdit}
				entityToEdit={entity}
				setEntity={setEntity}
				userToEdit={userHasEntity}
				setAssociationData={setAssociationData}
			/>
			<GestionModalDeleteEntity
				handleCloseDelete={handleCloseDeleteProfil}
				showDelete={showDeleteProfil}
				entityToDelete={entity}
			/>
			<GestionModalDeleteRequest
				handleCloseDelete={handleCloseDeleteRequest}
				showDelete={showDeleteRequest}
				selectedRequest={selectedRequest!}
				setIsDeleteRequest={setIsDeleteRequest}
			/>
		</>
	);
};

export default Profil;
