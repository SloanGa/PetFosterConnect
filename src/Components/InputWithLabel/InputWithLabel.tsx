import { ChangeEvent } from "react";

interface InputProps {
    classNameLabel?: string;
    classNameInput: string;
    type: string;
    name: string;
    value?: string;
    ariaLabel: string;
    placeholder?: string;
    selected?: string;
    text?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputWithLabel = ({
                            classNameLabel,
                            classNameInput,
                            type,
                            name,
                            value,
                            ariaLabel,
                            placeholder,
                            text,
                            selected,
                            onChange,
                        }: InputProps) => {
    return (
        <label htmlFor={value} className={classNameLabel}>

            <input id={value} className={classNameInput} type={type} name={name} value={value} aria-label={ariaLabel}
                   placeholder={placeholder} checked={selected === value} onChange={onChange} /> {text}
        </label>
    );
};

export default InputWithLabel;
