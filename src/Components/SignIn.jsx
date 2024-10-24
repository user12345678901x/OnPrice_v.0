import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../assets/arrow.svg';
import './SignIn.css'; 
import AddPicture from '../assets/AddPicture.svg';
import InputField from './InputField';

const SignIn = () => {
    const navigate = useNavigate(); 
    const [selectedImage, setSelectedImage] = useState(null); 

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            const imageUrl = URL.createObjectURL(file); 
            setSelectedImage(imageUrl);
        }
    };

    const handleSignIn = () => {
        navigate('/main');
    };

    const handleRegister = () => {
        navigate('/create-account');
    };

    return (
        <div className="EditAdvertWrapper">
            <header className='EditAdvertHeader'>
                <img 
                    src={Arrow} 
                    alt="Back to main" 
                    className="arrow"
                    style={{ cursor: 'pointer' }} 
                />
                <div className="page__title">Создайте аккаунт</div>
            </header>
            <main className="EditAdvertMain">
                <h3 className='EditAdverth3'>Редактор профиля</h3>
                <label htmlFor="file-upload" className="EditAdvertAdd" style={{ cursor: 'pointer' }}>
                    <img className='add-pic' src={AddPicture} alt="Add Picture" />
                </label>
                <input 
                    id="file-upload" 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload} 
                    style={{ display: 'none' }} 
                />
                {selectedImage && <img src={selectedImage} alt="Selected" className="selected-image" />}
                <div className="InputFieldWrapper">
                    <InputField label="Почта" placeholder="Введите почту" />
                    <InputField placeholder="Введите пароль" />
                    <button className="save__info__edit-profile" onClick={handleSignIn}>
                        Войти в аккаунт
                    </button>
                    <button id='green' className="save__info__edit-profile" onClick={handleRegister}>
                        Создать новый аккаунт
                    </button>
                </div>
            </main>
        </div>
    );
}

export default SignIn;