    {/*<!-- Imports --> */}

import { Helmet } from 'react-helmet-async';
import './Connexion.scss';
import Header from '../../Components/Header/Header';
import SubmitConnexion from '../../Components/SubmitConnexion/SubmitConnexion';
import Footer from '../../Components/Footer/Footer';
import { useState } from 'react';

const Connexion = () => {

   {/*<!-- Utilisation des Usestate --> */}

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async (event) => {

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
                throw new Error('Identifiants invalides'); 
            }

            const data = await response.json();

            console.log("Connexion réussie", data);

        } catch (err) {
            setError(err.message);
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

            <h1 className='main__title'>Connexion</h1>

            <div className='form__connexion'>

                <form method='post' action="">

        {error && <p className="error">{error}</p>}

              {/*<!-- Input email --> */}    

                    <label htmlFor="email" className="form__connexion__label">Votre email</label>
                    <input 
                        type="email" 
                        className="form__connexion__input"
                        name="email"
                        id="email" 
                        placeholder="Votre email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                 {/*<!-- Input mot de passe --> */}   

                    <label htmlFor='password' className="form__connexion__label">Votre mot de passe</label>
                    <input 
                        type="password" 
                        className="form__connexion__input"
                        name="password" 
                        id="password" 
                        placeholder="Votre mot de passe"
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/*<!-- Utilisation du component SubmitConnexion --> */}

                    <SubmitConnexion onClick={handleLogin} />

                </form>
            </div>
        

                    {/*<!-- Utilisation du component Footer --> */}

                     <Footer />

        </>
    );  
};

export default Connexion;