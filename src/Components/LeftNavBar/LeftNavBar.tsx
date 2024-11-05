import "./LeftNavBar.scss";
import AppLink from "../AppLink/AppLink.tsx";

const LeftNavBar = () => {
	return (
		<div>
			<nav className="left__nav">
				<ul className="left__nav__list">
					<li className="left__nav__list__item">
						<AppLink
							to="/tableau-de-bord"
							className="left__nav__list__link"
							title="Page liste des animaux"
							text="Liste des animaux"
						/>
					</li>
					<li>
						<AppLink
							to="/ajouter-un-animal"
							className="left__nav__list__link"
							title="Page ajouter un animal"
							text="Ajouter un animal"
						/>
					</li>
					<li>
						<AppLink
							to="/liste-des-demandes"
							className="left__nav__list__link"
							title="Page liste des demandes"
							text="Listes des demandes"
						/>
					</li>
					<li>
						<AppLink
							to="/profil-association"
							className="left__nav__list__link"
							title="Page profil association"
							text="Votre profil"
						/>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default LeftNavBar;
