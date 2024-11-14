import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home.tsx";
import Associations from "./Pages/Associations/Associations.tsx";
import Association from "./Pages/Association";
import Animaux from "./Pages/Animaux/Animaux";
import Animal from "./Pages/Animal/Animal.tsx";
import Famille from "./Pages/Famille";
import Connexion from "./Pages/Connexion/Connexion.tsx";
import Inscription from "./Pages/Inscription/Inscription.tsx";
import MentionsLegales from "./Pages/MentionsLegales/MentionsLegales";
import PlanDuSite from "./Pages/PlanDuSite";
import PolitiqueConfidentialite from "./Pages/PolitiqueConfidentialite/PolitiqueConfidentialite";
import Erreur from "./Pages/Erreur/Erreur.tsx";
import TableauBord from "./Pages/TableauBord/TableauBord";
import { AuthProvider } from "./Context/AuthContext.tsx";
import ResetPassword from "./Pages/ResetPassword/ResetPassword.tsx";

const App = () => {
	return (
		<HelmetProvider>
			<AuthProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/associations" element={<Associations />} />
						<Route path="/association/:slug" element={<Association />} />
						<Route path="/animaux" element={<Animaux />} />
						<Route path="/animaux/:slug" element={<Animal />} />
						<Route path="/famille/:slug" element={<Famille />} />
						<Route path="/inscription" element={<Inscription />} />
						<Route path="/connexion" element={<Connexion />} />
						<Route path="/tableau-de-bord/*" element={<TableauBord />} />
						<Route path="/mentions-legales" element={<MentionsLegales />} />
						<Route path="/plan-du-site" element={<PlanDuSite />} />
						<Route
							path="/politique-confidentialite"
							element={<PolitiqueConfidentialite />}
						/>
						<Route
							path="/reinitialisation-mot-de-passe"
							element={<ResetPassword />}
						/>
						{/* Page erreur redirige automatiquement vers /erreur */}
						<Route path="*" element={<Navigate to="/erreur" replace />} />
						<Route path="/erreur" element={<Erreur />} />
					</Routes>
				</BrowserRouter>
			</AuthProvider>
		</HelmetProvider>
	);
};

export default App;
