import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import SearchIcon from '../assets/SearchIcon.svg';
import Filter from '../assets/Filter.svg';
import Card from './Card.jsx';
import Home from '../assets/home.svg';
import Plus from '../assets/plus.svg';
import User from '../assets/user.svg';
import { useTheme } from '../ThemeContext';

const MainPage = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [sortMenuVisible, setSortMenuVisible] = useState(false);
    const [sortOption, setSortOption] = useState('');
    const [advertisements, setAdvertisements] = useState([]);
    const [loading, setLoading] = useState(true);

    const PRODUCT_API = 'https://6714904e690bf212c761bbb2.mockapi.io/api/v4/products';

    useEffect(() => {
        const fetchAdvertisements = async () => {
            try {
                const response = await fetch(PRODUCT_API);
                const data = await response.json();
                setAdvertisements(data);
            } catch (error) {
                console.error("Failed to fetch advertisements:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdvertisements();
    }, [PRODUCT_API]);

    const filteredAds = advertisements.filter(ad =>
        ad.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedAds = [...filteredAds].sort((a, b) => {
        if (sortOption === 'price') {
            return a.price - b.price;
        } else if (sortOption === 'date') {
            return new Date(b.date) - new Date(a.date);
        }
        return 0;
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCardClick = (id) => {
        const ad = advertisements.find(ad => ad.id === id);
        navigate(`/detail/${ad.id}`, { state: ad });
    };

    const handleUserIconClick = () => {
        navigate('/profile');
    };

    const toggleSortMenu = () => {
        setSortMenuVisible(!sortMenuVisible);
    };

    const handleSortOptionChange = (option) => {
        setSortOption(option);
        setSortMenuVisible(false);
    };

    // Loader display during fetch operation
    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className={`'_wrapper' ${isDarkMode ? 'dark' : 'light'}`}>
            <header className={`header ${isDarkMode ? 'dark' : 'light'}`}>
                <span className='OnPrice'>On Price</span>
                <div className="searchbar__wrapper">
                    <img src={SearchIcon} alt="Search" className="search__icon" />
                    <input
                        type="text"
                        className="search__input"
                        placeholder='Search listing'
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button className="filter__btn">
                        <img src={Filter} alt="Filter" className="filter__img" />
                    </button>
                </div>
            </header>
            <main className={`main ${isDarkMode ? 'dark' : 'light'}`}>
                <div className={`sortbar ${isDarkMode ? 'dark' : 'light'}`}>
                    <span className='sort__info'>
                        {sortOption === '' ? 'Последние объявления' : `Сортировка по: ${sortOption === 'price' ? 'Цене' : 'Дате'}`}
                    </span>
                    <button className="sort__btn" onClick={toggleSortMenu}>
                        Сортировать по
                    </button>
                    {sortMenuVisible && (
                        <div className="sort__menu">
                            <button onClick={() => handleSortOptionChange('date')}>Сортировать по Дате</button>
                            <button onClick={() => handleSortOptionChange('price')}>Сортировать по Цене</button>
                        </div>
                    )}
                </div>
                <div className="card__container">
                {sortedAds.map(ad => (
                    <Card 
                        key={ad.id} 
                        title={ad.title} 
                        price={`${ad.price}$`} 
                        desc={ad.desc} 
                        image={ad.image} 
                        onClick={() => handleCardClick(ad.id)} 
                    />
                ))}
                </div>
            </main>
            <footer className={`footer ${isDarkMode ? 'dark' : 'light'}`}>
                <img src={Home} alt="Home" className="footer__item" onClick={() => navigate('/main')} style={{ cursor: 'pointer' }} />
                <img 
                    src={Plus} 
                    alt="Add Advert" 
                    className="footer__item" 
                    onClick={() => navigate('/add-advert')} 
                    style={{ cursor: 'pointer' }} 
                />
                <img src={User} alt="User" className="footer__item" onClick={handleUserIconClick} style={{ cursor: 'pointer' }} />
            </footer>
        </div>
    );
};

export default MainPage;