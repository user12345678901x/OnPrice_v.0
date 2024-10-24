import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../ThemeContext';
import productImg from '../assets/productImg.png';
import Arrow from '../assets/arrow.svg';
import './DetailView.css';

const DetailView = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    const { title, desc, price } = location.state || { title: '', desc: '', price: '' };

    const handleArrowClick = () => {
        navigate('/main');
    };

    const handleCallClick = () => {
        window.open('tel:+99365444444');
    };

    return (
        <div className={`DetailViewWrapper ${isDarkMode ? 'dark' : 'light'}`}>
            <header className={`DetailViewHeader ${isDarkMode ? 'dark' : ''}`}>
                <img 
                    src={Arrow} 
                    alt="Back to main" 
                    className="arrowd" 
                    onClick={handleArrowClick}
                    style={{ cursor: 'pointer' }}
                />
                <div className={`product__title ${isDarkMode ? 'dark' : ''}`}>{title}</div>
            </header>
            <main className={`DetailViewMain ${isDarkMode ? 'dark' : ''}`}>
                <div className={`DetailViewMainWrapper ${isDarkMode ? 'dark' : ''}`}>
                    <img src={productImg} alt="" className="ProductImage" />
                    <div className={`product__description ${isDarkMode ? 'dark' : ''}`}>
                        <span className={`product__title ${isDarkMode ? 'dark' : ''}`}>{title}</span>
                        <span className={`product__price ${isDarkMode ? 'dark' : ''}`}>{price}</span>
                        <div className={`about__wrapper ${isDarkMode ? 'dark' : ''}`}>
                            <h3>About</h3>
                            <p className={`about__product ${isDarkMode ? 'dark' : ''}`}>{desc}</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className={`DetailViewFooter ${isDarkMode ? 'dark' : ''}`}>
                <button className="call__btn" onClick={handleCallClick}>
                    Позвонить
                </button>
            </footer>
        </div>
    );
};

export default DetailView;