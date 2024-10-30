import { Link } from "react-router-dom";

import "./AnimalCard.scss";
import { IDepartment } from "../../Interfaces/IDepartment.ts";

interface CardProps {
    path: string;
    src: string;
    alt: string;
    name: string;
    associationLocation: string;
    associationName?: string;
    animalType?: string;
    gender?: string;
    age?: string;
    isHomePage: boolean;
}

const AnimalCard = ({
                        src,
                        alt,
                        name,
                        associationLocation,
                        associationName,
                        animalType,
                        gender,
                        age,
                        path,
                        isHomePage,

                    }: CardProps) => {
    return (
        <div className="cards">
            <Link to={path} className="card__link" aria-label="Voir la page de cet animal">
                <article className="card">
                    <img src={src} className="card__img card-img-top" alt={alt} loading="lazy" />

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
                                    <span>{age}</span>
                                </div>
                            </>
                        )}
                    </div>
                </article>
            </Link>
        </div>
    );
};

export default AnimalCard;