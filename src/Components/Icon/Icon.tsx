interface IconProps {
    ariaLabel: string;
    src: string;
    alt: string;
}

const Icon = ({ariaLabel, src, alt } : IconProps) => {
    return (
        <>
            <button
                type="button"
                className="icon"
                aria-label={ariaLabel}
            >
                <img src={src} alt={alt}/>
            </button>
        </>
    );
};

export default Icon;