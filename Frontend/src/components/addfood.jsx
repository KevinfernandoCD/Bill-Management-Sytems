import React from 'react';
import '../styles/addfood.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {useToasts} from 'react-toast-notifications';
import { Alert, CircularProgress } from '@mui/material';
import {Rings} from 'react-loader-spinner';

      let newAmmount 

const AddFood = () => {

  const [categories,setCategories] = useState();
  const [name,setName] = useState('');
  const [cata,setCata] = useState('');
  const [price,setPrice] = useState('0.00');
  const [discountPer,setDiscountPer] = useState(0);
  const [discountAmmount,setDiscountAmmount] = useState(0);
  const [calPrice,setCalPrice] = useState(0);
  const [image,setImage] = useState('https://cdn1.vectorstock.com/i/thumb-large/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg')
  const [loading,setLoading] = useState(false);
  const [desc,setDesc] = useState('');
  const [errors,setErrors] = useState([]);
  const [loader,setLoader] = useState(false);
  const {addToast} = useToasts();
//console.log(`name: Price Value : ${price} Type : ${typeof(price)}`)

//console.log(`name: DiscountPer Value : ${discountPer} Type : ${typeof(discountPer)}`)

//console.log(`name: calPrice Value : ${calPrice} Type : ${typeof(calPrice)}`)

      const history = useNavigate();

      const goBack = () => {

        history('/mf');
    }
  

    const getCategories = async () => {

      const userlogged = JSON.parse(localStorage.getItem("user"));

      const config = {

          headers:{

                authorization:`Bearer ${userlogged.token}`,

            },
        }

      const {data} = await axios.get('http://localhost:5000/api/categories/allcategories',config);

      setCategories(data);

    }

   /* const discountChange = async (e) =>{


      setDiscountPer(e.target.value);

      const calcPrice = parseInt(price)*parseInt(discountPer)/100

      setDiscountAmmount(calcPrice);

      setPrice(price - calcPrice)


    }*/
     const postImage = async (pic) => {
    
     if((pic.type === "image/jpeg") || (pic.type === "image/png")) {

  try {

      setLoader(true);

    const data = new FormData();
    data.append("file",pic);
    data.append("upload_preset","ClickLab")
    data.append("cloud_name",'wqfda-sdfsafafafaeadqwewqwe')

     fetch("https://api.cloudinary.com/v1_1/wqfda-sdfsafafafaeadqwewqwe/image/upload",{method:"post",body:data})

    .then(res => res.json())

     .then(data => {

      setLoader(false);

      setImage(data.url.toString());

      return

     });

    }catch(err) {

      console.log(err.message);

     setLoader(false);

    }

  }
    
}

    const getDiscount = () => {

      const newDiscount = price*discountPer/100

      setDiscountAmmount(newDiscount.toFixed(2));

      const reducedPrice = price - newDiscount

      setCalPrice(reducedPrice.toFixed(2));

    }

    useEffect(() => {

    getDiscount();

    },[discountPer,price]);


    useEffect(() => {

      getCategories();

    },[history]);

    const submit = async () => {

      setLoading(true)


      if(name == "" || desc == "" || price == 0 ){

         setLoading(false)

        if(!errors.includes('Please fill all the fields')){


        return setErrors([...errors,'Please fill all the fields']);


        }

       

    }

      
        if(desc.length < 50){

           setLoading(false)

           if(!errors.includes('The description is too short')){


        return setErrors([...errors,'The description is too short']);


        }

   
    
     }


     try {

        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.token}`,

            },
        }
        
        const mordified = name.charAt(0).toUpperCase() + name.slice(1);

        const {data} = await axios.post('http://localhost:5000/api/foods/addnewfood',{name:mordified,image:image,category:cata,price:price,discountper:discountPer,discountammount:discountAmmount,newprice:calPrice,desc:desc},config)

        console.log(data);

        addToast(`New Food Item "${mordified}" Has been Added`,{autoDismiss:true})

        history('/mf');

        setLoading(false);

        return
   
     } catch (error) {

      setLoading(false)

      console.log(error);

      if(!errors.includes('Food item already exists')){

      return setErrors([...errors,'Food item already exists']);

    }

  }

}
 
const characterCheck = (e) => {

if(e.keyCode === 189 || e.keyCode === 187){

  e.preventDefault();
}

if((discountPer.length == 1) && (e.keyCode === 8)){

  e.preventDefault();
  setDiscountPer(0);
}

if((discountPer == 0) && (e.keyCode === 8)){

  e.preventDefault();

}

}

    return (<div className='food-div'>
      <i onClick={goBack} className="fa-solid fa-angles-left goback-btn"></i>
      <h3>New Food Item</h3>
      <p>Add a new food item</p>
      <div className='error'>
    {errors.length !== 0?errors.map((err,index) => (<Alert key={index} variant="filled" severity="error">{err}</Alert>)):null}
      </div>
    <form action="" className='newfood-form'>
      <div className='form-control'>
        {loader? <Rings color='black'/>:
          <div className='food-image-div'>
         <img src={image} alt='food image'/>
          <label htmlFor='food-image' className={errors.length == 0?'image-icon':'image-icon-errors'}><i className="fas fa-camera"></i></label>
         <input onChange={(e) => postImage(e.target.files[0])} type="file" id='food-image' style={{display:"none"}} />
        </div>} 
      </div>
       <div className='form-control'>
       <label htmlFor="food-name">Name</label>
        <input placeholder="What's it called...?" value={name} onChange={(e) => setName(e.target.value)} autoComplete='off' type="text" id='food-name' />
      </div>
        <div className='form-control'>
       <label htmlFor="category">Category</label>
        <select id='category' onChange={(e) => setCata(e.target.value)}   >
          {categories? categories.map(category => <option key={category._id}>{category.categoryname}</option>):'No categories available'}
        </select>
      </div>
       <div className='form-control'>
       <label htmlFor="price">Price (LKR)</label>
        <input placeholder='Rs.'  value={price} onChange={(e) => setPrice(e.target.value)} autoComplete='off' type="number" id='price' />
      </div>
       <div className='form-control'>
       <label htmlFor="discounts">Discount Persantage</label>
        <input disabled={price == 0} value={discountPer} onChange={(e) => setDiscountPer(e.target.value)} onKeyDown={characterCheck} type="number" id='discounts' />%
      </div>
        <div className='form-control'>
       <label htmlFor="discounts">Discount Ammount</label>
        <input  disabled value={discountAmmount} type="number" id='discounts-ammount' />
      </div>
      <div className='form-control'>
       <label htmlFor="discounts">Price After Discount</label>
        <input disabled value={calPrice} onChange={(e) => setCalPrice(e.target.value)} type="number" id='new-price' />
      </div>  
       <div className='form-control'>
       <label htmlFor="food-desc">Description</label>
        <textarea cols="20" rows="10" wrap="hard"  maxLength={250} placeholder="Item description..."  value={desc} onChange={(e) => setDesc(e.target.value)} autoComplete='off' type="text" id='food-desc' ></textarea>
      </div>
    </form>
   <button onClick={submit} className='add-btn'>{loading?<CircularProgress size={20}/>:'Add'}</button>
  </div>  
    
  );

}
 
export default AddFood;