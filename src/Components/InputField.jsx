import React from 'react';
import './InputField.css';
import { useTheme } from '../ThemeContext';
const InputField = ({ placeholder, value, onChange}) => {
    const { isDarkMode } = useTheme();
    return (
        <div className="input-field">
            <input
                className={`input__field-wrapper ${isDarkMode ? 'dark' : 'light'}`}
                type="text" 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default InputField;