import "./Error.scss";

interface ErrorProps {
    error: string;
    classNameForm?: string;
}

export const Error = ({ error, classNameForm }: ErrorProps) => {
    return (
        <>
            <p className={`error ${classNameForm}`}>{error}</p>
        </>
    );
};

