import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './Components/MainPage';
import DetailView from './Components/DetailView';
import ProfileView from './Components/ProfileView'; 
import SplashScreen from './Components/SplashScreen';
import EditAdvert from './Components/EditAdvert';
import ViewMyAdvert from './Components/ViewMyAdvert';
import EditProfile from './Components/EditProfile'; 
import SignIn from './Components/SignIn'; 
import CreateAccount from './Components/CreateAccount'; 
import AddAdvert from './Components/AddAdvert';
import './App.css';

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false); 

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        return () => clearTimeout(timer); 
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode); 
        localStorage.setItem('darkMode', newMode); 
    };

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        setIsDarkMode(savedMode);
    }, []);

    return (
        <Router>
            <div className={isDarkMode ? 'dark' : ''}>
                <Routes>
                    <Route path="/" element={isLoading ? <SplashScreen /> : <Navigate to="/signin" replace />} />
                    <Route path="/signin" element={<SignIn toggleDarkMode={toggleDarkMode} />} />
                    <Route path="/create-account" element={<CreateAccount />} /> 
                    <Route path="/main" element={<MainPage />} />
                    <Route path="/detail/:id" element={<DetailView />} />
                    <Route path="/profile" element={<ProfileView toggleDarkMode={toggleDarkMode} />} />
                    <Route path="/edit-profile" element={<EditProfile isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />} />
                    <Route path="/edit-advert/:id" element={<EditAdvert />} />
                    <Route path="/view-my-advert/:id" element={<ViewMyAdvert />} />
                    <Route path="/add-advert" element={<AddAdvert />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;