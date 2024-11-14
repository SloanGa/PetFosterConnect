import "./ResetPassword.scss";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { Button, Form, Toast } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
const ResetPassword = () => {
	const baseURL = import.meta.env.VITE_API_URL;
	const [isRequestReset, setIsRequestReset] = useState(true);

	// Gestion récupération du resetToken

	const location = useLocation();
	const [decodedToken, setDecodedToken] = useState<object | null>(null);
	const [email, setEmail] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const queryParams = new URLSearchParams(location.search);
			const tokenFromUrl = queryParams.get("token");

			if (tokenFromUrl) {
				console.log("Token récupéré:", tokenFromUrl);
				setIsRequestReset(false);

				try {
					const response = await fetch(
						`${baseURL}/auth/resetpassword/confirm/?token=${tokenFromUrl}`,
						{
							method: "GET",
							headers: {
								"Content-Type": "application/json",
							},
						},
					);

					if (response.ok) {
						const data = await response.json();
						console.log("Réponse du serveur:", data);
						setDecodedToken(data);
					} else {
						const errorText = await response.text();
						console.log("Erreur du serveur:", response.status, errorText);
					}
				} catch (error) {
					console.error("Erreur de réseau:", error);
				}
			}
		};

		fetchData();
	}, [location, baseURL]);

	useEffect(() => {
		console.log("decodedToken mis à jour:", decodedToken);
	}, [decodedToken]);

	const initialValues = {
		email: "",
		password: "",
		confirmPassword: "",
	};

	const validationSchema = yup.object().shape({
		email: isRequestReset
			? yup
					.string()
					.required("Veuillez entrer votre email")
					.email("Veuillez entrer une adresse email valide")
			: yup.string().nullable(),
		password: !isRequestReset
			? yup.string().required("Veuillez entrer un mot de passe")
			: yup.string().nullable(),
		confirmPassword: !isRequestReset
			? yup
					.string()
					.required("Veuillez entrer de nouveau le mot de passe")
					.oneOf(
						[yup.ref("password"), null],
						"Les mots de passe doivent correspondre",
					)
			: yup.string().nullable(),
	});

	// Handler pour demander à réinitialiser le mot de passe
	const handleSubmitAskForReset = useCallback(
		async (values: { email: string }) => {
			const formDataObject = { email: values.email };
			console.log(formDataObject);

			try {
				const response = await fetch(`${baseURL}/auth/resetpassword`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formDataObject),
				});

				if (response.ok) {
					console.log(
						"Email de réinitialisation envoyé. Consultez également vos spams.",
					);
				} else {
					console.log("Une erreur est survenue. Veuillez réessayer.");
				}
			} catch (error) {
				console.error(error);
			}
		},

		[],
	);
	const handleSubmitResetPassword = useCallback(() => {
		console.log("Reset Password");
	}, []);
	return (
		<>
			<Helmet>
				<title>Réinitialisation mot de passe| PetFoster Connect</title>
				<meta
					name="description"
					content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
				/>
			</Helmet>
			<Header />
			<main className="container">
				<h1 className="main__title">Réinitialiser le mot de passe </h1>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={
						isRequestReset ? handleSubmitAskForReset : handleSubmitResetPassword
					}
				>
					{({
						handleSubmit,
						handleChange,
						values,
						touched,
						errors,
						setFieldValue,
					}) => (
						<Form
							className="reset__form"
							id="reset-form"
							onSubmit={handleSubmit} // C'est le handleSubmitEdit de formik ici
						>
							{isRequestReset ? (
								<Form.Group
									aria-label="Entrer l'email"
									className="mb-3"
									controlId="email"
								>
									<Form.Label>Veuillez entrer votre email</Form.Label>
									<Form.Control
										type="email"
										placeholder="votre adresse mail "
										name="email"
										value={values.email}
										onChange={handleChange}
										isInvalid={touched.email && !!errors.email}
									/>
									<Form.Control.Feedback type="invalid">
										{errors.email}
									</Form.Control.Feedback>
								</Form.Group>
							) : (
								<>
									<Form.Group
										aria-label="Entrer le nouveau mot de passe"
										className="mb-3"
										controlId="password"
									>
										<Form.Label>
											Veuillez entrer votre nouveau mot de passe
										</Form.Label>
										<Form.Control
											type="password"
											placeholder="Mot de passe"
											name="password"
											value={values.password}
											onChange={handleChange}
											isInvalid={touched.password && !!errors.password}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.password}
										</Form.Control.Feedback>
									</Form.Group>

									<Form.Group
										aria-label="Confirmer le mot de passe"
										className="mb-3"
										controlId="confirmPassword"
									>
										<Form.Label>
											Veuillez confirmer votre mot de passe
										</Form.Label>
										<Form.Control
											type="password"
											placeholder="Confirmation Mot de passe"
											name="confirmPassword"
											value={values.confirmPassword}
											onChange={handleChange}
											isInvalid={
												touched.confirmPassword && !!errors.confirmPassword
											}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.confirmPassword}
										</Form.Control.Feedback>
									</Form.Group>
								</>
							)}

							<Button className="btn--form-reset" type="submit">
								Envoyer
							</Button>
						</Form>
					)}
				</Formik>
			</main>
			<Footer />
		</>
	);
};

export default ResetPassword;
