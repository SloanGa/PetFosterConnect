import './Icon.scss';

interface IconProps {
    ariaLabel: string;
    src: string;
    alt: string;
    onClick: () => void;
}

const Icon = ({ ariaLabel, src, alt, onClick }: IconProps) => {
    return (
        <>
            <button onClick={onClick}
                    type="button"
                    className="icon"
                    aria-label={ariaLabel}
            >
                <img src={src} alt={alt} />
            </button>
        </>
    );
};

export default Icon;