import "./Icon.scss";

interface IconProps {
    ariaLabel: string;
    src?: string;
    alt?: string;
    text?: string;
    className?: string;
    onClick: () => void;
}

const Icon = ({ ariaLabel, className, src, alt, text, onClick }: IconProps) => {
    return (
        <>
            <button
                onClick={onClick}
                type="button"
                // permet d'appliquer des styles particuliers à l'icon si besoin en passant en props une classe supplémentaire
                className={className ? `icon ${className}` : "icon"}
                aria-label={ariaLabel}
            >
                <img src={src} alt={alt} />
                {text}
                {/* <span>{text}</span> */}
            </button>
        </>
    );
};

export default Icon;
