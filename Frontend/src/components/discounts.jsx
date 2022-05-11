import React from 'react';
import { useState,useEffect } from 'react';
import '../styles/discount.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {useToasts} from 'react-toast-notifications';
import {TailSpin} from 'react-loader-spinner';





const Discounts = () => {

    const [currentPrice,setCurrentPrice] = useState('0.00');
    const [discountPersantage,setDiscountPersantage] = useState(0);
    const [discountAmmount,setDiscountAmmount] = useState('0.00');
    const [newPrice,setNewPrice] = useState('0.00');
    const [foodItem,setFoodItem] = useState();
    const [loader,setLoader] = useState(false);


    const history = useNavigate();

    const {addToast} = useToasts();


    useEffect(() => {

         getAmmountByDiscountPer();

        
    },[discountPersantage,currentPrice])


    const getAmmountByDiscountPer = () => {

    const calPrice = discountPersantage*currentPrice/100

    const newCalPrice = currentPrice - calPrice


   if(newPrice !== newCalPrice){


        setNewPrice(newCalPrice);

    }

        setDiscountAmmount(calPrice);
 
}

    useEffect(() => {

        getAmmountByDiscountAmmount();

    },[newPrice,currentPrice]);


    useEffect(() => {

           const params = new Proxy(new URLSearchParams(window.location.search), {

           get: (searchParams, prop) => searchParams.get(prop),
    });


        getFoodItem(params.id)


    },[]);


       const getFoodItem = async(id) => {

        try {

        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.token}`,

            },

        }

        const {data} = await axios.post('http://localhost:5000/api/foods/findfood',{id:id},config);

        setFoodItem(data);
        setCurrentPrice(data.price);
        setDiscountPersantage(data.discountpersantage);
        setDiscountAmmount(data.discountammount);
        setNewPrice(data.newprice);
;

            
        } catch (error) {

        console.log(error);
            
        }

    }


    const getAmmountByDiscountAmmount = () => {


    
        const reducedPrice = currentPrice - newPrice

        const newPersantage = reducedPrice/currentPrice*100

        if(discountPersantage !== newPersantage) {

        setDiscountPersantage(newPersantage)
         
        }

    }
    useEffect(()=>{

     
if(discountPersantage !== 0){

              
        getPersantageFromAmmount();

}


},[discountAmmount,currentPrice])

    const getPersantageFromAmmount = () => {


        const typedDiscountAmmount = currentPrice - discountAmmount

        console.log(typedDiscountAmmount)

        if(newPrice !== typedDiscountAmmount){


            setNewPrice(typedDiscountAmmount)

        }


    }


    const submitDiscount = async(e) => {

        e.preventDefault();

        setLoader(true)

        try {
    
        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.token}`,


            },
        }

           const params = new Proxy(new URLSearchParams(window.location.search), {

           get: (searchParams, prop) => searchParams.get(prop),

    });

            const {data} = await axios.put(`http://localhost:5000/api/foods/updatediscount/${params.id}`,{discountpersantage:discountPersantage,discountammount:discountAmmount,newprice:newPrice},config)

            history('/fnb');

            setLoader(false);

            return addToast(`Discount Updated for item "id:${params.id}"`,{autoDismiss:true}) 

            
        } catch (error) {

            console.log(error);

            return setLoader(false);
            
        }
  
    }

    return ( <div className='discount-box'>
           <i onClick={() => history('/mf')} className="fa-solid fa-angles-left goback-btn"></i>
        <h2>Discounts %</h2>
        <p>Add/Remove Discounts From Foood Items</p>

        <h3>{foodItem?.name}</h3>

        <div className='img-div'>
            <img src={foodItem?.image} alt="food-image" />
        </div>

        <form action="" className='discount-form'>

            <div className='discount-control'>
            <label htmlFor='current-price'>Current Price (LKR)</label><br />
            <input  type="number" value={currentPrice} onChange={(e) => setCurrentPrice(e.target.value)} id='current-price' />
            </div>
            
            <div className='discount-control'>
            <label htmlFor='discountPersantage'>Discount (%)</label><br />
            <input value={discountPersantage} onChange={(e) => setDiscountPersantage(e.target.value)} type="number" id='discountPersantage' />
            </div>
            
            <div className='discount-control'>
            <label htmlFor='discount-price'>Discount Ammount</label><br />
            <input  value={discountAmmount} onChange={(e) => setDiscountAmmount(e.target.value)} type="number" id='discount-price' />
            </div>
            
            <div className='discount-control'>
            <label htmlFor='new-price'>New Price</label><br />
            <input value={newPrice} onChange={(e) => setNewPrice(e.target.value)} className={newPrice < 0? 'value-neg':null}  type="number" id='new-price' />
            </div>

        {loader?<TailSpin color='black' width={30} />:<button onClick={submitDiscount} type='submit' className='add-discount'>Finish</button>}
        </form>
    </div>);
}
 
export default Discounts;