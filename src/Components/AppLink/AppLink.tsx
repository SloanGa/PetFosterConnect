import {ReactNode} from 'react';
import { Link } from 'react-router-dom';

interface LinkProps {
    to: string;
    className: string;
    title: string;
    text: string;
    svg? :ReactNode
}

const AppLink = ({to, className, title, svg, text } : LinkProps) => {
    return (
        <>
            <li>
                <Link
                    to={to}
                    className={className}
                    title={title}
                >
                    {svg}
                    {text}
                </Link>
            </li>
        </>
    );
};

export default AppLink;