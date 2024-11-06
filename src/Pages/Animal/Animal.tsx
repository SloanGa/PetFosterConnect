import { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Map from "../../Components/Map/Map";
import AppLink from "../../Components/AppLink/AppLink";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "./Animal.scss";

const Animal = () => {
    // const { name-id } = useParams();
    // Pour la modale de confirmation d'envoi d'une demande
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClickConfirmBtn = async () => {
        handleClose();
    };

    return (
        <>
            <Header />
            <main className="main--animal">
                <div className="container">
                    <section className="section__animal">
                        <div className="section__animal__header">
                            <div className="animal__identity">
                                <h1 className="main__title">Chacha</h1>
                                <img
                                    src="/src/assets/icons/female.svg"
                                    alt="icône femelle"
                                    className="icon"
                                />
                            </div>
                            <div className="animal__availability">Disponible</div>
                        </div>
                        <div className="section__animal__main">
                            <div className="animal__img">
                                <img src="/src/assets/chat1.jpg" alt="Photo de ..." />
                            </div>
                            <div className="animal__infos">
                                <div className="animal__infos__data">
                                    <div className="animal__infos__data__item">
                                        <h2 className="item__title">Type</h2>
                                        <div className="item__value">Chat</div>
                                    </div>
                                    <div className="animal__infos__data__item">
                                        <h2 className="item__title">Genre</h2>
                                        <div className="item__value">Femelle</div>
                                    </div>
                                    <div className="animal__infos__data__item">
                                        <h2 className="item__title">Race</h2>
                                        <div className="item__value">Européen</div>
                                    </div>
                                    <div className="animal__infos__data__item">
                                        <h2 className="item__title">Âge</h2>
                                        <div className="item__value">5 ans</div>
                                    </div>
                                    <div className="animal__infos__data__item">
                                        <h2 className="item__title">Taille</h2>
                                        <div className="item__value">Petit</div>
                                    </div>
                                </div>
                                <p className="animal__description">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                    Consequatur illo aspernatur quis commodi autem alias nobis
                                    reiciendis corrupti, rem quibusdam adipisci quidem minima animi
                                    amet laudantium nihil magni veniam ex!
                                </p>
                            </div>
                        </div>
                    </section>
                    <section className="section__association">
                        <div className="map__container">
                            <Map />
                        </div>
                        <div className="association__infos">
                            <AppLink
                                to={"/association/toto"}
                                className={"btn association__name"}
                                title={"Aller sur la page de l'association"}
                                text={"SPA du 44"}
                            />
                            <div>Les Landes Bigot</div>
                            <div>
                                <span>44340</span>
                                <span> </span>
                                <span>Bouguenais</span>
                            </div>
                            <div>
                                <span>Tel : </span>
                                <a
                                    href="tel:+111111111"
                                    className="association__link"
                                    title="Appeler l'association"
                                    aria-label="Appeler l'association"
                                >
                                    02 49 62 81 02
                                </a>
                            </div>
                            <div>
                                <span>Mail : </span>
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
                            <button className="btn" onClick={handleShow}>
                                Faire une demande d'accueil
                            </button>
                            {/* Si utilisateur non connecté */}
                            {/* <AppLink
                                to={"/inscription/famille"}
                                className={"btn"}
                                title={"S'inscrire pour faire une demande"}
                                text={"Faire une demande d'accueil"}
                            /> */}
                        </div>
                    </section>
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
