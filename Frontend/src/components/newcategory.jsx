import React from 'react';
import { useState } from 'react';
import '../styles/newcategory.css';
import {useNavigate} from 'react-router-dom';
import { Alert } from '@mui/material';
import axios from 'axios';
import {useToasts} from 'react-toast-notifications';



const NewCategory = () => {

    const [name,setName] = useState('');

    const[errors,setErrors] = useState([]);

    const history = useNavigate();

    const {addToast} = useToasts();

    const goBack = () => {

        history('/mf');
    }

    const addCategory = async (e) => {

        e.preventDefault();


        if(name == "") {

            if(!errors.includes('Please enter a category name')){

                setErrors([...errors,"Please enter a category name"]);
            }

        }



       if(name !== '') {

        try {

         const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.token}`,

            },
        }

        const mordified = name.charAt(0).toUpperCase() + name.slice(1);

        const {data}  = await axios.post("http://localhost:5000/api/categories/newcategory",{name:mordified},config);

        console.log(data);

        if(data) {

            addToast(`New Category "${mordified}" Has been Added`,{autoDismiss:true})

            setName('');

            history('/mf');
        }
            
        } catch (error) {


            if(!errors.includes('Category already exists')){

                setErrors([...errors,"Category already exists"]);

            }
            
        }

       
    }
        
}
    return ( 
  
    <div className='intro-box'>
<i onClick={goBack} className="fa-solid fa-angles-left back-btn"></i>
        <h3>New Category</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet qui necessitatibus magni ducimus? Magni cumque doloremque, harum sit itaque fugit. Delectus repellendus quibusdam officiis beatae explicabo maiores rem incidunt cumque dicta. Possimus pariatur quasi exercitationem itaque enim optio. Id quidem perspiciatis cum? Quod expedita quas qui voluptatem consequuntur ex laudantium tempora voluptate. A doloremque quis vitae ratione eaque vero architecto at laborum odit ea! Neque ipsa, ex deserunt voluptas reiciendis aliquid error ipsum? Dolor vitae eligendi ducimus ad consequuntur accusamus ipsum facilis, sequi officiis at inventore? Debitis id exercitationem inventore dolor! Dolor quo exercitationem doloribus delectus, quidem quos iusto nemo!</p>
   <form action="" className='category-name-form'> 
<label className='category-name-label' htmlFor="category-name">Category name</label>
    <input placeholder='Enter a category name...' id='category-name' autoComplete='off' className='category-name' type="text" value={name} onChange={(e) => setName(e.target.value)} />
  <div className='cata-errors'>
      {errors.length !== 0? errors.map(error => <Alert variant="filled" severity="error">{error}</Alert>):null}
  </div>
  <input type="submit" onClick={addCategory} className='create' value='Create' />
   </form>
</div>
);
}
 
export default NewCategory;