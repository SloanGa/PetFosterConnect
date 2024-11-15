import "./Connexion.scss";
import { Helmet } from "react-helmet-async";
import Loading from "../../Components/Loading/Loading.tsx";
import Header from "../../Components/Header/Header";
import { Link } from "react-router-dom";
import Icon from "../../Components/Icon/Icon.tsx";
import { useRef } from "react";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import { Error } from "../../Components/Error/Error.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.tsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";

const Connexion = () => {
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const passwordInputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const { login } = useAuth();

	/* Validation des inputs */
	const { Formik } = formik;

	const schema = yup.object().shape({
		email: yup
			.string()
			.email("Veuillez entrer un email valide")
			.required("L'email est requis"),
		password: yup.string().required("Le mot de passe est requis"),
	});

	/* Toggle affichage du mot de passe */
	const togglePasswordVisibility = () => {
		setIsPasswordVisible((prevState) => !prevState);
	};

	/* Handler de soumission du formulaire */
	const handleLogin = async (values: { email: string; password: string }) => {
		const formDataObject = {
			email: values.email,
			password: values.password,
		};

		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch(
				`${import.meta.env.VITE_API_URL}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formDataObject),
				},
			);
			//
			if (!response.ok) {
				const error = await response.json();
				setError(error.error);
				return;
			}

			const token = response.headers.get("authorization")?.split(" ")[1];
			if (token) {
				const expiryTime = Date.now() + 3 * 60 * 60 * 1000; // 3 heures en millisecondes
				localStorage.setItem("auth_token", token);
				localStorage.setItem("auth_token_expiry", expiryTime.toString());

				const data = await response.json();

				localStorage.setItem("user", JSON.stringify(data));

				login(data);
				navigate("/");
			}
		} catch (err) {
			console.error("Erreur de connexion :", err);
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<>
			<Helmet>
				<title>Connexion | PetFoster Connect</title>
				<meta
					name="description"
					content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
				/>
			</Helmet>

			<Header />
			<main className="container">
				<h1 className="main__title">Connexion</h1>

				<Formik
					validationSchema={schema}
					onSubmit={handleLogin}
					initialValues={{ email: "", password: "" }}
					validateOnBlur={true}
					validateOnChange={true}
				>
					{({ handleSubmit, handleChange, values, touched, errors }) => (
						<Form className="form__connexion" onSubmit={handleSubmit}>
							{/* Input email */}
							<Form.Group controlId="formBasicEmail">
								<Form.Label column="sm" className="label">
									Votre email
								</Form.Label>
								<Form.Control
									className="input"
									type="email"
									name="email"
									aria-label="Votre email"
									placeholder="Votre email"
									value={values.email || ""}
									onChange={handleChange}
									isInvalid={touched.email && !!errors.email}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.email as string}
								</Form.Control.Feedback>
							</Form.Group>

							{/* Input mot de passe */}
							<Form.Group
								controlId="formBasicPassword"
								className="form__group__password"
							>
								<Form.Label column="sm" className="label">
									Votre mot de passe
								</Form.Label>
								<Form.Control
									className="input input__password"
									type={isPasswordVisible ? "text" : "password"}
									name="password"
									aria-label="Votre mot de passe"
									placeholder="Votre mot de passe"
									ref={passwordInputRef}
									value={values.password || ""}
									onChange={handleChange}
									isInvalid={touched.password && !!errors.password}
								/>
								<Form.Control.Feedback type="invalid">
									{errors.password as string}
								</Form.Control.Feedback>

								{!errors.password && (
									<Icon
										ariaLabel="Afficher ou Masquer le password"
										className="reset-password__eye"
										src={
											isConfirmPasswordVisible
												? "src/assets/icons/visible-password.svg"
												: "src/assets/icons/hidden-password.svg"
										}
										alt=""
										onClick={() => {
											isPasswordVisible
												? setIsPasswordVisible(false)
												: setIsPasswordVisible(true);
										}}
									/>
								)}
							</Form.Group>

							{/* Mot de passe oublié */}
							<a
								className="form__forget__password"
								href="http://localhost:5173/reinitialisation-mot-de-passe"
							>
								Mot de passe oublié ?{" "}
							</a>
							<Link
								to="/reinitialisation-mot-de-passe"
								title="Aller vers la page réinitialiser le mot de passe"
							/>

							{/* Bouton submit */}
							<Button
								type="submit"
								aria-label="Se connecter"
								className="btn__submit"
							>
								Se connecter
							</Button>

							{/* Erreur et loading */}
							{error && <Error error={error} classNameForm="error__form" />}
							{isLoading && <Loading />}
						</Form>
					)}
				</Formik>
			</main>
			<Footer />
		</>
	);
};

export default Connexion;
