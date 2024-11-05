import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
//import Icon from "../Icon/Icon.tsx";

import "./Animal.scss";

const Animal = () => {
    // const { name-id } = useParams();
    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <section>
                        <div className="section__header">
                            <div className="header__identity">
                                <h1 className="main__title">Chacha</h1>
                                <img
                                    src="/src/assets/icons/female.svg"
                                    alt="icône femelle"
                                    className="icon"
                                />
                            </div>
                            {/* <span>Disponible</span> */}
                        </div>
                    </section>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Animal;
