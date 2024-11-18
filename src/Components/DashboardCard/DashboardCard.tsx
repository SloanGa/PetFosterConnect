import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { IAnimal } from "../../Interfaces/IAnimal.ts";
import Icon from "../../Components/Icon/Icon";
import { Button } from "react-bootstrap";
import "./DashboardCard.scss";
import type IRequest from "../../Interfaces/IRequest.ts";

interface DashboardCardProps {
	path: string;
	src: string;
	alt: string;
	name: string;
	animal: IAnimal;
	request: IRequest;
	onShowDeleteModal: (animal: IAnimal) => void;

	onShowGestionModal: (animal: IAnimal) => void;
	onShowDeleteModal: (animal: IAnimal) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
	src,
	alt,
	name,
	path,
	onShowDeleteModal,
	onShowGestionModal,
	animal,
	onShowGestionModal,
	onShowDeleteModal,
}: DashboardCardProps) => {
	const [countPendingRequests, setCountPendingRequests] = useState(0);

	useEffect(() => {
		const pendingRequests = animal.requests?.filter(
			(request) => request.status === "En attente",
		);
		pendingRequests && setCountPendingRequests(pendingRequests.length);
	});

	return (
		<>
			<article className="card">
				<Link to={path} aria-label="Voir la page de cet animal">
					<div className="card__img__container">
						<img
							src={src}
							className="card__img card-img-top"
							alt={alt}
							loading="lazy"
						/>

						<div
							className={
								animal.availability
									? "card__img__overlay--inactive"
									: "card__img__overlay--active"
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
							`Demande en cours :  ${countPendingRequests}`
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
