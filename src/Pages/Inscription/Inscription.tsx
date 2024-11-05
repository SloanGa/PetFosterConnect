import styles from './Inscription.module.scss'
import { Helmet } from 'react-helmet-async';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import ModeSwitcher from '../../Components/ModeSwitcher/ModeSwitcher';
import DepartmentInput from '../../Components/DepartmentInput/DepartmentInput';
import PasswordInput from '../../Components/PasswordInput/PasswordInput';
import InputWithLabel from '../../Components/InputWithLabel/InputWithLabel';
import { useState } from 'react';

const Inscription = () => {

    const [mode, setMode] = useState<'famille' | 'association'>('famille');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zip_code, setZip_Code] = useState('');
    // const [department, setDepartment] = useState<number>(0); // Adjusted for number type
    const [city, setCity] = useState('');
    const [phone_number, setPhone_Number] = useState('');
    const [password, setPassword] = useState(''); 
    const [passwordconfirmation, setPasswordConfirmation] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== passwordconfirmation) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return; 
        }

        console.log({ mode, name, address, zip_code, city, phone_number, password, description, file });

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

        <div>

        <h1 className='main__title'>Inscription</h1>
        <ModeSwitcher mode={mode} setMode={setMode} text={mode === "famille" ? `Association ? Cliquez ici` : "Famille ? Cliquez ici"} />
        <h2 className='form__title'>Formulaire d'inscription : {mode === 'famille' ? 'Famille' : 'Association'}</h2>
        </div>
    
        <div className='form__connexion'>

            <form className='form__register' onSubmit={handleSubmit}>

                {/* Input name */}

                <InputWithLabel id="name" classNameLabel='form__connexion__label form-label' classNameInput='form__connexion_input form-control' type="text" name="name" ariaLabel='Votre nom'
                placeholder={"Votre nom"} text={"Votre nom"} />

                {/* Input address */}

                <InputWithLabel id="address" classNameLabel='form__connexion__label form-label' classNameInput='form__connexion_input form-control'type="text" name="address" ariaLabel='Votre adresse'
                placeholder={"Votre adresse"} text={"Votre adresse"} />

                {/* Input zip_code */}

                <InputWithLabel id="zip_code" classNameLabel='form__connexion__label form-label' classNameInput='form__connexion_input form-control' type="text" name="zip_code" ariaLabel='Votre code postal'
                placeholder={"Votre code postal"} text={"Votre code postal"} />

                {/* Input department */}
                <DepartmentInput />

                {/* Input city */}

                <InputWithLabel id="city" classNameLabel='form__connexion__label form-label' classNameInput='form__connexion_input form-control' type="text" name="city" ariaLabel='Votre ville'
                placeholder={"Votre ville"} text={"Votre ville"} />
                
                {/* Input Phone Number */}

                <InputWithLabel id="phone_number" classNameLabel='form__connexion__label form-label' classNameInput='form__connexion_input form-control' type="text" name="phone_number" ariaLabel='Votre numéro de téléphone'
                placeholder={"Votre numéro de téléphone"} text={"Votre numéro de téléphone"} />

                {/* Input password */}

                <PasswordInput 
                    password={password} 
                    setPassword={setPassword} 
                    label="Votre mot de passe *" 
                />
                <PasswordInput 
                    password={passwordconfirmation} 
                    setPassword={setPasswordConfirmation} 
                    label="Votre mot de passe (confirmation) *"
                />

                {/* Error message */}

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                {/* Input description */}

                <label htmlFor="description" className='form__connexion__label'>Votre description *
                
                </label>
                <textarea 
                    id="description" 
                    className='form__connexion__description' 
                    placeholder='Votre description' 
                    name="description" 
                    rows={8} 
                    cols={33}
                    onChange={(e) => setDescription(e.target.value)} 
                ></textarea>

                {/* File Input */}

                <InputWithLabel id="file" classNameLabel='form__connexion__label form-label' classNameInput='form__connexion_input form-control' type="file" name="form__image" ariaLabel='Votre numéro de téléphone'
                placeholder={"Votre photo de profil"} text={"Votre photo de profil"} accept='.png, .jpeg, .webp, .jpg' />

                {/* Submit Button */}

                <button type='submit' className='btn' >S'inscrire</button>
            </form>
        </div>

        <Footer />
        </>
    );
};

export default Inscription;