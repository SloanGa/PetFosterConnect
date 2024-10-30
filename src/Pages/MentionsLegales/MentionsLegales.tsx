import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import './MentionsLegales.scss';

const PolitiqueConfidentialite = () => {
    return (
        <>
            <Helmet>
                <title>Mentions légales | PetFoster Connect</title>
                <meta
                    name="description"
                    content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />
            </Helmet>
            <Header />
            <main>
                <h1 className="main__title">Mentions légales</h1>
                <p className="main__paragraph">
                Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site PetFoster Connect l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
                </p>
          
            <span className="main__subtitle"> Edition du site</span>

            <p className="main__paragraph">
                Le présent site, accessible à l’URL https://www.petfosterconnect.com est édité par :</p>

            <p className="main__paragraph">
            L’association PetFoster Connect, enregistrée auprès de la préfecture/sous-préfecture de 75 - Préfecture Paris sous le numéro W123456789, ayant son siège situé à 1 rue des Echevins 75000 PARIS, représentée par Sloan GAUTHIER dûment habilité(e).
            </p>        

            <span className="main__subtitle">Hébergement</span>  

            <p className="main__paragraph">
                Le Site est hébergé par la société OVH, situé 2 rue Kellermann - BP 80157 - 59053 Roubaix Cedex 1, (contact téléphonique ou email : 1007).
            </p>

            </main>

            <span className="main__subtitle">Directeur de publication</span>
            <p className="main__paragraph">
            Le Directeur de la publication du Site est Sloan Gauthier.
            </p>

            <span className="main__subtitle">Nous contacter</span>

            <ul className="main__list">
                <li>Par téléphone : </li>
                <li>Par email : contact@petfosterconnect. com</li>
                <li>Par courrier : 1 rue des Echevins 75000 Paris</li>
            </ul>

            <span className="main__subtitle">Données personnelles</span>

            <p className="main__paragraph">
                Le traitement de vos données à caractère personnel est régi par notre Charte du respect de la vie privée, disponible depuis la section "Charte de Protection des Données Personnelles", conformément au Règlement Général sur la Protection des Données 2016/679 du 27 avril 2016 («RGPD»).
            </p>

            <Footer />
        </>
    );
};

export default PolitiqueConfidentialite;