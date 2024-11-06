import "./Inscription.scss";
import { Helmet } from "react-helmet-async";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import ModeSwitcher from "../../Components/ModeSwitcher/ModeSwitcher";
import DepartmentInput from "../../Components/DepartmentInput/DepartmentInput";
import PasswordInput from "../../Components/PasswordInput/PasswordInput.tsx";
import InputWithLabel from "../../Components/InputWithLabel/InputWithLabel";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Inscription = () => {

    const [mode, setMode] = useState<"family" | "association">("family");

    const navigate = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const data = new FormData(form);
        data.append("role", mode);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/register/${mode}`, {
                method: "POST",
                body: data,
            });

            if (!response.ok) {
                const error = await response.json();
                console.log(error);
                return;
            }

            const responseData = await response.json();
           
            navigate("/");
        } catch (error) {
            console.error("Erreur de requête:", error);
        } finally {

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
                <ModeSwitcher mode={mode} setMode={setMode}
                              text={mode === "famille" ? `Association ? Cliquez ici` : "Famille ? Cliquez ici"} />
                <h2 className="form__title">Formulaire d'inscription
                    : {mode === "famille" ? "Famille" : "Association"}</h2>

            </div>

            <form encType="multipart/form-data" className="form__register" onSubmit={handleSubmit}>

                {/* Input name */}

                <InputWithLabel id="name" classNameLabel="form__name form-label"
                                classNameInput="form__connexion_input form-control" type="text" name="name"
                                ariaLabel="Votre nom"
                                placeholder={"Votre nom"} text={"Votre nom  *"} />

                {/* Input address */}

                <InputWithLabel id="address" classNameLabel="form__address form-label"
                                classNameInput="form__connexion_input form-control" type="text" name="address"
                                ariaLabel="Votre adresse"
                                placeholder={"Votre adresse"} text={"Votre adresse  *"} />

                {/* Input city */}

                <InputWithLabel id="city" classNameLabel="form__city form-label"
                                classNameInput="form__connexion_input form-control" type="text" name="city"
                                ariaLabel="Votre ville"
                                placeholder={"Votre ville"} text={"Votre ville  *"} />

                {/* Input zip_code */}

                <InputWithLabel id="zip_code" classNameLabel="form__zipcode form-label"
                                classNameInput="form__connexion_input form-control" type="text" name="zip_code"
                                ariaLabel="Votre code postal"
                                placeholder={"Votre code postal"} text={"Votre code postal  *"} />

                <DepartmentInput />

                {/* Input Phone Number */}

                <InputWithLabel id="phone_number" classNameLabel="form__number form-label"
                                classNameInput="form__connexion_input form-control" type="text" name="phone_number"
                                ariaLabel="Votre numéro de téléphone"
                                placeholder={"Votre numéro de téléphone"} text={"Votre numéro de téléphone  *"} />

                {/* Input Phone Number */}

                <InputWithLabel id="email" classNameLabel="form__email form-label"
                                classNameInput="form__connexion_input form-control" type="email" name="email"
                                ariaLabel="Votre adresse mail"
                                placeholder={"Votre adresse mail"} text={"Votre adresse mail  *"} />

                {/* Input password */}
                <PasswordInput
                    name="password"
                    label="Votre mot de passe *"
                    classNameLabel="form__password"
                />
                <PasswordInput
                    name="confirmPassword"
                    label="Votre mot de passe (confirmation) *"
                    classNameLabel="form__passwordconfirm"
                />
                {/* File Input */}

                <InputWithLabel id="file" classNameLabel="form__file form-label"
                                classNameInput="form__connexion_input form-control" type="file" name="form__image"
                                ariaLabel="Votre numéro de téléphone"
                                placeholder={"Votre photo de profil"} text={"Votre photo de profil"}
                                accept=".png, .jpeg, .webp, .jpg" />

                {/* Error message */}

                {/*{errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}*/}

                {/* Input description */}

                <label htmlFor="description" className="form__description form-label">
                    <textarea
                        id="description"
                        className="form__description form-control"
                        placeholder="Votre description"
                        name="description"
                        rows={8}
                        cols={30}
                    ></textarea>

                    Votre description</label>


                {/* Submit Button */}

                <button type="submit" className="btn btn__form--grid">S'inscrire</button>
            </form>

            <Footer />
        </>

    );
};

export default Inscription;