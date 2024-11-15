import { Link } from "react-router-dom";

import "./Card.scss";

interface CardProps {
    path: string;
    src: string;
    alt: string;
    name: string;
    associationLocation: string;
    associationName?: string;
    animalType?: string;
    gender?: string;
    age?: number;
    availability?: boolean;
    isHomePage: boolean;
}

const Card = ({
    src,
    alt,
    name,
    associationLocation,
    associationName,
    animalType,
    gender,
    age,
    availability,
    path,
    isHomePage,
}: CardProps) => {
    return (
        <>
            <Link to={path} className="cards__list__link" aria-label="Voir la page de cet animal">
                <article className="card">
                    <div className="card__img__container">
                        <img
                            src={src}
                            className="card__img card-img-top"
                            alt={alt}
                            loading="lazy"
                        />

                        <div
                            className={
                                availability === false
                                    ? "card__img__overlay--active"
                                    : "card__img__overlay--inactive"
                            }
                        >
                            <span>Indisponible</span>
                        </div>
                    </div>

                    <div className="card-body text-center">
                        <h3 className="card__title card-title">{name}</h3>

                        {/* Affichage conditionnel si on est sur Home ou non */}
                        {isHomePage ? (
                            <p className="card__text card-text">{associationLocation}</p>
                        ) : (
                            <>
                                <div className="card__description">
                                    <span>{associationName}</span>
                                    <span>{associationLocation}</span>
                                </div>
                                <div className="card__description">
                                    <span>{animalType}</span>
                                    <span>{gender}</span>
                                    <span>
                                        {age} {age! > 1 ? "ans" : "an"}
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </article>
            </Link>
        </>
    );
};

export default Card;
