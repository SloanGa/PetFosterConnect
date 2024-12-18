import "./LeftNavBar.scss";
import NavigationLink from "../Links/NavLink.tsx";

const LeftNavBar = () => {
	const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
	return (
		<aside className="dashboard__menu">
			<nav className="left__nav">
				<ul className="left__nav__list">
					<li className="left__nav__list__item">
						<NavigationLink
							to="/tableau-de-bord"
							className="left__nav__list__link"
							title="Page gestion des animaux"
							text="Gestion des animaux"
						/>
					</li>
					<li>
						<NavigationLink
							to="/tableau-de-bord/demandes"
							className="left__nav__list__link"
							title="Page liste des demandes"
							text="Listes des demandes"
						/>
					</li>
					<li>
						<NavigationLink
							to={`/tableau-de-bord/profil-association/${storedUser.association.slug}`}
							className="left__nav__list__link"
							title="Page profil association"
							text="Votre profil"
						/>
					</li>
				</ul>
			</nav>
		</aside>
	);
};

export default LeftNavBar;
