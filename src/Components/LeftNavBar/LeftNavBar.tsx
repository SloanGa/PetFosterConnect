import "./LeftNavBar.scss";
import AppLink from "../AppLink/AppLink.tsx";

const LeftNavBar = () => {
	return (
		<div>
			<nav className="left__nav">
				<ul className="left__nav__list">
					<li className="left__nav__list__item">
						<AppLink
							to="/gestion-des-animaux"
							className="left__nav__list__link"
							title="Page gestion des animaux"
							text="Gestion des animaux"
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
