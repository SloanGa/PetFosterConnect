import { ReactNode } from "react";
import { Link } from "react-router-dom";
import "./AppLink.scss";

interface LinkProps {
	to: string;
	className?: string;
	title: string;
	text: string;
	svg?: ReactNode;
	onClick?: () => void;
}

const AppLink = ({ to, className, title, svg, text, onClick }: LinkProps) => {
	return (
		<>
			<Link to={to} className={className} title={title} onClick={onClick}>
				{svg}
				{text}
			</Link>
		</>
	);
};

export default AppLink;
