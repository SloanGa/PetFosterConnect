import "./TableauBord.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header.tsx";
import Footer from "../../Components/Footer/Footer.tsx";
import { useEffect } from "react";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";
import { useAuth } from "../../Context/AuthContext.tsx";
import { Navigate, Routes, Route } from "react-router-dom";
import ManageAnimal from "../../Components/ManageAnimal/ManageAnimal.tsx";
import ManageRequest from "../../Components/ManageRequest/ManageRequest.tsx";

const TableauBord = () => {
	const { isAuth, userData } = useAuth();
	const isAssociationConnected = isAuth && !!userData?.association;

	useEffect(() => {
		const storedUser = localStorage.getItem("user");

		if (!storedUser || !(storedUser.role === "association")) {
			return <Navigate to="/connexion" />;
		}
	}, []);
	return (
		<>
			<Helmet>
				<title>Tableau de bord | PetFoster Connect</title>
				<meta
					name="description"
					content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
				/>
			</Helmet>

			<Header />
			<div className="content">
				<LeftNavBar />
				<main className="main__content">
					<h1 className="main__title">
						Dashboard de {userData ? userData.association.name : "XXX"}
					</h1>
					<Routes>
						<Route path="/" element={<ManageAnimal />} />
						<Route path="/demandes" element={<ManageRequest />} />
					</Routes>
				</main>
			</div>
			<Footer />
		</>
	);
};

export default TableauBord;
