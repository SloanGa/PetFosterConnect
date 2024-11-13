import { Link } from "react-router-dom";

import "./DashboardCard.scss";
import { IAnimal } from "../../Interfaces/IAnimal.ts";
import Icon from "../../Components/Icon/Icon";
import { Button, Modal } from "react-bootstrap";

interface DashboardCardProps {
	path: string;
	src: string;
	alt: string;
	name: string;
	animal: object;

	// On passe à la fonction onShowModal les id qu'elle va pouvoir transmettre à la modale puis transmettre au back à la soumission du formulaire.
	onShowEditModal: (animal: IAnimal) => void;
	onShowGestionModal: (animal: IAnimal) => void;
	onShowDeleteModal: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
	src,
	alt,
	name,
	path,
	onShowEditModal,
	onShowDeleteModal,
	onShowGestionModal,
	animal,
}: DashboardCardProps) => {
	return (
		<>
			<article className="card">
				<Link to={path} aria-label="Voir la page de cet animal">
					<div className="card__img-container">
						<img
							src={src}
							className="card__img card-img-top"
							alt={alt}
							loading="lazy"
						/>

						<div
							className={
								animal.availability
									? "card__img-overlay--inactive"
									: "card__img-overlay--active"
							}
						>
							<span>{animal.family_id ? "En famille" : "Indisponible"}</span>
						</div>
					</div>
				</Link>

				<div className="card-body">
					<h3 className="card__title card-title">{name}</h3>
					<p className="card__text">
						{animal.family ? (
							<Link
								to={`/famille/${animal.family.slug}`}
								className="family-profile-link"
							>
								Voir le profil de la famille {animal.family.name}
							</Link>
						) : (
							`Demande en cours :  ${animal.requests ? animal.requests.length : "0"}`
						)}
					</p>
					<div className="card-buttons">
						<Button
							className="card-buttons__button"
							// Les id sont transmis ici
							onClick={() => {
								onShowGestionModal(animal);
							}}
						>
							Modifier
						</Button>
						<Icon
							ariaLabel={"Supprimer l'animal"}
							src={"/src/assets/icons/trash.svg"}
							alt={"icône Suppression"}
							onClick={() => {
								onShowDeleteModal(animal);
							}}
						/>
					</div>
				</div>
			</article>
		</>
	);
};

export default DashboardCard;
