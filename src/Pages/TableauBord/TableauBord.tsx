import "./TableauBord.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header.tsx";
import Footer from "../../Components/Footer/Footer.tsx";
import DashboadCard from "../../Components/DashboardCard/DashboardCard.tsx";
import AppLink from "../../Components/AppLink/AppLink.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
// import { Error } from "../../Components/Error/Error.tsx";
import { IAnimal } from "../../Interfaces/IAnimal.ts";
import LeftNavBar from "../../Components/LeftNavBar/LeftNavBar";

const TableauBord = () => {
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
				<div className="main__content">
					<h1 className="main__content__h1">Dashboard de XXX</h1>

					<div className="main__content__cards__container">
						<div className="row">
							<div className="col-12 col-sm-6 col-md-4">
								<DashboadCard
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									associationLocation={`Loire-Atlantique - 44`}
									associationName={"SPA de Loire"}
									animalType={"Chien"}
									gender={"Mâle"}
									age={"11"}
									isHomePage={false}
								/>
							</div>

							<div className="col-12 col-sm-6 col-md-4">
								<DashboadCard
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									associationLocation={`Loire-Atlantique - 44`}
									associationName={"SPA de Loire"}
									animalType={"Chien"}
									gender={"Mâle"}
									age={"11"}
									isHomePage={false}
								/>
							</div>
							<div className="col-12 col-sm-6 col-md-4">
								<DashboadCard
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									associationLocation={`Loire-Atlantique - 44`}
									associationName={"SPA de Loire"}
									animalType={"Chien"}
									gender={"Mâle"}
									age={"11"}
									isHomePage={false}
								/>
							</div>
							<div className="col-12 col-sm-6 col-md-4">
								<DashboadCard
									path={""}
									src={"/src/assets/chien2.jpg"}
									alt={"Toutou2"}
									name={"Toutou2"}
									associationLocation={`Loire-Atlantique - 44`}
									associationName={"SPA de Loire"}
									animalType={"Chien"}
									gender={"Mâle"}
									age={"11"}
									isHomePage={false}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default TableauBord;
