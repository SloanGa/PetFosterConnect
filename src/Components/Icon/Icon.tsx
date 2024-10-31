import "./Icon.scss";

interface IconProps {
    ariaLabel: string;
    src: string;
    alt: string;
    text?: string;
    onClick: () => void;
}

const Icon = ({ ariaLabel, src, alt, text, onClick }: IconProps) => {
    return (
        <>
            <button onClick={onClick}
                    type="button"
                    className="icon"
                    aria-label={ariaLabel}
            >
                <img src={src} alt={alt} />
                <span>{text}</span>
            </button>
        </>
    );
};

export default Icon;