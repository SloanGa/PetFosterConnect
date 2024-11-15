import "./ResetPassword.scss";
import { HelmetProvider } from "react-helmet-async";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { Button, Form, Toast } from "react-bootstrap";
import Icon from "../../Components/Icon/Icon.tsx";
import { Formik } from "formik";
import * as yup from "yup";
const ResetPassword = () => {
	// Gestion toggle password/string

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);
	const baseURL = import.meta.env.VITE_API_URL;
	const [isRequestReset, setIsRequestReset] = useState(true);

	// Gestion récupération du resetToken

	const location = useLocation();
	const [decodedToken, setDecodedToken] = useState<object | null>(null);
	const [tokenFromUrl, setTokenFromURL] = useState<string | null>(null);
	const [showToast, setShowToast] = useState(false);
	const toggleShowToast = () => setShowToast(!showToast);
	const [toastMessage, setToastMessage] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const queryParams = new URLSearchParams(location.search);
			const tokenFromUrl = queryParams.get("token");
			setTokenFromURL(tokenFromUrl);

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
	}, [location]);

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
					setToastMessage(
						"Email de réinitialisation envoyé. Consultez également vos spams.",
					);
					toggleShowToast();
				} else {
					setToastMessage("Une erreur est survenue. Veuillez réessayer.");
					toggleShowToast();
					console.log("Une erreur est survenue. Veuillez réessayer.");
				}
			} catch (error) {
				console.error(error);
			}
		},

		[],
	);
	const handleSubmitResetPassword = useCallback(
		async (values: { password: string; confirmPassword: string }) => {
			const formDataObject = {
				password: values.password,
				confirmPassword: values.confirmPassword,
			};
			console.log("Reset Password", formDataObject);

			try {
				const response = await fetch(
					`${baseURL}/auth/updatepassword/${decodedToken.email}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${tokenFromUrl}`,
						},
						body: JSON.stringify(formDataObject),
					},
				);

				if (response.ok) {
					const data = await response.json();
					console.log(data);
					setToastMessage(
						"Email de réinitialisation envoyé. Consultez également vos spams.",
					);
					toggleShowToast();
				} else {
					const errorData = await response.json();
					setToastMessage(
						"Email de réinitialisation envoyé. Consultez également vos spams.",
					);
					toggleShowToast();
					console.log(errorData);
				}
			} catch (error) {
				console.error(error);
			}
		},
		[decodedToken, tokenFromUrl],
	);
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
										className="mb-3 form__group__password"
										controlId="password"
									>
										<Form.Label>
											Veuillez entrer votre nouveau mot de passe
										</Form.Label>
										<Form.Control
											type={isPasswordVisible ? "text" : "password"}
											placeholder="Mot de passe"
											name="password"
											value={values.password}
											onChange={handleChange}
											isInvalid={touched.password && !!errors.password}
										/>
										<Form.Control.Feedback type="invalid">
											{errors.password}
										</Form.Control.Feedback>

										{!errors.password && (
											<Icon
												ariaLabel="Afficher ou Masquer le password"
												className="reset-password__eye"
												src={
													isPasswordVisible
														? "src/assets/icons/hidden-password.svg"
														: "src/assets/icons/visible-password.svg"
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

									<Form.Group
										aria-label="Confirmer le mot de passe"
										className="mb-3 form__group__password"
										controlId="confirmPassword"
									>
										<Form.Label>
											Veuillez confirmer votre mot de passe
										</Form.Label>
										<Form.Control
											type={isConfirmPasswordVisible ? "text" : "password"}
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
										{!errors.confirmPassword && (
											<Icon
												ariaLabel="Afficher ou Masquer le password"
												className="reset-password__eye"
												src={
													isConfirmPasswordVisible
														? "src/assets/icons/hidden-password.svg"
														: "src/assets/icons/visible-password.svg"
												}
												alt=""
												onClick={() => {
													isConfirmPasswordVisible
														? setIsConfirmPasswordVisible(false)
														: setIsConfirmPasswordVisible(true);
												}}
											/>
										)}
									</Form.Group>
								</>
							)}

							<Button className="btn--form-reset" type="submit">
								Envoyer
							</Button>
						</Form>
					)}
				</Formik>
				<Toast
					className="confirmation__reset__toast"
					show={showToast}
					onClose={toggleShowToast}
				>
					<Toast.Body>{toastMessage}</Toast.Body>
				</Toast>
			</main>
			<Footer />
		</>
	);
};

export default ResetPassword;
