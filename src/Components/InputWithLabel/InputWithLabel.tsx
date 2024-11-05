import "./InputWithLabel.scss";
import { ChangeEvent } from "react";

interface InputProps {
    classNameLabel?: string;
    classNameInput: string;
    type: string;
    name: string;
    id:string;
    value?: string;
    ariaLabel: string;
    placeholder?: string;
    selected?: string;
    text?: string;
    accept? :string
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
                            accept,
                            id,
                        }: InputProps) => {
    return (
        <label htmlFor={id} className={classNameLabel}>
            <input id={id} className={classNameInput} type={type} name={name} value={value} aria-label={ariaLabel}
                   placeholder={placeholder} checked={selected === value} onChange={onChange} accept={accept} /> {text}
        </label>
    );
};

export default InputWithLabel;
