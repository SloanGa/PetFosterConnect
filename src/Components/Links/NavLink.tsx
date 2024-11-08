import { NavLink } from "react-router-dom";

interface NavLinkProps {
    to: string;
    className?: string;
    title: string;
    text: string;
    svg?: ReactNode;
    onClick?: () => void;
}

const NavigationLink = ({ to, className, title, svg, text, onClick }: NavLinkProps) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                isActive ? `${className} ${className}--current` : `${className}`
            }
            title={title}
            onClick={onClick}
        >
            {svg}
            {text}
        </NavLink>
    );
};

export default NavigationLink;
