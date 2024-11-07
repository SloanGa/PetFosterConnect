import "./Connexion.scss";
import { Helmet } from "react-helmet-async";
import Loading from "../../Components/Loading/Loading.tsx";
import Header from "../../Components/Header/Header";
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
        email: yup.string().email("Veuillez entrer un email valide").required("L'email est requis"),
        password: yup.string().required("Le mot de passe est requis"),
    });

    /* Toggle affichage du mot de passe */
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formDataObject),
            });
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
                            <Form.Group controlId="formBasicPassword" className="form__group__password">
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
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        aria-label={isPasswordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                                        aria-pressed={isPasswordVisible}
                                        className="toggle-password-button"
                                    >
                                        {isPasswordVisible ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24"
                                                 height="24">
                                                <path
                                                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="24"
                                                 height="24">
                                                <path
                                                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                                            </svg>
                                        )}
                                    </button>
                                )}
                            </Form.Group>

                            {/* Mot de passe oublié */}
                            <p className="form__forget__password">Mot de passe oublié ?</p>

                            {/* Bouton submit */}
                            <Button type="submit" aria-label="Se connecter" className="btn__submit">
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