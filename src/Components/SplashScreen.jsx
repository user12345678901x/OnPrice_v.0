import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
import Cart from '../assets/Cart.svg';
const SplashScreen = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash-screen ${isVisible ? 'visible' : 'hidden'}`}>
      <img className='cart__img' src={Cart}></img>
      <h1>OnPrice</h1>
    </div>
  );
};

export default SplashScreen;