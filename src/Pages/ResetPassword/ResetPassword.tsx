import "./ResetPassword.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { Button, Form, Toast } from "react-bootstrap";
import Icon from "../../Components/Icon/Icon.tsx";
import { Formik } from "formik";
import * as yup from "yup";

const ResetPassword = () => {
    const navigate = useNavigate();

    // Gestion toggle password/string

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const baseURL = import.meta.env.VITE_API_URL;
    const [isRequestReset, setIsRequestReset] = useState(true);

    // Gestion récupération du resetToken

    const location = useLocation();
    const [decodedToken, setDecodedToken] = useState<{
        email: string;
        iat: number;
        exp: number;
    } | null>(null);
    const [tokenFromUrl, setTokenFromURL] = useState<string | null>(null);


	const [showToast, setShowToast] = useState(false);

	interface ToastData {
		message: string;
		color: string;
	}

	const [toastData, setToastData] = useState<ToastData | null>(null);
	const toggleShowToast = (message: string, color: string) => {
		setToastData({ message, color });
	};


    const toggleCloseToast = () => {
        setShowToast(!showToast);
    };
    useEffect(() => {
        const fetchData = async () => {
            const queryParams = new URLSearchParams(location.search);
            const tokenFromUrl = queryParams.get("token");
            setTokenFromURL(tokenFromUrl);

            if (tokenFromUrl) {
                setIsRequestReset(false);

                try {
                    const response = await fetch(
                        `${baseURL}/auth/resetpassword/confirm/?token=${tokenFromUrl}`,
                        {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.ok) {
                        const data = await response.json();
                        setDecodedToken(data);
                    } else {
                        const errorText = await response.text();
                        console.log("Erreur du serveur:", errorText);
                    }
                } catch (error) {
                    console.error(error);
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
                  .oneOf([yup.ref("password")], "Les mots de passe doivent correspondre")
            : yup.string().nullable(),
    });

    // Handler pour demander à réinitialiser le mot de passe
    const handleSubmitAskForReset = useCallback(
        async (values: { email: string }) => {
            const formDataObject = { email: values.email };

            try {
                const response = await fetch(`${baseURL}/auth/resetpassword`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formDataObject),
                });


				if (response.ok) {
					setShowToast(true);
					toggleShowToast(
						"Email de réinitialisation envoyé. Consultez également vos spams.",
						"custom-green",
					);
				} else {
					setShowToast(true);
					toggleShowToast(
						"Une erreur est survenue. Veuillez réessayer.",
						"custom-red",
					);
				}
			} catch (error) {
				console.error(error);
			}
		},


        []
    );
    const handleSubmitResetPassword = useCallback(
        async (values: { password: string; confirmPassword: string }) => {
            let timer: number | null = null;
            if (timer) {
                clearTimeout(timer);
            }
            const formDataObject = {
                password: values.password,
                confirmPassword: values.confirmPassword,
            };

            try {
                const response = await fetch(
                    `${baseURL}/auth/updatepassword/${decodedToken?.email}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${tokenFromUrl}`,
                        },
                        body: JSON.stringify(formDataObject),
                    }
                );


				if (response.ok) {
					setShowToast(true);
					toggleShowToast("Mot de passe modifié avec succès.", "custom-green");
					timer = setTimeout(() => {
						navigate("/connexion");
					}, 5000);
				} else {
					setShowToast(true);
					toggleShowToast(
						"Une erreur est survenue. Veuillez réessayer.",
						"custom-red",
					);
				}
			} catch (error) {
				console.error(error);
			}


            return () => {
                if (timer) {
                    clearTimeout(timer);
                }
            };
        },
        [decodedToken, navigate]
    );
    return (
        <>
            <Helmet>
                <title>Réinitialisation mot de passe | PetFoster Connect</title>
                <meta
                    name="description"
                    content="Réinitialisez votre mot de passe sur PetFoster Connect pour accéder à votre compte en toute sécurité."
                />
            </Helmet>
            <Header />
            <main className="container main--reset-password">
                <h1 className="main__title">Réinitialiser le mot de passe </h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={isRequestReset ? handleSubmitAskForReset : handleSubmitResetPassword}
                >
                    {({ handleSubmit, handleChange, values, touched, errors }) => (
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
                                        placeholder="Email "
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
                                                className="icon--eye"
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
                                            placeholder="Confirmation du mot de passe"
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
                                                className="icon--eye"
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
					className={`confirmation__reset__toast ${toastData?.color ? `toast-${toastData.color}` : ""}`}
					show={showToast}
					onClose={toggleCloseToast}
					delay={5000}
					autohide
				>
					<Toast.Body>{toastData?.message}</Toast.Body>
				</Toast>
			</main>
			<Footer />
		</>
	);

};

export default ResetPassword;
