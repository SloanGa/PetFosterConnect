import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Map from "../../Components/Map/Map";
import AppLink from "../../Components/Links/AppLink.tsx";
import Loading from "../../Components/Loading/Loading";
import { Error } from "../../Components/Error/Error.tsx";
import { useAuth } from "../../Context/AuthContext.tsx";

import { IAnimal } from "../../Interfaces/IAnimal.ts";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";

import "./Animal.scss";

const baseURL = import.meta.env.VITE_API_URL;

const Animal = () => {
    const { slug } = useParams();
    // Récupérer l'id de l'animal
    const arraySlug = slug!.split("-");
    const animalId = arraySlug![arraySlug!.length - 1];

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // Message d'alerte en cas de succès ou échec de l'envoi d'une demande d'accueil
    const [alert, setAlert] = useState<{ message: string; type: string } | null>(null);

    const [animal, setAnimal] = useState<IAnimal | undefined>(undefined);

    // Pour la modale de confirmation d'envoi d'une demande
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchAnimal = async () => {
            try {
                const response = await fetch(`${baseURL}/animals/${animalId}`);
                if (!response.ok) {
                    return setError("Une erreur est survenue, veuillez rafraîchir la page.");
                }
                const data = await response.json();
                setAnimal(data);
            } catch (err) {
                setError("Une erreur est survenue, veuillez rafraîchir la page.");
                console.error("Erreur lors de la récupération des données:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAnimal();
    }, []);

    const { isAuth, userData } = useAuth();
    const isFamilyConnected = isAuth && !!userData?.family; // Pour convertir userData.family en booléen

    const handleClickConfirmBtn = async () => {
        if (!isFamilyConnected) {
            handleClose();
            return;
        }
        const token = localStorage.getItem("auth_token");
        const requestData = {
            association_id: animal?.association.id,
            animal_id: animal?.id,
        };
        try {
            const response = await fetch(`${baseURL}/requests/family`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
            if (!response.ok) {
                const alert = {
                    message:
                        "Une erreur s'est produite, votre demande n'a pas abouti. Veuillez réessayer.",
                    type: "danger",
                };
                setAlert(alert);
            } else if (response.ok) {
                const alert = {
                    message:
                        "Demande envoyée ! L'association vous recontactera. Vous pouvez voir vos demandes sur votre profil.",
                    type: "success",
                };
                setAlert(alert);
            }
        } catch (error) {
            const alert = {
                message:
                    "Une erreur s'est produite, votre demande n'a pas abouti. Veuillez réessayer.",
                type: "danger",
            };
            setAlert(alert);
        } finally {
            handleClose();
        }
    };

    return (
        <>
            <Helmet>
                <title> {animal ? `${animal.name} | ` : ""}PetFoster Connect</title>
                <meta
                    name="description"
                    content={
                        animal
                            ? `Aidez l'association ${animal.association?.name} en devenant la famille d'accueil de ${animal.name} en attendant son adoption définitive.`
                            : "PetFoster Connect - Devenez une famille d'accueil pour des animaux en attente d'adoption."
                    }
                />
            </Helmet>
            <Header />
            <main className="main--animal">
                <div className="container">
                    {isLoading ? (
                        <Loading />
                    ) : error ? (
                        <Error error={error} />
                    ) : (
                        <>
                            <section className="section__animal">
                                <div className="section__animal__header">
                                    <div className="animal__identity">
                                        <h1 className="main__title">{animal!.name}</h1>
                                        {animal!.gender === "Femelle" ? (
                                            <img
                                                src="/src/assets/icons/female.svg"
                                                alt="icône femelle"
                                                className="icon"
                                            />
                                        ) : (
                                            <img
                                                src="/src/assets/icons/male.svg"
                                                alt="icône male"
                                                className="icon"
                                            />
                                        )}
                                    </div>
                                    <div className="animal__availability">
                                        {animal!.availability ? "Disponible" : "Indisponible"}
                                    </div>
                                </div>
                                <div className="section__animal__main">
                                    <div className="animal__img">
                                        <img
                                            src={`${baseURL}${animal!.url_image}`}
                                            alt={`Photo de ${animal!.name}`}
                                        />
                                    </div>
                                    <div className="animal__infos">
                                        <div className="animal__infos__data">
                                            <div className="animal__infos__data__item">
                                                <h2 className="item__title">Type</h2>
                                                <div className="item__value">{animal!.species}</div>
                                            </div>
                                            <div className="animal__infos__data__item">
                                                <h2 className="item__title">Genre</h2>
                                                <div className="item__value">{animal!.gender}</div>
                                            </div>
                                            <div className="animal__infos__data__item">
                                                <h2 className="item__title">Race</h2>
                                                <div className="item__value">
                                                    {animal!.race ? animal!.race : "N/A"}
                                                </div>
                                            </div>
                                            <div className="animal__infos__data__item">
                                                <h2 className="item__title">Âge</h2>
                                                <div className="item__value">{`${animal!.age} ${animal!.age > 1 ? "ans" : "an"}`}</div>
                                            </div>
                                            <div className="animal__infos__data__item">
                                                <h2 className="item__title">Taille</h2>
                                                <div className="item__value">{animal!.size}</div>
                                            </div>
                                        </div>
                                        <p className="animal__description">{animal!.description}</p>
                                    </div>
                                </div>
                            </section>
                            <section className="section__association">
                                <div className="map__container">
                                    <Map
                                        longitude={animal!.association.longitude}
                                        latitude={animal!.association.latitude}
                                    />
                                </div>
                                <div className="association__infos">
                                    <AppLink
                                        to={`/association/${animal!.association.slug}`}
                                        className={"association__name association__link"}
                                        title={"Aller sur la page de l'association"}
                                        text={animal!.association.name}
                                    />
                                    <div>{animal!.association.address}</div>
                                    <div>
                                        <span>{animal!.association.zip_code}</span>
                                        <span> </span>
                                        <span>{animal!.association.city}</span>
                                    </div>
                                    <div>
                                        <span>Tel : </span>
                                        <a
                                            href={`tel:${animal!.association.phone_number}`}
                                            className="association__link"
                                            title="Appeler l'association"
                                            aria-label="Appeler l'association"
                                        >
                                            {animal!.association.phone_number}
                                        </a>
                                    </div>
                                    <div>
                                        <span>Mail : </span>
                                        <a
                                            href={`mailto:${animal!.association.email_association}`}
                                            className="association__link"
                                            title="Envoyer un mail à l'association"
                                            aria-label="Envoyer un mail à l'association"
                                        >
                                            {animal!.association.email_association}
                                        </a>
                                    </div>
                                    {!animal!.availability ? (
                                           // Si l'animal est indisponible
                                        <button className="btn btn--indisponible" disabled>
                                            Animal indisponible
                                        </button>
                                    ) : userData?.association ? null : isFamilyConnected ? (
                                        // Si l'animal est disponible et que l'utilisateur est une famille connectée
                                        <button className="btn btn--demande" onClick={handleShow}>
                                            Faire une demande d'accueil
                                        </button>
                                    ) : (
                                        // Si l'animal est disponible et que l'utilisateur n'est pas connecté en tant que famille
                                        <AppLink
                                            to={"/inscription"}
                                            className={
                                                "association__link association__link--underline"
                                            }
                                            title={"S'inscrire pour faire une demande d'accueil"}
                                            text={"S'inscrire pour faire une demande d'accueil"}
                                        />
                                    )}
                                </div>
                                {alert && (
                                    <Alert variant={alert.type} dismissible className="alert">
                                        {alert.message}
                                    </Alert>
                                )}
                            </section>
                        </>
                    )}
                </div>
            </main>

            <Footer />

            <Modal show={show} onHide={handleClose} centered className={"modal__confirm"}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmez-vous cette demande ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Si vous confirmez votre demande, celle-ci sera envoyée à l'association qui vous
                    contactera directement.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} className={"btn--cancel"}>
                        Annuler
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleClickConfirmBtn}
                        className={"btn--confirm"}
                    >
                        Envoyer ma demande
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Animal;
