import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import "./Animal.scss";

const Animal = () => {
    // const { name-id } = useParams();
    return (
        <>
            <Header />
            <main className="main--animal">
                <div className="container">
                    <section>
                        <div className="section__header">
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
                        <div className="animal__img">
                            <img src="/src/assets/chat1.jpg" alt="Photo de ..." />
                        </div>
                        <div className="animal__infos">
                            <div className="animal__info">
                                <h2 className="animal__info__title">Type</h2>
                                <div className="animal__info__value">Chat</div>
                            </div>
                            <div className="animal__info">
                                <h2 className="animal__info__title">Genre</h2>
                                <div className="animal__info__value">Femelle</div>
                            </div>
                            <div className="animal__info">
                                <h2 className="animal__info__title">Race</h2>
                                <div className="animal__info__value">Européen</div>
                            </div>
                            <div className="animal__info">
                                <h2 className="animal__info__title">Âge</h2>
                                <div className="animal__info__value">5 ans</div>
                            </div>
                            <div className="animal__info">
                                <h2 className="animal__info__title">Taille</h2>
                                <div className="animal__info__value">Chat</div>
                            </div>
                        </div>
                        <p className="animal__description">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur
                            illo aspernatur quis commodi autem alias nobis reiciendis corrupti, rem
                            quibusdam adipisci quidem minima animi amet laudantium nihil magni
                            veniam ex!
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Animal;
