interface InputProps {
    classNameLabel?: string;
    classNameInput: string;
    type: string;
    name: string;
    value?: string;
    ariaLabel: string;
    placeholder?: string;
    text?: string;
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
                        }: InputProps) => {
    return (
        <label htmlFor={value} className={classNameLabel}>

            <input id={value} className={classNameInput} type={type} name={name} value={value} aria-label={ariaLabel}
                   placeholder={placeholder} /> {text}
        </label>
    );
};

export default InputWithLabel;
