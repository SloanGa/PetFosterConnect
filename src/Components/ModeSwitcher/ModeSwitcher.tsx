import './ModeSwitcher.scss';
import PasswordInput from '../PasswordInput/PasswordInput';
import React, { useState } from 'react';
import DepartmentInput from '../DepartmentInput/DepartmentInput';

// Formulaire d'inscription

const RegistrationForm: React.FC<{
    mode: 'famille' | 'association';
    name: string; 
    address: string; 
    zip_code: string; 
    city: string; 
    department: number;
    phone_number: string; 
    password: string; 
    passwordconfirmation: string; 
    description: string;
    setName: (value: string) => void; 
    setAddress: (value: string) => void; 
    setZip_Code: (value: string) => void; 
    setCity: (value: string) => void; 
    setDepartment: (value: number) => void; 
    setPhone_Number: (value: string) => void; 
    setPassword: (value: string) => void; 
    setPasswordConfirmation: (value: string) => void; 
    setDescription: (value: string) => void; 
    errorMessage: string; 
    onSubmit: (e: React.FormEvent) => void;
}> = ({
    mode,
    name, 
    address, 
    zip_code, 
    city, 
    department,
    phone_number, 
    password, 
    passwordconfirmation,
    description,
    setName, 
    setAddress, 
    setZip_Code, 
    setCity, 
    setDepartment,
    setPhone_Number, 
    setPassword,
    setPasswordConfirmation,
    setDescription,
    errorMessage, 
    onSubmit,
}) => (
    <div>
        <h2 className='form__title'>Formulaire d'inscription : {mode === 'famille' ? 'Famille' : 'Association'}</h2>
        <p className='form__text'>Veuillez remplir les informations ci-dessous :</p>
        <div className='form__connexion'>
            <form onSubmit={onSubmit}>

                {/* Input name */}

                <label htmlFor="name" className="form__connexion__label">
                    Votre nom * 
                    </label>
                <input 
                    type="text" 
                    className="form__connexion__input"
                    name="name"
                    id="name" 
                    placeholder="Votre nom" 
                    autoFocus
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)} 
                />
                {/* Input address */}

                <label htmlFor="address" className="form__connexion__label">
                    Votre adresse * 
                    </label>
                <input 
                    type="text" 
                    className="form__connexion__input"
                    name="address"
                    id="address" 
                    placeholder="Votre adresse" 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)} 
                />
                {/* Input zip_code */}

                <label htmlFor="zip_code" className="form__connexion__label">
                    Votre code postal * 
                    </label>
                <input 
                    type="text" 
                    className="form__connexion__input"
                    name="zip_code"
                    id="zip_code" 
                    placeholder="Votre code postal" 
                    required
                    value={zip_code}
                    onChange={(e) => setZip_Code(e.target.value)} 
                />

                {/* Input department */}
                <DepartmentInput 
                    department={department}
                    setDepartment={setDepartment} 
                />

                {/* Input city */}

                <label htmlFor="city" className="form__connexion__label">
                    Votre ville *
                    </label>
                <input 
                    type="text" 
                    className="form__connexion__input"
                    name="city"
                    id="city" 
                    placeholder="Votre ville" 
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)} 
                />
                {/* Input Phone Number */}

                <label htmlFor="phone_number" className="form__connexion__label">
                    Votre numéro de téléphone * 
                    </label>
                <input 
                    type="tel" 
                    className="form__connexion__input"
                    name="phone_number"
                    id="phone_number" 
                    placeholder="Votre numéro de téléphone" 
                    required
                    value={phone_number}
                    onChange={(e) => setPhone_Number(e.target.value)} 
                />
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
                    rows="8" 
                    cols="33"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} 
                ></textarea>

                {/* File Input */}

                <label htmlFor="form__image" className='form__connexion__label'>Votre photo de profil </label>
                <input 
                    type="file" 
                    id="form__image" 
                    onChange={(e) => setFile(e.target.files?.[0] || null)} 
                    accept=".png, .jpeg, .webp, .jpg" 
                />

                {/* Submit Button */}

                <input type="submit" className='btn' value="S'inscrire" />
            </form>
        </div>
    </div>
);

// Composant ModeSwitcher
const ModeSwitcher: React.FC = () => {
    const [mode, setMode] = useState<'famille' | 'association'>('famille');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zip_code, setZip_Code] = useState('');
    const [department, setDepartment] = useState<number>(0); // Adjusted for number type
    const [city, setCity] = useState('');
    const [phone_number, setPhone_Number] = useState('');
    const [password, setPassword] = useState(''); 
    const [passwordconfirmation, setPasswordConfirmation] = useState(''); 
    const [errorMessage, setErrorMessage] = useState('');
    const [description, setDescription] = useState('');
    const [isFormVisible, setFormVisible] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const resetForm = () => {
        setName('');
        setAddress('');
        setZip_Code('');
        setDepartment(0);
        setCity('');
        setPhone_Number('');
        setPassword('');
        setPasswordConfirmation('');
        setErrorMessage('');
        setDescription('');
        setFile(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== passwordconfirmation) {
            setErrorMessage("Les mots de passe ne correspondent pas");
            return;
        }

        console.log({ mode, name, address, zip_code, department, city, phone_number, password, description, file });
        resetForm(); // Reset form after submission
        setFormVisible(false); // Hide the form
    };

    return (
        <div className='form__presentation'>
            <button className='form__button' onClick={() => { setMode('famille'); setFormVisible(true); resetForm(); }}>
                Famille
            </button>
            <button className='form__button' onClick={() => { setMode('association'); setFormVisible(true); resetForm(); }}>
                Association
            </button>

            {isFormVisible && (
                <RegistrationForm 
                    mode={mode}
                    name={name} 
                    address={address} 
                    zip_code={zip_code} 
                    department={department}
                    city={city} 
                    phone_number={phone_number} 
                    password={password} 
                    passwordconfirmation={passwordconfirmation} 
                    description={description}
                    setName={setName} 
                    setAddress={setAddress} 
                    setZip_Code={setZip_Code}
                    setCity={setCity}
                    setDepartment={setDepartment} // Adjusted prop name
                    setPhone_Number={setPhone_Number}
                    setPassword={setPassword} 
                    setPasswordConfirmation={setPasswordConfirmation}
                    setDescription={setDescription} 
                    errorMessage={errorMessage}
                    onSubmit={handleSubmit} 
                />
            )}
        </div>
    );
};

export default ModeSwitcher;