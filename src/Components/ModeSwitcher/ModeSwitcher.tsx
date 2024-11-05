import React from 'react';

interface ModeSwitcherProps {
    mode: string
    setMode : React.Dispatch<React.SetStateAction<'famille' | 'association'>>;
    text: string;
}

const ModeSwitcher = ({ mode, setMode, text} : ModeSwitcherProps) => {

    return (
        <>
            <button className='btn' onClick={() => { mode === "association" ? setMode('famille') : setMode("association") }}>
                {text}
            </button>
        </>
    );
};

export default ModeSwitcher;