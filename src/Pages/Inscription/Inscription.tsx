import "./Inscription.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ModeSwitcher from "../../Components/ModeSwitcher/ModeSwitcher";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.tsx";
import Loading from "../../Components/Loading/Loading.tsx";
import Form from "react-bootstrap/Form";
import Icon from "../../Components/Icon/Icon.tsx";
import * as formik from "formik";
import * as yup from "yup";
import { Error } from "../../Components/Error/Error.tsx";
import { useFetchDepartments } from "../../Hook/useFetchDepartments.ts";

const Inscription = () => {
    const [mode, setMode] = useState<"family" | "association">("family");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const passwordInputRef = useRef<HTMLInputElement | null>(null);

    const navigate = useNavigate();
    const { login } = useAuth();
    const { departments } = useFetchDepartments();

    /* Validation des inputs */
    const { Formik } = formik;

    const isAssociation = mode === "association";

    const schema = yup.object().shape({
        name: yup.string().required("Le nom est requis"),
        address: yup.string().required("Une adresse valide est requise"),
        zip_code: yup
            .string()
            .matches(/^[0-9]{5}$/, "Le code postal doit être un nombre de 5 chiffres")
            .required("Le code postal est requis"),
        city: yup.string().required("La ville est requise"),
        department_id: yup
            .string()
            .required("Le département est requis")
            .notOneOf([" "], "Le département est requis"),
        phone_number: yup.string().required("Le numéro de téléphone est requis"),
        email: yup.string().email("Veuillez entrer un email valide").required("L'email est requis"),
        password: yup.string().required("Le mot de passe est requis"),
        confirmPassword: yup
            .string()
            .required("Le mot de passe est requis")
            .oneOf([yup.ref("password"), null], "Les mots de passe doivent correspondre"),
        email_association: isAssociation
            ? yup.string().required("Votre email d'association est requis")
            : yup.string().nullable(),
        association_img: isAssociation
            ? yup.mixed().nullable().required("Une image est requise")
            : yup.mixed().nullable(),
        family_img: yup.mixed().nullable().notRequired(),
    });

    // const handleSetMode = () => {
    //     setMode(mode === "association" ? "family" : "association");
    // };

    const handleSwitchFamilyMode = () => {
        setMode("family");
    };

    const handleSwitchAssociationMode = () => {
        setMode("association");
    };

    const handleSubmitForm = async (values: any) => {
        const formData = new FormData();
        for (const key in values) {
            if (values[key] !== null && values[key] !== undefined && values[key] !== "") {
                // Vérifie que la valeur n'est pas null ou undefined
                formData.append(key, values[key]);
                console.log(values[key]);
            }
        }

        formData.append("role", mode);

        const department_id = formData.get("department_id");

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
                <title>Inscription | PetFoster Connect</title>
                <meta
                    name="description"
                    content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />
            </Helmet>

            <Header />
            <div className="container main--register">
                <div className="form__presentation">
                    <h1 className="main__title">Inscription</h1>
                    <ModeSwitcher
                        handleSwitchFamilyMode={handleSwitchFamilyMode}
                        handleSwitchAssociationMode={handleSwitchAssociationMode}
                        mode={mode}
                    />
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
                    validateOnBlur={false}
                    validateOnChange={false}
                >
                    {({ setFieldValue, handleSubmit, handleChange, values, touched, errors }) => (
                        <Form
                            encType="multipart/form-data"
                            className="form__register"
                            onSubmit={handleSubmit}
                            noValidate
                        >
                            <div className="container__register">
                                <div className="form__column">
                                    {/* Input email */}
                                    <Form.Group controlId="formBasicEmail" className="form__email">
                                        <Form.Label column="sm" className="label">
                                            Email *
                                        </Form.Label>
                                        <Form.Control
                                            className="input"
                                            type="email"
                                            name="email"
                                            placeholder="Adresse email"
                                            value={values.email}
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
                                        className="form__password"
                                    >
                                        <Form.Label column="sm" className="label">
                                            Mot de passe *
                                        </Form.Label>
                                        <Form.Control
                                            className="input input__password"
                                            type={isPasswordVisible ? "text" : "password"}
                                            name="password"
                                            placeholder="Mot de passe"
                                            ref={passwordInputRef}
                                            value={values.password}
                                            onChange={handleChange}
                                            isInvalid={touched.password && !!errors.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.password as string}
                                        </Form.Control.Feedback>

                                        {!errors.password && (
                                            <Icon
                                                ariaLabel="Afficher ou Masquer le password"
                                                className="icon--eye"
                                                src={
                                                    isPasswordVisible
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

                                    {/* Input confirme mot de passe */}
                                    <Form.Group
                                        controlId="formBasicConfirmPassword"
                                        className="form__passwordconfirm"
                                    >
                                        <Form.Label column="sm" className="label">
                                            Confirmez votre mot de passe *
                                        </Form.Label>
                                        <Form.Control
                                            className="input input__password"
                                            type={isConfirmPasswordVisible ? "text" : "password"}
                                            name="confirmPassword"
                                            placeholder="Confirmez votre mot de passe"
                                            ref={passwordInputRef}
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={
                                                touched.confirmPassword && !!errors.confirmPassword
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword as string}
                                        </Form.Control.Feedback>

                                        {!errors.confirmPassword && (
                                            <Icon
                                                ariaLabel="Afficher ou Masquer le password"
                                                className="icon--eye"
                                                src={
                                                    isConfirmPasswordVisible
                                                        ? "src/assets/icons/visible-password.svg"
                                                        : "src/assets/icons/hidden-password.svg"
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
                                    {/* Input name */}
                                    <Form.Group controlId="formBasicName" className="form__name">
                                        {mode === "family" ? (
                                            <Form.Label column="sm">Nom de famille *</Form.Label>
                                        ) : (
                                            <Form.Label column="sm">
                                                Nom de l'association *
                                            </Form.Label>
                                        )}
                                        <Form.Control
                                            className="form__connexion_input"
                                            type="text"
                                            name="name"
                                            placeholder="Nom"
                                            value={values.name}
                                            onChange={handleChange}
                                            isInvalid={touched.name && !!errors.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.name as string}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    {/* Input file */}
                                    {mode === "family" ? (
                                        /* mode = family */
                                        <Form.Group
                                            controlId="formBasicFile"
                                            className="form__file"
                                        >
                                            <Form.Label column="sm">Photo de profil</Form.Label>
                                            <Form.Control
                                                className="form__connexion_input"
                                                type="file"
                                                name="family_img"
                                                accept="image/png, image/jpeg, image/webp, image/jpg"
                                                onChange={(event) => {
                                                    //ts-ignore
                                                    const file = event.currentTarget.files[0];
                                                    setFieldValue("family_img", file);
                                                }}
                                                isInvalid={
                                                    touched.family_img && !!errors.family_img
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.family_img as string}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    ) : (
                                        /* mode = association */
                                        <Form.Group
                                            controlId="formBasicFile"
                                            className="form__file"
                                        >
                                            <Form.Label column="sm">
                                                Photo ou logo de l'association *
                                            </Form.Label>
                                            <Form.Control
                                                className="form__connexion_input"
                                                type="file"
                                                name="association_img"
                                                accept="image/png, image/jpeg, image/webp, image/jpg"
                                                onChange={(event) => {
                                                    const file =
                                                        event.currentTarget.files[0] || null;
                                                    setFieldValue("association_img", file);
                                                }}
                                                isInvalid={
                                                    touched.association_img &&
                                                    !!errors.association_img
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.association_img as string}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    )}
                                </div>

                                <div className="form__column">
                                    {/* Input adresse */}
                                    <Form.Group
                                        controlId="formBasicAddress"
                                        className="form__address"
                                    >
                                        <Form.Label column="sm">Adresse *</Form.Label>
                                        <Form.Control
                                            className="form__connexion_input"
                                            type="text"
                                            name="address"
                                            placeholder="Adresse"
                                            value={values.address}
                                            onChange={handleChange}
                                            isInvalid={touched.address && !!errors.address}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.address as string}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Input zip_code */}
                                    <Form.Group
                                        controlId="formBasicZipcode"
                                        className="form__zipcode"
                                    >
                                        <Form.Label column="sm">Code postal *</Form.Label>
                                        <Form.Control
                                            className="form__connexion_input"
                                            type="text"
                                            name="zip_code"
                                            placeholder="Code postal"
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
                                        <Form.Label column="sm">Ville *</Form.Label>
                                        <Form.Control
                                            className="form__connexion_input"
                                            type="text"
                                            name="city"
                                            placeholder="Ville"
                                            value={values.city}
                                            onChange={handleChange}
                                            isInvalid={touched.city && !!errors.city}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.city as string}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Input departments */}
                                    <Form.Group
                                        controlId="formBasicDepartments"
                                        className="form__departement"
                                    >
                                        <Form.Label column="sm">Département *</Form.Label>
                                        <Form.Select
                                            name="department_id"
                                            value={values.department_id}
                                            onChange={handleChange}
                                            isInvalid={!!errors.department_id}
                                        >
                                            <option value="">Tous les départements</option>
                                            {departments.map((department) => (
                                                <option key={department.id} value={department.id}>
                                                    {department.name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            {errors.department_id as string}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    {/* Input email asso */}
                                    {mode === "association" ? (
                                        <Form.Group controlId="formBasicEmailAsso">
                                            <Form.Label column="sm" className="form__emailAsso">
                                                Mail de contact de l'association *
                                            </Form.Label>
                                            <Form.Control
                                                className="form__connexion_input"
                                                type="text"
                                                name="email_association"
                                                placeholder="Email de contact"
                                                value={values.email_association}
                                                onChange={handleChange}
                                                isInvalid={
                                                    touched.email_association &&
                                                    !!errors.email_association
                                                }
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email_association as string}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    ) : null}

                                    {/* Input phone_number */}
                                    <Form.Group controlId="formBasicPhoneNumber">
                                        <Form.Label column="sm" className="form__number">
                                            Numéro de téléphone *
                                        </Form.Label>
                                        <Form.Control
                                            className="form__connexion_input"
                                            type="text"
                                            name="phone_number"
                                            placeholder="Numéro de téléphone"
                                            value={values.phone_number}
                                            onChange={handleChange}
                                            isInvalid={
                                                touched.phone_number && !!errors.phone_number
                                            }
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.phone_number as string}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </div>
                            </div>
                            <button type="submit" aria-label="S'inscrire" className="btn">
                                S'inscrire
                            </button>
                        </Form>
                    )}
                </Formik>
                <span>Champs requis*</span>
                {error && <Error error={error} classNameForm="error__form" />}
                {isLoading && <Loading />}
            </div>

            <Footer />
        </>
    );
};

export default Inscription;
