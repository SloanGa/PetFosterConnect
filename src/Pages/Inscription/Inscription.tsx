import './Inscription.scss';
import { Helmet } from 'react-helmet-async';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ModeSwitcher from '../../Components/ModeSwitcher/ModeSwitcher';


const Inscription = () => {

    return (
        <>
        <Helmet>
        <title>
            Inscription | PetFoster Connect
        </title>
        <meta
            name="description"
            content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
        />
    </Helmet>

        <Header />

        <div>

        <h1 className='main__title'>Inscription</h1>
        <ModeSwitcher />
        </div>

        <Footer />
        </>
    );
};

export default Inscription;