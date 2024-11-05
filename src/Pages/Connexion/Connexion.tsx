    {/*<!-- Imports --> */}

import { Helmet } from 'react-helmet-async';
import './Connexion.scss';
import Header from '../../Components/Header/Header';
import PasswordInput from '../../Components/PasswordInput/PasswordInput';
import SubmitConnexion from '../../Components/SubmitConnexion/SubmitConnexion';
import InputWithLabel from '../../Components/InputWithLabel/InputWithLabel';
import { FormEvent } from 'react'; 
import Footer from '../../Components/Footer/Footer';
import { useState } from 'react';

const Connexion = () => {

   {/*<!-- Utilisation des Usestate --> */}

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async(event: FormEvent<HTMLFormElement>) => {

    {/*<!-- Éviter le rechargement du formulaire --> */}
                    
        event.preventDefault(); 

     {/*<!-- Remettre l'error à null --> */}

     setError(null);

    {/*<!-- Appel à l'API --> */}

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/connexion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const error = await response.json()
                setError(error.message);
                return 
            }

            const data = await response.json();

            console.log("Connexion réussie", data);

        } catch (err) {
            console.error("Erreur de connexion :", err);
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

            <main className='container'>

            <h1 className='main__title'>Connexion</h1>

            <div className='form__connexion'>

                <form method='post' action="">

        {error && <p className="form__error">{error}</p>}

              {/*<!-- Input email --> */}   

              <InputWithLabel id="email" classNameLabel='form__connexion__label form-label' classNameInput='form__connexion_input form-control' type="email" name="email" ariaLabel='Votre email' placeholder={"Votre email"} text={"Votre email :"} value={email}
            onChange={(e) => setEmail(e.target.value)} />

            {/*<!-- Input mot de passe --> */}   

                     <PasswordInput label="Votre mot de passe :" password={password} setPassword={setPassword} />

                    <p className='form__forgetpassword'>Mot de passe oublié ?</p>

                    {/*<!-- Utilisation du component SubmitConnexion --> */}

                    <SubmitConnexion onClick={handleLogin} />

                </form>
            </div>

            </main>
        
            {/*<!-- Utilisation du component Footer --> */}

            <Footer />

        </>
    );  
};

export default Connexion;