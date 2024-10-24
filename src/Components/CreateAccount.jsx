import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow from '../assets/arrow.svg';
import './CreateAccount.css';
import AddPicture from '../assets/AddPicture.svg';
import InputField from './InputField';

const CreateAccount = () => {
    const navigate = useNavigate(); 
    const [selectedImage, setSelectedImage] = useState(null); 

    const handleImageUpload = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            const imageUrl = URL.createObjectURL(file); 
            setSelectedImage(imageUrl); 
        }
    };

    const handleCreateAccount = () => {
        navigate('/main');
    };

    return (
        <div className='CreateAccountWrapper'>
            <header className='EditAdvertHeader'>
                <img 
                    src={Arrow} 
                    alt="Back to SignIn" 
                    className="arrow"
                    onClick={() => navigate('/signin')}
                    style={{ cursor: 'pointer' }} 
                />
                <div className="page__title">Создайте новый аккаунт</div>
            </header>
            <main className="EditAdvertMain">
                <h3 className='EditAdverth3'>Создание нового аккаунта</h3>
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
                    <InputField label="Имя" placeholder="Введите имя" />
                    <InputField label="Фамилия" placeholder="Введите фамилию" />
                    <InputField label="Имя пользователя" placeholder="Введите имя пользователя" />
                    <InputField label="Почта" placeholder="Введите почту" />
                    <InputField placeholder="Введите пароль" />
                    <button className="save__info__edit-profile" onClick={handleCreateAccount}>
                        Создать аккаунт
                    </button>
                    <button id='green' className="save__info__edit-profile" onClick={() => navigate('/signin')}>
                        Войти в существующий
                    </button>
                </div>
            </main>
        </div>
    );
}

export default CreateAccount;