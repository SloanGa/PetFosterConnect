import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Map from "../../Components/Map/Map";
import AppLink from "../../Components/AppLink/AppLink";
import Loading from "../../Components/Loading/Loading";
import { Error } from "../../Components/Error/Error.tsx";

import { IAnimal } from "../../Interfaces/IAnimal.ts";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./Animal.scss";

const baseURL = import.meta.env.VITE_API_URL;

const Animal = () => {
    const slug = useParams();
    const animalId = slug["name-id"]?.split("-")[1];

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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

    const handleClickConfirmBtn = async () => {
        handleClose();
    };

    return (
        <>
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
                                    <Map />
                                </div>
                                <div className="association__infos">
                                    <AppLink
                                        // TODO : slug de l'association
                                        to={"/association/toto"}
                                        className={"btn association__name"}
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
                                        {/* TODO : ajouter mail asso sur table asso */}
                                        <a
                                            href="mailto:contact@SPA.com"
                                            className="association__link"
                                            title="Envoyer un mail à l'association"
                                            aria-label="Envoyer un mail à l'association"
                                        >
                                            contact@SPA.com
                                        </a>
                                    </div>
                                    {/* Si utilisateur connecté */}
                                    <button className="btn btn--demande" onClick={handleShow}>
                                        Faire une demande d'accueil
                                    </button>
                                    {/* Si utilisateur non connecté */}
                                    {/* <AppLink
                                to={"/inscription/famille"}
                                className={"btn btn--demande"}
                                title={"S'inscrire pour faire une demande"}
                                text={"Faire une demande d'accueil"}
                            /> */}
                                </div>
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
