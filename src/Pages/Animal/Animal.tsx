import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Map from "../../Components/Map/Map";

import "./Animal.scss";

const Animal = () => {
    // const { name-id } = useParams();
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
                        <div id="map">
                            <Map />
                        </div>
                        <div>SPA du 44</div>
                        <div>Les Landes Bigot</div>
                        <div>
                            <span>44340</span>
                            <span>Bouguenais</span>
                        </div>
                        <div>02 49 62 81 02</div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Animal;
