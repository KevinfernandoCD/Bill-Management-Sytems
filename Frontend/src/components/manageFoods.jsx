import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/managefoods.css';
import {useState,useEffect} from 'react';
import {useData} from './context';
import { useNavigate } from 'react-router-dom';



const ManageFoods = () => {

    const [name,setName] = useState();
    const {theme} = useData();
    const history = useNavigate();

    useEffect(()=>{

        const user = JSON.parse(localStorage.getItem('user'));

        setName(user.username);

    },[])

    return ( 



    <div className='box'>
        <i onClick={() => history('/home',{replace:true})} className="fa-solid fa-angles-left back-btn"></i>
        <h2>{`Welcome ${name}`}</h2>
        <h3>Manage Foods</h3>
        <p>How would you like to manage your food items</p>

        <div className='admin-options'>
            <Link className='golink' to='/addcategory'><div className='admin-option1'><i className="fa fa-list-alt link-icon" aria-hidden="true"></i>New Category <p className='desc'>Add a new food category and add new food items to that category</p></div> </Link>
            <Link className='golink' to='/addfood'><div className='admin-option2'><i className="fa fa-cutlery link-icon" aria-hidden="true"></i>New Food Item <p className='desc'>Add new food items to the menu on a selected category</p></div></Link>
        </div>
    </div>
 

     );
}
 
export default ManageFoods;