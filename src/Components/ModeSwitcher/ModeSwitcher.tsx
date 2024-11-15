import "./ModeSwitcher.scss";

interface ModeSwitcherProps {
    mode: string;
    handleSwitchFamilyMode: () => void;
    handleSwitchAssociationMode: () => void;
}

const ModeSwitcher = ({
    mode,
    handleSwitchFamilyMode,
    handleSwitchAssociationMode,
}: ModeSwitcherProps) => {
    return (
        <div className="switcher__group">
            <button
                className={mode === "association" ? "btn" : "btn btn--disabled"}
                onClick={handleSwitchAssociationMode}
            >
                Association
            </button>
            <button
                className={mode === "family" ? "btn" : "btn btn--disabled"}
                onClick={handleSwitchFamilyMode}
            >
                Famille
            </button>
        </div>
    );
};

export default ModeSwitcher;
