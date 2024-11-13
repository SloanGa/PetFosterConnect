import "./Profil.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
import { Error } from "../../Components/Error/Error.tsx";
import NavLink from "../../Components/Links/NavLink.tsx";
import Map from "../../Components/Map/Map.tsx";
import Footer from "../../Components/Footer/Footer.tsx";
import { IAssociation } from "../../Interfaces/IAssociation.ts";
import { IFamily } from "../../Interfaces/IFamily.ts";
import { useEffect, useState } from "react";
import GestionEditEntityModal from "../../Components/GestionModal/GestionEditEntityModal.tsx";
import GestionModalDeleteEntity from "../../Components/GestionModal/GestionModalDeleteEntity.tsx";
import Alert from "react-bootstrap/Alert";
import { IUser } from "../../Interfaces/IUser.ts";
import { Table } from "react-bootstrap";
import Icon from "../../Components/Icon/Icon.tsx";

interface ProfilProps {
    entity: IAssociation | IFamily | null;
    baseURL: string;
    isLoading: boolean;
    error: string | null;
    isLegitimate: boolean;
    setEntity: React.Dispatch<React.SetStateAction<IAssociation | IFamily | null>>;
    userHasEntity: IUser | null;
}


const Profil = ({ entity, baseURL, isLoading, error, isLegitimate, setEntity, userHasEntity }: ProfilProps) => {
    // Pour la modale de confirmation d'envoi d'une demande
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    return (
        <>
            <Helmet>
                <title>
                    {entity ? `${entity.name} | ` : ""}PetFoster Connect
                </title>
                <meta
                    name="description"
                    content={
                        entity
                            ? `Aidez l'association ${entity.name} en devenant la famille d'accueil d'un de leurs animaux.`
                            : "PetFoster Connect - Devenez une famille d'accueil pour des animaux en attente d'adoption."
                    }
                />
            </Helmet>
            <Header />
            <main className="main--entity">
                <div className="container">
                    {isLoading ? (
                        <Loading />
                    ) : error ? (
                        <Error error={error} />
                    ) : (
                        <>
                            <section className="section__entity">
                                <div className="section__entity__header">
                                    <div className="entity__identity">
                                        <h1 className="main__title">{entity!.name}</h1>
                                        <img className="icon icon--title"
                                             src="/src/assets/icons/id-card.svg" alt="" />
                                    </div>
                                </div>
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
                                                    <img className="icon"
                                                         src="/src/assets/icons/heart-handshake.svg" alt="" />
                                                    <p className="item__title">{entity!.name}</p>
                                                </div>

                                                <div className="infos__container">
                                                    <img className="icon"
                                                         src="/src/assets/icons/phone.svg" alt="" />

                                                    <p className="item__title">{entity!.phone_number}</p>
                                                </div>

                                                <div className="infos__container">
                                                    <img className="icon"
                                                         src="/src/assets/icons/house.svg" alt="" />
                                                    <p className="item__title">
                                                        {entity!.address} - {entity?.zip_code} {entity?.city}
                                                    </p>
                                                </div>

                                                <div className="infos__container">
                                                    <img className="icon"
                                                         src="/src/assets/icons/mail.svg" alt="" />
                                                    {entity && "email_association" in entity ? (<a
                                                        href={`mailto:${entity!.email_association}`}
                                                        className="item__title"
                                                    >
                                                        {entity!.email_association}
                                                    </a>) : <a
                                                        href={`mailto:${userHasEntity?.email}`}
                                                        className="item__title"
                                                    > {userHasEntity?.email} </a>}
                                                </div>

                                            </div>
                                            {entity && "email_association" in entity ? <NavLink
                                                to={`/animaux?association_id=${entity?.id}`}
                                                title={`Page des animaux de l'association ${entity!.name}`}
                                                text="Voir les animaux"
                                                className="btn btn--entity"
                                            >
                                                Voir les animaux
                                            </NavLink> : null}

                                        </div>
                                    </div>
                                </div>

                                <p className="description">{entity!.description}</p>
                                {isLegitimate ?
                                    <div className="btn__container">
                                        <button className=" btn btn--profil" onClick={handleShowEdit}>Modifier le profil
                                        </button>
                                        <button className=" btn btn--profil"
                                                onClick={handleShowDelete}>Supprimer le
                                            profil
                                        </button>
                                    </div> : null}
                            </section>
                            <section className="section__bottom">
                                {/* Vérifie si c'est une association ou une famille à afficher */}
                                {entity && "email_association" in entity ? (<>
                                        <div className="map__container map__container--entity">
                                            <Map
                                                longitude={entity!.longitude}
                                                latitude={entity!.latitude}
                                            />

                                        </div>

                                    </>
                                ) : (
                                    <div className="request">
                                        <h2 className="request__title">Demande en cours </h2>
                                        <Table striped bordered responsive className={"text-center"}>
                                            <thead>
                                            <tr>
                                                <th>N°</th>
                                                <th>Nom animal</th>
                                                <th>Email association</th>
                                                <th>Date de la demande</th>
                                                <th>Statut de la demande</th>
                                                {isLegitimate ? <th>Supprimer</th> : null}

                                            </tr>
                                            </thead>
                                            <tbody>
                                            {[1, 2, 3].map((request, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>
                                                        <a href="/animaux/oscar-1" className="link">
                                                            Oscar
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <a href="mailto:contact@animalrescue.fr" className="link">
                                                            contact@animalrescue.fr
                                                        </a>
                                                    </td>
                                                    <td>01/11/2024</td>
                                                    <td>
                                                        <span>En attente</span>
                                                    </td>
                                                    <td className="delete">
                                                        {isLegitimate ? (
                                                            <Icon
                                                                ariaLabel={"Supprimer la demande"}
                                                                src={"/src/assets/icons/trash.svg"}
                                                                alt={"icône supprimer"}
                                                                onClick={() => console.log("test")}
                                                            />
                                                        ) : null}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </Table>
                                    </div>
                                )}

                            </section>

                        </>
                    )}

                </div>
            </main>

            <Footer />

            <GestionEditEntityModal show={showEdit} handleClose={handleCloseEdit} entityToEdit={entity}
                                    setEntity={setEntity} userToEdit={userHasEntity} />

            <GestionModalDeleteEntity handleCloseDelete={handleCloseDelete} showDelete={showDelete}
                                      entityToDelete={entity} />
        </>
    );
};

export default Profil;