import React from "react";

interface ModeSwitcherProps {
    text: string;
    onClick?: () => void;
}

const ModeSwitcher = ({ text, onClick }: ModeSwitcherProps) => {

    return (<>
            <button className="btn" onClick={onClick}>
                {text}
            </button>
        </>
    );
};

export default ModeSwitcher;