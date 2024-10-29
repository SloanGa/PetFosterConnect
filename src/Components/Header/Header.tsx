import { Link } from "react-router-dom";
import Icon from "../Icon/Icon.tsx";
import AppLink from "../AppLink/AppLink.tsx";

const Header = () => {
    return (
        <header>
            <div className="header__primary">
                <Link to="/" title="Retour sur la page d'accueil">
                    <img
                        src="/src/assets/logo_name.png"
                        className="header__logo"
                        alt="Logo PetFoster Connect"
                    />
                </Link>

                {/* <!-- icônes burger menu et user pour version mobile --> */}
                <div className="header__primary__icons">
                    <Icon ariaLabel={"Ouvrir le menu de navigation"} src={"/src/assets/icons/burger-icon.svg"}
                          alt={"icône menu"} />
                    <Icon ariaLabel={"Ouvrir le menu de connexion ou inscription"}
                          src={"/src/assets/icons/user-connect.svg"} alt={"icône connexion/inscription"} />
                </div>

                {/* <!-- Liens connexion / inscription pour version desktop --> */}
                <div className="header__primary__links">
                    <nav>
                        <ul className="nav__list">
                            <li>
                                <AppLink to="/connexion" className="nav__list__link" title="Se connecter"
                                         text={"Se connecter"} />
                            </li>
                            <li>
                                <AppLink to="/inscription/association" className="btn" title="S'inscrire"
                                         text={"S'inscrire"} />
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="header__secondary">
                <nav>
                    <ul className="nav__list">
                        <AppLink to="/" className="nav__list__link active" title="Page d'accueil" svg={<svg
                            className="icon lucide lucide-house"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#663c21"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                            <path
                                d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>} text={"Accueil"} />

                        <AppLink to="/animaux" className="nav__list__link" title="Page des animaux" svg={<svg
                            className="icon lucide lucide-paw-print"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#663c21"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="4" r="2" />
                            <circle cx="18" cy="8" r="2" />
                            <circle cx="20" cy="16" r="2" />
                            <path
                                d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
                        </svg>} text={"Les animaux"} />

                        <AppLink to="/associations" className="nav__list__link" title="Page des associations" svg={<svg
                            className="icon lucide lucide-heart-handshake"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#663c21"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path
                                d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            <path
                                d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
                            <path d="m18 15-2-2" />
                            <path d="m15 18-2-2" />
                        </svg>} text={"Les associations"} />
                    </ul>
                </nav>
            </div>
            {/* <!-- Liens connexion / inscription pour version mobile (apparaît au clic sur icône user) -->  */}
            <nav className="header__primary__links--mobile">
                <ul className="nav__list">
                    <AppLink to="/connexion" className="nav__list__link" title="Se connecter" text={"Se connecter"} />
                    <AppLink to="/inscription/association" className="btn" title="S'inscrire" text={"S'inscrire"} />
                </ul>
            </nav>
        </header>
    );
};

export default Header;
