import "./Inscription.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ModeSwitcher from "../../Components/ModeSwitcher/ModeSwitcher";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import { Error } from "../../Components/Error/Error.tsx";
import { IDepartment } from "../../Interfaces/IDepartment.ts";


const Inscription = () => {
    const [departments, setDepartments] = useState<IDepartment[]>([]);
    const [mode, setMode] = useState<"family" | "association">("family");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isValide, setIsValide] = useState<boolean | null>(true);

    const passwordInputRef = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();
    const { login } = useAuth();

    /* Validation des inputs */
    const { Formik } = formik;

    const schema = yup.object().shape({
        name: yup.string().required("Le nom est requis"),
        address: yup.string().required("Une adresse valide est requise"),
        zip_code: yup
            .string()
            .matches(/^[0-9]{5}$/, "Le code postal doit être un nombre de 5 chiffres")
            .required("Le code postal est requis"),
        city: yup.string().required("La ville est requise"),
        department_id: yup.string().required("Le département est requis").notOneOf([" "], "Le département est requis"),
        phone_number: yup
            .string()
            .matches(/^[0-9]{10}$/, "Le numéro de téléphone doit être un nombre de 10 chiffres")
            .required("Le numéro de téléphone est requis"),
        email: yup.string().email("Veuillez entrer un email valide").required("L'email est requis"),
        password: yup.string().required("Le mot de passe est requis"),
        confirmPassword: yup.string().required("Le mot de passe est requis"),
        email_association: yup.string().required("Votre email d'association est requis"),
        family_img: yup.mixed().nullable().notRequired(),
        association_img: yup
            .mixed()
            .nullable()
            .required("Une image est requise"),
    });

    useEffect(() => {
        const fetchDepartments = async () => {

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/departments`);
                const data = await response.json();
                setDepartments(data);
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        };

        fetchDepartments();
    }, []);

    /* Toggle affichage du mot de passe */
    const togglePasswordVisibility = () => {
        setIsPasswordVisible(prevState => !prevState);
    };

    const handleSetMode = () => {
        setMode(mode === "association" ? "family" : "association");
    };

    const handleSubmitForm = async (values: any) => {
        const formData = new FormData();

        for (const key in values) {
            if (values[key] !== null && values[key] !== undefined) { // Vérifie que la valeur n'est pas null ou undefined
                formData.append(key, values[key]);
            }
        }

        formData.append("role", mode);

        const department_id = formData.get("department_id");

        /* Gestion manuelle de l'affichage de l'erreur en cas de département non choisi */
        if (!department_id) {
            setIsValide(false);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register/${mode}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error);
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

        } catch (error) {
            console.error("Erreur de requête:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>
                    Inscription | PetFoster Connect
                </title>
                <meta
                    name="description"
                    content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />
            </Helmet>

            <Header />

            <div className="form__presentation">

                <h1 className="main__title">Inscription</h1>
                <ModeSwitcher onClick={handleSetMode}
                              text={mode === "family" ? "Association ? Cliquez ici" : "Famille ? Cliquez-ici"} />
                <h2 className="form__title">Formulaire d'inscription
                    : {mode === "family" ? "Famille" : "Association"}</h2>

            </div>

            <Formik
                validationSchema={schema}
                onSubmit={handleSubmitForm}
                initialValues={{
                    name: "",
                    address: "",
                    zip_code: "",
                    department_id: "",
                    city: "",
                    phone_number: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                    email_association: "",
                    association_img: null,
                    family_img: null,
                }}
                validateOnBlur={true}
                validateOnChange={true}
            >
                {({ setFieldValue, handleSubmit, handleChange, values, touched, errors }) => (

                    <Form encType="multipart/form-data" className="form__register" onSubmit={handleSubmit}
                          noValidate>
                        <div className="container__register">
                            <div className="user__register">
                                <p className="info__form">Informations utilisateur</p>
                                {/* Input email */}
                                <Form.Group controlId="formBasicEmail" className="form__email">
                                    <Form.Label column="sm" className="label">
                                        Votre email *
                                    </Form.Label>
                                    <Form.Control
                                        className="input"
                                        type="email"
                                        name="email"
                                        aria-label="Votre email"
                                        placeholder="Votre email"
                                        value={values.email}
                                        onChange={handleChange}
                                        isInvalid={touched.email && !!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email as string}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Input mot de passe */}
                                <Form.Group controlId="formBasicPassword" className="form__password">
                                    <Form.Label column="sm" className="label">
                                        Votre mot de passe *
                                    </Form.Label>
                                    <Form.Control
                                        className="input input__password"
                                        type={isPasswordVisible ? "text" : "password"}
                                        name="password"
                                        aria-label="Votre mot de passe"
                                        placeholder="Votre mot de passe"
                                        ref={passwordInputRef}
                                        value={values.password}
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

                                {/* Input confirme mot de passe */}
                                <Form.Group controlId="formBasicConfirmPassword" className="form__passwordconfirm">
                                    <Form.Label column="sm" className="label">
                                        Confirmez votre mot de passe *
                                    </Form.Label>
                                    <Form.Control
                                        className="input input__password"
                                        type={isPasswordVisible ? "text" : "password"}
                                        name="confirmPassword"
                                        aria-label="Confirmez votre mot de passe"
                                        placeholder="Confirmez votre mot de passe"
                                        ref={passwordInputRef}
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.confirmPassword as string}
                                    </Form.Control.Feedback>

                                    {!errors.confirmPassword && (
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
                                {/* Input name */}
                                <Form.Group controlId="formBasicName" className="form__name">
                                    <Form.Label column="sm">
                                        Votre Nom *
                                    </Form.Label>
                                    <Form.Control
                                        className="form__connexion_input"
                                        type="text"
                                        name="name"
                                        aria-label="Votre nom"
                                        placeholder="Votre nom"
                                        value={values.name}
                                        onChange={handleChange}
                                        isInvalid={touched.name && !!errors.name}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.name as string}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </div>

                            <div className="entity__register">
                                <p className="info__form">Informations {mode === "family" ? "Famille" : "Association"}</p>
                                {/* Input adresse */}
                                <Form.Group controlId="formBasicAddress" className="form__address">
                                    <Form.Label column="sm">
                                        Votre Adresse *
                                    </Form.Label>
                                    <Form.Control
                                        className="form__connexion_input"
                                        type="text"
                                        name="address"
                                        aria-label="Votre adresse"
                                        placeholder="Votre adresse"
                                        value={values.address}
                                        onChange={handleChange}
                                        isInvalid={touched.address && !!errors.address}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.address as string}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Input zip_code */}
                                <Form.Group controlId="formBasicZipcode" className="form__zipcode">
                                    <Form.Label column="sm">
                                        Votre code postal *
                                    </Form.Label>
                                    <Form.Control
                                        className="form__connexion_input"
                                        type="text"
                                        name="zip_code"
                                        aria-label="Votre code postal"
                                        placeholder="Votre code postal"
                                        value={values.zip_code}
                                        onChange={handleChange}
                                        isInvalid={touched.zip_code && !!errors.zip_code}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.zip_code as string}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                {/* Input city */}
                                <Form.Group controlId="formBasicCity" className="form__city">
                                    <Form.Label column="sm">
                                        Votre Ville *
                                    </Form.Label>
                                    <Form.Control
                                        className="form__connexion_input"
                                        type="text"
                                        name="city"
                                        aria-label="Votre ville"
                                        placeholder="Votre ville"
                                        value={values.city}
                                        onChange={handleChange}
                                        isInvalid={touched.city && !!errors.city}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.city as string}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                {/* Input departments */}
                                <Form.Group controlId="formBasicDepartments" className="form__departement">
                                    <Form.Label column="sm">Votre département *</Form.Label>
                                    <Form.Control as="select" name="department_id"
                                                  className={!isValide ? "is-invalid" : ""}
                                                  onChange={handleChange}
                                                  isInvalid={!!errors.department_id}>
                                        <option value="">Tous les départements</option>
                                        {departments.map((department) => (
                                            <option key={department.id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        {errors.department_id as string}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Input email asso */}
                                {mode === "association" ? (
                                    <Form.Group controlId="formBasicEmailAsso">
                                        <Form.Label column="sm" className="form__emailAsso">
                                            Votre adresse mail d'association *
                                        </Form.Label>
                                        <Form.Control
                                            className="form__connexion_input"
                                            type="text"
                                            name="email_association"
                                            aria-label="Votre adresse mail d'association"
                                            placeholder="Votre adresse mail d'association"
                                            value={values.email_association}
                                            onChange={handleChange}
                                            isInvalid={touched.email_association && !!errors.email_association}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.email_association as string}
                                        </Form.Control.Feedback>
                                    </Form.Group>) : null}


                                {/* Input phone_number */}
                                <Form.Group controlId="formBasicPhoneNumber">
                                    <Form.Label column="sm" className="form__number">
                                        Votre numéro de téléphone *
                                    </Form.Label>
                                    <Form.Control
                                        className="form__connexion_input"
                                        type="text"
                                        name="phone_number"
                                        aria-label="Votre numéro de téléphone"
                                        placeholder="Votre numéro de téléphone"
                                        value={values.phone_number}
                                        onChange={handleChange}
                                        isInvalid={touched.phone_number && !!errors.phone_number}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.phone_number as string}
                                    </Form.Control.Feedback>
                                </Form.Group>


                                {/* Input file */}

                                {mode === "family" ?
                                    /* mode = family */
                                    (<Form.Group controlId="formBasicFile" className="form__file">
                                        <Form.Label column="sm">
                                            Votre photo de profil
                                        </Form.Label>
                                        <Form.Control
                                            className="form__connexion_input"
                                            type="file"
                                            name="family_img"
                                            aria-label="Votre photo de profil"
                                            accept="image/png, image/jpeg, image/webp, image/jpg"
                                            onChange={(event) => {
                                                const file = event.currentTarget.files[0];
                                                console.log(file);
                                                setFieldValue("family_img", file);
                                            }}
                                            isInvalid={touched.family_img && !!errors.family_img}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.family_img as string}
                                        </Form.Control.Feedback>
                                    </Form.Group>) :

                                    /* mode = association */
                                    <Form.Group controlId="formBasicFile" className="form__file">
                                        <Form.Label column="sm">
                                            Votre photo de profil *
                                        </Form.Label>
                                        <Form.Control
                                            className="form__connexion_input"
                                            type="file"
                                            name="association_img"
                                            aria-label="Votre photo de profil"
                                            accept="image/png, image/jpeg, image/webp, image/jpg"
                                            onChange={(event) => {
                                                const file = event.currentTarget.files[0] || null;
                                                console.log(file);
                                                setFieldValue("association_img", file);
                                            }}
                                            isInvalid={touched.association_img && !!errors.association_img}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.association_img as string}
                                        </Form.Control.Feedback>
                                    </Form.Group>}
                            </div>
                        </div>


                        {/* Bouton submit */}
                        <Button type="submit" aria-label="S'inscrire" className="btn__form--grid btn__submit">
                            S'inscrire
                        </Button>

                        {/* Erreur et loading */}
                    </Form>
                )}
            </Formik>
            {error && <Error error={error} classNameForm="error__form" />}
            {isLoading && <Loading />}


            <Footer />
        </>

    );
};

export default Inscription;