import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/login.css';
import logo from '../images/logo.jpg';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useState,useEffect } from 'react';
import { Alert } from '@mui/material';
import {TailSpin} from 'react-loader-spinner';


const Login = () => {

    

    const [errors,setErrors] = useState([]);
    const[username,setUsername] = useState('');
    const[ password,setPassword] = useState('');
    const[loader,setLoader] = useState(false);
    const [seePassword,setSeePassword] = useState(false);

    const history = useNavigate();


    useEffect(() => {

       const user =  JSON.parse(localStorage.getItem("user"));

       if(user){

        history('/home');

       }


    },[history])

   

    const login = async (e) => {

        e.preventDefault();

        setLoader(true)

            if(password === "" || username == "") {

            if(!errors.includes("Please fill all the feilds")){

                
            setErrors([...errors,"Please fill all the feilds"]);

           }

            setLoader(false);
       
        }


        try {

            const {data} = await axios.post('http://localhost:5000/api/users/login',{username:username,password:password});

            console.log(data);

            localStorage.setItem("user",JSON.stringify(data));

            history('/home');
            
            
        } catch (error) {

            if(username !== "" || password !== "") {


                if(!errors.includes("Invalid username or password")){
                
                    setErrors([...errors,"Invalid username or password"]);

                }

                 setLoader(false)

            }
            

            
        }

       
    }

    return ( 
        <div className='main-div'>
            <div className='styling-div'></div>
            <div className='styling-div'></div>
            
            <div className='logo'>
                <img src={logo}/>
            </div>

            <p className='moto'>Great taste</p>
            <p className='date'>Since 1902</p>

            <div className='content'>
                <h3>Login</h3>

                <div className='errors'>

                    {errors.length !== 0?errors.map((error,index) => <Alert key={index}severity="error">{error}</Alert>):null}
            
                </div>
                <form>
                    <label className='tag' htmlFor='username'>Username</label>
                    <input className='logininputs' type="text" id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                     <label className='tag' htmlFor='password'>Password</label>
                      <input className='logininputs' type={seePassword?'text':'password'} id='password' value={password} onChange={(e) => setPassword(e.target.value)}  />
                      {seePassword?<i className="fa-solid fa-eye-slash eye-icon" onClick={() => setSeePassword(!seePassword)}></i>:<i className="fa fa-eye eye-icon" onClick={() => setSeePassword(!seePassword)} aria-hidden="true"></i>}
                    <button disabled={loader} onClick={login} type='submit' className="submit">Login</button>
                    {loader?<TailSpin color='black'/>:null}
                    <Link  className='link-signup' to="/signup">Create account</Link>
                </form>
            </div>
        </div>
    );
}
 
export default Login;