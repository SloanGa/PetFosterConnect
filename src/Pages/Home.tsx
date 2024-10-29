import { Helmet } from "react-helmet-async";
import Header from "../Components/Header/Header";
import Footer from "../Components/Header/Footer/Footer";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Page d'accueil | PetFoster Connect</title>
                <meta
                    name="description"
                    content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />
            </Helmet>

            <Header />
            <Footer />
        </>
    );
};

export default Home;
