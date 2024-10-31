import './ModeSwitcher.scss';

import React, { useState } from 'react';

const FamilleForm: React.FC<{
    name: string; 
    address: string; 
    zip_code: string; 
    city: string; 
    phone_number: string; 
    password: string; 
    setName: (value: string) => void; 
    setAddress: (value: string) => void; 
    setZip_Code: (value: string) => void; 
    setCity: (value: string) => void; 
    setPhone_Number: (value: string) => void; 
    setPassword: (value: string) => void; 
}> = ({
    name, 
    address, 
    zip_code, 
    city, 
    phone_number, 
    password, 
    setName, 
    setAddress, 
    setZip_Code, 
    setCity, 
    setPhone_Number, 
    setPassword 
}) => (

    <div>
        <h2 className='form__title'>
            Formulaire d'inscription : Famille
            
        </h2>

        <p className='form__text'>
            Veuillez remplir les informations ci-dessous :
            </p>

        <div className='form__connexion'>

            <form method='post' action="">

                {/* Input name */}

                <label htmlFor="name" className="form__connexion__label">Votre nom</label>
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

                <label htmlFor="address" className="form__connexion__label">Votre adresse</label>
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

                <label htmlFor="zip_code" className="form__connexion__label">Votre code postal</label>
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

                {/* Input city */}

                <label htmlFor="city" className="form__connexion__label">Votre ville</label>
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

                <label htmlFor="phone_number" className="form__connexion__label">Votre numéro de téléphone</label>
                <input 
                    type="text" 
                    className="form__connexion__input"
                    name="phone_number"
                    id="phone_number" 
                    placeholder="Votre numéro de téléphone" 
                    required
                    value={phone_number}
                    onChange={(e) => setPhone_Number(e.target.value)} 
                />

                {/* Input password */}

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

                <label htmlFor="description" className='form__connexion__label'>
                    Votre description 
                    </label>
                <textarea id="description" placeholder='Votre description'>
                </textarea>


            </form>
        </div>
    </div>
);

const AssociationForm: React.FC = () => (
    <div>
        <h2 className='form__title'>Formulaire d'inscription : Association</h2>
        <p className='form__text'>
            Veuillez remplir les informations ci-dessous :
        </p>

        <div className='form__connexion'>
            <form method='post' action="">

                    {/* Input name */}

                    <label htmlFor="name" className="form__connexion__label">Votre nom</label>
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

                <label htmlFor="address" className="form__connexion__label">Votre adresse</label>
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

                <label htmlFor="zip_code" className="form__connexion__label">Votre code postal</label>
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

                {/* Input city */}

                <label htmlFor="city" className="form__connexion__label">Votre ville</label>
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

                <label htmlFor="phone_number" className="form__connexion__label">Votre numéro de téléphone</label>
                <input 
                    type="text" 
                    className="form__connexion__input"
                    name="phone_number"
                    id="phone_number" 
                    placeholder="Votre numéro de téléphone" 
                    required
                    value={phone_number}
                    onChange={(e) => setPhone_Number(e.target.value)} 
                />
            </form>
        </div>
    </div>
);

const ModeSwitcher: React.FC = () => {
    const [mode, setMode] = useState<'famille' | 'association'>('famille');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [zip_code, setZip_Code] = useState('');
    const [city, setCity] = useState('');
    const [phone_number, setPhone_Number] = useState('');
    const [password, setPassword] = useState('');

    const switchMode = () => {
        setMode(prevMode => (prevMode === 'famille' ? 'association' : 'famille'));
        setName('');
        setAddress('');
        setZip_Code('');
        setCity('');
        setPhone_Number('');
        setPassword('');
    };

    return (
        <div>
            <button className='form__button' onClick={switchMode}>
                Changer à : {mode === 'famille' ? 'Association' : 'Famille'}
            </button>

            <div>
                {mode === 'famille' ? (
                    <FamilleForm 
                        name={name} 
                        address={address} 
                        zip_code={zip_code} 
                        city={city} 
                        phone_number={phone_number} 
                        password={password} 
                        setName={setName} 
                        setAddress={setAddress} 
                        setZip_Code={setZip_Code}
                        setCity={setCity}
                        setPhone_Number={setPhone_Number}
                        setPassword={setPassword} 
                    />
                ) : (
                    <AssociationForm />
                )}
            </div>

            <input type="submit" className='btn' value="S'inscrire" />
        </div>
    );
};

export default ModeSwitcher;