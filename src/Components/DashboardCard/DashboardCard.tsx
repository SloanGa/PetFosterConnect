import { Link } from "react-router-dom";

import "./DashboardCard.scss";
import { IDepartment } from "../../Interfaces/IDepartment.ts";
import Icon from "../../Components/Icon/Icon";
import { Button, Modal } from "react-bootstrap";

interface DashboardCardProps {
	path: string;
	src: string;
	alt: string;
	name: string;
	animalId: number;
	associationId: number;
	animal: object;
	setAnimalToEdit: React.Dispatch<React.SetStateAction<IAnimal | null>>;

	// On passe à la fonction onShowModal les id qu'elle va pouvoir transmettre à la modale puis transmettre au back à la soumission du formulaire.
	onShowEditModal: (animalId: number, associationId: number) => void;
	onShowDeleteModal: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
	src,
	alt,
	name,
	path,
	animalId,
	associationId,
	onShowEditModal,
	onShowDeleteModal,
	setAnimalToEdit,
	animal,
	setAssociationAnimals,
}: DashboardCardProps) => {
	return (
		<>
			<Link
				to={path}
				className="card__link"
				aria-label="Voir la page de cet animal"
			>
				<article className="card">
					<img
						src={src}
						className="card__img card-img-top"
						alt={alt}
						loading="lazy"
					/>

					<div className="card-body">
						<h3 className="card__title card-title">{name}</h3>
						<p className="card__text">Demande en cours : 2</p>
						<div className="card-buttons">
							<Button
								className="card-buttons__button"
								// Les id sont transmis ici
								onClick={() => {
									onShowEditModal();
									setAnimalToEdit(animal);
								}}
							>
								Modifier
							</Button>
							{/* <button type="button" className="card-buttons__button">
								Modifier
							</button> */}
							<Icon
								ariaLabel={"Supprimer l'animal"}
								src={"/src/assets/icons/trash.svg"}
								alt={"icône Suppression"}
								onClick={() => onShowDeleteModal()}
							/>
						</div>
					</div>
				</article>
			</Link>
		</>
	);
};

export default DashboardCard;
