import "./Error.scss";

interface ErrorProps {
    error: string;
}

export const Error = ({ error }: ErrorProps) => {
    return (
        <>
            <p className="error">{error}</p>
        </>
    );
};

