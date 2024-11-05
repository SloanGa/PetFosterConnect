import "./Loading.scss";

const Loading = () => {
    return (
        <div className="loading">
            <div className="loading__spinner"></div>
            <p className="loading__text">Chargement...</p>
        </div>
    );
};

export default Loading;