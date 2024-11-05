import "./Footer.scss";

const Footer = () => {
    return (
        <footer className="footer">
            <nav>
                <ul className="footer__nav__list">
                    <li>
                        <a className="footer__nav__link" href="/mentions-legales">Mentions légales</a>
                    </li>
                    <li>
                        <a className="footer__nav__link" href="/politique-confidentialite">Politique de
                            confidentialité</a>
                    </li>
                    <li>
                        <a className="footer__nav__link" href="/plan-du-site">Plan du site</a>
                    </li>
                    <li>
                        <a className="footer__nav__link" href="mailto:contact@petfosterconnect.com">Contact</a>
                    </li>
                </ul>
            </nav>
            <div className="copyright">PetFosterConnect - Copyright © 2024</div>
        </footer>
    );
};

export default Footer;
