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
	onShowModal: () => void;
}

const AnimalCard: React.FC<DashboardCardProps> = ({
	src,
	alt,
	name,
	path,
	onShowModal,
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
								// variant="primary"
								className="card-buttons__button"
								onClick={onShowModal}
							>
								Modifier
							</Button>
							{/* <button type="button" className="card-buttons__button">
								Modifier
							</button> */}
							<Icon
								ariaLabel={"Ouvrir le menu de connexion ou inscription"}
								src={"/src/assets/icons/trash.svg"}
								alt={"icône connexion/inscription"}
							/>
						</div>
					</div>
				</article>
			</Link>
		</>
	);
};

export default AnimalCard;
