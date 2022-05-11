import React from 'react';
import '../styles/header.css';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import {useState,useEffect} from 'react';
import { useData } from './context';
import { Button, Tooltip } from '@mui/material';


const Header = ({children}) => {

    const [loggesuser,setLoggedUser] = useState();

    const {theme,setTheme,toggleTheme} = useData();


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user'));

        setLoggedUser(user)

    },[]);

    return ( 
    <>
    <header className='header'>
        <nav className='navbar'>
            <ul>
                <li><div className='useracc'>
                    <img src={loggesuser?.image} className='user-img'/>
                    <div className='info'>
                        <h5>{loggesuser?.username}</h5>
                        <small>{`${loggesuser?.firstname} ${loggesuser?.lastname}`}</small>
                    </div>  
                    </div>
                </li>
                <li><Tooltip title={theme == 'light'?'Dark Theme':'Light Theme'}><button onClick={toggleTheme} className='theme' variant="outlined">{theme === 'dark'? <i className="fas fa-sun"></i>:<i className="fas fa-moon"></i>}</button></Tooltip>
              </li>
            </ul>
        </nav>
    </header>

    {children}
    
    </> );
}
 
export default Header;