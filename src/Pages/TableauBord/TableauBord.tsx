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
	console.log(isAssociationConnected);

	useEffect(() => {
		const storedUser = localStorage.getItem("user");

		if (!storedUser || !(storedUser.role === "association")) {
			return <Navigate to="/connexion" />;
		}
	}, []);
	// if (!isAssociationConnected) {
	// 	return <Navigate to="/connexion" />;
	// }
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
					<h1 className="main__content__h1">
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

// const TableauBord = () => {
// Récupération des données utilisateur

// 	const { isAuth, userData } = useAuth();
// 	const isAssociationconnected = isAuth && !!userData?.association;

// 	const [showGestionModal, setShowGestionModal] = useState(false);
// 	const [showDeleteModal, setShowDeleteModal] = useState(false);

// 	// state qui permet de gérer si on a une modale edit ou créer un animal

// 	const [associationAnimals, setAssociationAnimals] = useState<IAnimal[]>([]);
// 	const [isLoading, setIsLoading] = useState(true);
// 	const [error, setError] = useState<string | null>(null);

// 	// states qui permettent de gérer quel animal est à éditer ou supprimer

// 	const [animalToEdit, setAnimalToEdit] = useState<IAnimal | null>(null);
// 	const [animalToDelete, setAnimalToDelete] = useState<IAnimal | null>(null);

// 	// state de gestion du toast de message erreur ou succès formulaire

// 	const [toastMessage, setToastMessage] = useState("");
// 	const [showToast, setShowToast] = useState(false);

// 	const toggleToast = useCallback((message) => { */}
// 		setToastMessage(message);
// 		setShowToast(true);
// 	}, []);

// 	// handler de la modale de gestion
// 	const handleShowGestionModal = useCallback((animal?: IAnimal) => {
// 		setShowGestionModal(true);
// 		setAnimalToEdit(animal || null);
// 		setToastMessage("");
// 		setShowToast(false);
// 	}, []);

// 	const handleCloseGestionModal = useCallback(() => {
// 		setShowGestionModal(false);
// 		setToastMessage("");
// 	}, []);

// 	const baseURL = import.meta.env.VITE_API_URL;

// 	// L'event listener à la soumission du formulaire éditer

// 	const handleSubmitEdit = useCallback(
// 		async (values) => {
// 			const formData = new FormData();

// 			// On construit FormData avec les valeurs du formulaire
// 			for (const key in values) {
// 				if (Object.hasOwnProperty.call(values, key)) {
// 					const value = values[key];
// 					if (value !== undefined && value !== null && value !== "") {
// 						formData.append(key, value);
// 					}
// 				}
// 			}

// 			let updatedAnimal;
// 			try {
// 				const token = localStorage.getItem("auth_token");
// 				const response = await fetch(
// 					`${baseURL}/dashboard/association/animals/${animalToEdit.id}`,
// 					{
// 						method: "PATCH",
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 						body: formData,
// 					},
// 				);

// 				if (response.ok) {
// 					updatedAnimal = await response.json(); // on récupère updatedAnimal ici

// 					toggleToast("Animal édité avec succès");

// 					setAssociationAnimals((prevAnimals) =>
// 						prevAnimals.map((animal) =>
// 							animal.id === updatedAnimal.id ? updatedAnimal : animal,
// 						),
// 					);

// 					setTimeout(() => {
// 						handleCloseGestionModal();
// 					}, 1000);
// 				} else {
// 					updatedAnimal = await response.json();
// 					toggleToast(updatedAnimal.error || "Erreur lors de la mise à jour");
// 				}
// 			} catch (error) {
// 				console.error("Erreur:", error);
// 			}
// 		},
// 		[handleCloseGestionModal, animalToEdit, toggleToast],
// 	);

// 	// L'eventListener à la soumission du formulaire ajouter un animal

// 	const handleSubmitAdd = useCallback(
// 		async (values) => {
// 			const formData = new FormData();

// 			for (const key in values) {
// 				if (Object.hasOwnProperty.call(values, key)) {
// 					const value = values[key];
// 					if (value !== undefined && value !== null && value !== "") {
// 						formData.append(key, value);
// 					}
// 				}
// 			}
// 			let createdAnimal;
// 			try {
// 				const token = localStorage.getItem("auth_token");
// 				const response = await fetch(
// 					// En attendant l'authentification, on passe pour le test en dur l'id de l'association.
// 					`${baseURL}/dashboard/association/animals/`,
// 					{
// 						method: "POST",
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 						body: formData,
// 					},
// 				);

// 				if (response.ok) {
// 					createdAnimal = await response.json();

// 					toggleToast("Animal ajouté avec succès");
// 					setTimeout(() => {
// 						handleCloseGestionModal();
// 					}, 1000);
// 					setAssociationAnimals((prevAnimals) => [
// 						...prevAnimals,
// 						createdAnimal,
// 					]);

// 					// TODO ajouter une notification de succès si nécessaire
// 				} else {
// 					createdAnimal = await response.json();
// 					toggleToast(createdAnimal.error || "Erreur lors de la création");

// 					setTimeout(() => {
// 						handleCloseGestionModal();
// 					}, 1000);
// 				}
// 			} catch (error) {
// 				console.error("Erreur:", error);
// 			}
// 		},
// 		[handleCloseGestionModal, toggleToast],
// 	);

// 	// Gestion de la modale confirmation de suppression

// 	const handleShowDeleteModal = useCallback((animal: IAnimal) => {
// 		setShowDeleteModal(true);
// 		setAnimalToDelete(animal);
// 		setToastMessage("");
// 		setShowToast(false);
// 	}, []);

// 	const handleCloseDeleteModal = useCallback(() => {
// 		setShowDeleteModal(false);
// 		setAnimalToDelete(null);
// 	}, []);

// 	const deleteAnimal = useCallback(async () => {
// 		try {
// 			const token = localStorage.getItem("auth_token");
// 			const response = await fetch(
// 				`${baseURL}/dashboard/association/animals/${animalToDelete.id}`,
// 				{
// 					method: "DELETE",
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				},
// 			);

// 			if (response.ok) {
// 				toggleToast("Animal supprimé");
// 				setAssociationAnimals((prevAnimals) =>
// 					prevAnimals.filter((animal) => animal.id !== animalToDelete.id),
// 				);

// 				timer = setTimeout(() => {
// 					handleCloseDeleteModal();
// 				}, 1000);
// 			} else {
// 				toggleToast("Erreur lors de la suppression");
// 			}
// 		} catch (error) {
// 			console.error("Erreur:", error);
// 		}

// 		return () => {
// 			if (timer) clearTimeout(timer);
// 		};
// 	}, [animalToDelete, handleCloseDeleteModal, toggleToast]);

// 	// Gestion du fetch des animaux de l'association

// 	useEffect(() => {
// 		const fetchAnimals = async () => {
// 			try {
// 				const token = localStorage.getItem("auth_token");
// 				console.log(token);

// 				const response = await fetch(
// 					`${import.meta.env.VITE_API_URL}/dashboard/association/animals`,
// 					{
// 						headers: {
// 							Authorization: `Bearer ${token}`,
// 						},
// 					},
// 				);

// 				if (!response.ok) {
// 					return setError(
// 						"Une erreur est survenue, veuillez rafraîchir la page.",
// 					);
// 				}
// 				const data = await response.json();
// 				setAssociationAnimals(data);
// 			} catch (error) {
// 				setError("Une erreur est survenue, veuillez rafraîchir la page.");
// 				console.error("Erreur lors de la récupération des données:", error);
// 			} finally {
// 				setIsLoading(false);
// 			}
// 		};

// 		fetchAnimals();
// 	}, []);

// 	return (
// 		<>
// 			<Helmet>
// 				<title>Tableau de bord | PetFoster Connect</title>
// 				<meta
// 					name="description"
// 					content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
// 				/>
// 			</Helmet>
// 			<Header />
// 			<div className="content">
// 				<LeftNavBar />
// 				<main className="main__content">
// 					<h1 className="main__content__h1">
// 						Dashboard de {userData ? userData.association.name : "XXX"}
// 					</h1>

// 					<div className="main__content__add-animal">
// 						Ajouter un animal{" "}
// 						<Icon
// 							ariaLabel={"Ajouter un animal"}
// 							src={"/src/assets/icons/plus.svg"}
// 							alt={"icône Ajout"}
// 							onClick={() => {
// 								handleShowGestionModal();
// 							}}
// 						/>
// 					</div>

// 					<div className="main__content__cards__container">
// 						<div className="row gx-8 gy-3">
// 							{isLoading ? (
// 								<Loading />
// 							) : (
// 								associationAnimals.map((animal) => (
// 									<div
// 										className="main__content__cards__container__card col-12 col-sm-6 col-md-4"
// 										key={animal.id}
// 									>
// 										<DashboardCard
// 											onShowDeleteModal={handleShowDeleteModal}
// 											onShowGestionModal={handleShowGestionModal}
// 											path={""}
// 											src={`${baseURL}${animal.url_image}`}
// 											alt={animal.name}
// 											name={animal.name}
// 											animal={animal}
// 										/>
// 									</div>
// 								))
// 							)}
// 						</div>
// 					</div>
// 				</main>
// 			</div>

// 			{/* Modale pour modifier ou créer un animal */}

// 			<GestionModal
// 				handleCloseGestionModal={handleCloseGestionModal}
// 				showGestionModal={showGestionModal}
// 				setShowGestionModal={setShowGestionModal}
// 				handleSubmitEdit={handleSubmitEdit}
// 				handleSubmitAdd={handleSubmitAdd}
// 				animalToEdit={animalToEdit}
// 				showToast={showToast}
// 				toggleToast={toggleToast}
// 				toastMessage={toastMessage}
// 			/>

// 			{/* Modale pour confirmer la suppression d'un animal */}

// 			<Modal
// 				show={showDeleteModal}
// 				onHide={handleCloseDeleteModal}
// 				size="lg"
// 				aria-labelledby="contained-modal-title-vcenter"
// 				centered
// 			>
// 				<Modal.Header closeButton>
// 					<Modal.Title>Confirmation suppression</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>
// 					Voulez-vous vraiment supprimer {animalToDelete && animalToDelete.name}{" "}
// 					?{" "}
// 					<div className="modal__toast d-flex justify-content-center mt-3">
// 						<Toast show={showToast} onClose={toggleToast}>
// 							<Toast.Body>{toastMessage}</Toast.Body>
// 						</Toast>
// 					</div>
// 				</Modal.Body>
// 				<Modal.Footer>
// 					{" "}
// 					<Button className="btn--form" onClick={deleteAnimal}>
// 						Oui
// 					</Button>
// 					<Button className="btn--form" onClick={handleCloseDeleteModal}>
// 						Non
// 					</Button>
// 				</Modal.Footer>
// 			</Modal>

// 			<Footer />
// 		</>
// 	);
// };

export default TableauBord;
