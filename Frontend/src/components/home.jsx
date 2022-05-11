import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import '../styles/home.css';

const Home = () => {

    const history =  useNavigate();

    useEffect(()=>{

       const loggedUser =  JSON.parse(localStorage.getItem("user"));

       if(!loggedUser) {

        history('/')

       }

    })

    return (

        <div className='portfolio-box'>

<Link to='/fnb' className="categories cata1"><p>Food and Billing</p></Link>
         
<Link to='/um' className="categories cata2"><p>Reports</p></Link>
            
<Link to='/mf' className="categories third cata3"><p>Manage Foods</p></Link>

        </div>
    )

}
 
export default Home;