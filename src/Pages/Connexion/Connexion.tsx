import Loading from "../../Components/Loading/Loading.tsx";
import { Helmet } from "react-helmet-async";
import "./Connexion.scss";
import Header from "../../Components/Header/Header";
import PasswordInput from "../../Components/PasswordInput/PasswordInput";
import InputWithLabel from "../../Components/InputWithLabel/InputWithLabel";
import { FormEvent } from "react";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import { Error } from "../../Components/Error/Error.tsx";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext.tsx";

const Connexion = () => {
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;

        const formData = new FormData(form);
        const formDataObject: { [key: string]: string } = {};

        formData.forEach((value, key) => {
            formDataObject[key] = value as string;
        });
        
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

            if (!response.ok) {
                const error = await response.json();
                setError(error.message);
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

            } else {
                console.log("Missing token");
            }

        } catch (err) {
            console.error("Erreur de connexion :", err);
            setError("Une erreur est survenue, veillez réessayer");
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>

            {/*<!-- Utilisation d'Helmet --> */}

            <Helmet>

                <title>Connexion | PetFoster Connect</title>
                <meta
                    name="description"
                    content="PetFosterConnect permet de mettre en relation des familles d’accueil pour les animaux et des associations de protection animale en 
                    accueillant des animaux en attendant leur adoption définitive afin de leur offrir une meilleure vie."
                />


            </Helmet>

            {/*<!-- Utilisation du header --> */}

            <Header />

            <main className="container">

                <h1 className="main__title">Connexion</h1>

                <form className="form__connexion" onSubmit={handleLogin}>

                    {/*<!-- Input email --> */}

                    <InputWithLabel id="email" classNameLabel="label form-label" classNameInput="input form-control"
                                    type="email" name="email" ariaLabel="Votre email" placeholder={"Votre email"}
                                    text={"Votre email *"} />

                    {/*<!-- Input mot de passe --> */}

                    <PasswordInput
                        classNameInput="input__password input"
                        name="password"
                        label="Votre mot de passe *"
                    />

                    <p className="form__forgetpassword">Mot de passe oublié ?</p>

                    {/*<!-- Utilisation du component SubmitConnexion --> */}

                    <button
                        type="submit"
                        className="btn"
                        aria-label="Se connecter"
                    >
                        Se connecter
                    </button>
                    {error ? <Error error={error!} /> : null}
                    {isLoading ? <Loading /> : null}
                </form>

            </main>

            {/*<!-- Utilisation du component Footer --> */}

            <Footer />

        </>
    );
};

export default Connexion;