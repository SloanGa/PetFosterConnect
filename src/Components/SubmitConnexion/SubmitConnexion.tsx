import './SubmitConnexion.scss';

const SubmitConnexion = ({ onClick }) => {
    return (
        <button 
            type="button" 
            className="submitconnexion" 
            onClick={onClick}
            aria-label='Se connecter'
        >
            Se connecter
        </button>
    );
};

export default SubmitConnexion;