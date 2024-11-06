import React from 'react'; 

interface SubmitConnexionProps{
    onClick : (event: React.FormEvent<HTMLFormElement> )=> void
}

const SubmitConnexion = ({ onClick } : SubmitConnexionProps) => {
    return (
        <button 
            type="button" 
            className="btn" 
            onClick={onClick}
            aria-label='Se connecter'
        >
            Se connecter
        </button>
    );
};

export default SubmitConnexion;