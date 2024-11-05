import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home.tsx";
import Associations from "./Pages/Associations/Associations.tsx";
import Association from "./Pages/Association";
import Animaux from "./Pages/Animaux/Animaux";
import Animal from "./Pages/Animal";
import Famille from "./Pages/Famille";
import Connexion from "./Pages/Connexion";
import InscriptionAssociation from "./Pages/InscriptionAssociation";
import InscriptionFamille from "./Pages/InscriptionFamille";
import MentionsLegales from "./Pages/MentionsLegales/MentionsLegales";
import PlanDuSite from "./Pages/PlanDuSite";
import PolitiqueConfidentialite from "./Pages/PolitiqueConfidentialite/PolitiqueConfidentialite";
import Erreur from "./Pages/Erreur";
import TableauBord from "./Pages/TableauBord";
// import { AnimalProvider } from "./Context/AnimalContext.tsx";

const App = () => {
    return (
        <HelmetProvider>
            {/*<AnimalProvider>*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/associations" element={<Associations />} />
                    <Route path="/association/:name" element={<Association />} />
                    <Route path="/animaux" element={<Animaux />} />
                    <Route path="/animaux/:name-id" element={<Animal />} />
                    <Route path="/famille/:name-id" element={<Famille />} />
                    <Route path="/inscription/famille" element={<InscriptionFamille />} />
                    <Route path="/inscription/association" element={<InscriptionAssociation />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="tableau-de-bord" element={<TableauBord />} />
                    <Route path="/mentions-legales" element={<MentionsLegales />} />
                    <Route path="/plan-du-site" element={<PlanDuSite />} />
                    <Route
                        path="/politique-confidentialite"
                        element={<PolitiqueConfidentialite />}
                    />

                    {/* Page erreur redirige automatiquement vers /erreur */}
                    <Route path="*" element={<Navigate to="/erreur" replace />} />
                    <Route path="/erreur" element={<Erreur />} />
                </Routes>
            </BrowserRouter>
            {/*</AnimalProvider>*/}
        </HelmetProvider>
    );
};

export default App;
