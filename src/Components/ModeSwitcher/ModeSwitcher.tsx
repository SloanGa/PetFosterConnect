import React from "react";

interface ModeSwitcherProps {
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<"family" | "association">>;
    text: string;
}

const ModeSwitcher = ({ mode, setMode, text }: ModeSwitcherProps) => {

    return (
        <>
            <button className="btn" onClick={() => {
                mode === "association" ? setMode("family") : setMode("association");
            }}>
                {text}
            </button>
        </>
    );
};

export default ModeSwitcher;