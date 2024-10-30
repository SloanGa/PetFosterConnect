import { ReactNode } from "react";
import { Link } from "react-router-dom";
import './AppLink.scss';

interface LinkProps {
    to: string;
    className: string;
    title: string;
    text: string;
    svg?: ReactNode;
}

const AppLink = ({ to, className, title, svg, text }: LinkProps) => {
    return (
        <>
            <Link
                to={to}
                className={className}
                title={title}
            >
                {svg}
                {text}
            </Link>
        </>
    );
};

export default AppLink;