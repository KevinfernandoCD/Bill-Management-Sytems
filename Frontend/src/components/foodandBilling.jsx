import React from 'react';
import { useEffect,useState } from 'react';
import '../styles/foodbilling.css';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {Rings,TailSpin} from 'react-loader-spinner';
import { useData } from './context';
import Category from './category';
import Card from './card';
import CartItem from './cart';


const FoodandBilling = () => {

    const [foods,setFoods] = useState([]);
    const [loader,setLoader] = useState(true);
    const [search,setSearch] = useState("");
    const [loading,setLoading] = useState(false);
    const [cash,setCash] = useState('0.00');
    const[fullTot,setFullTot] = useState();
    const[fullDiscount,setFullDiscount] = useState();
    const[fullNetTotal,setFullNetTotal] = useState();
    const[balance,setBalance] = useState();
    
    const {setSelectedCategory,selectedCategory,categories,setCategories,setBillCart,billcart,bill,setBill,cashbill,setCashbill} = useData();

    console.log(billcart)

    const history = useNavigate();

    const getFoods = async() => {

     setLoading(true)

    try {

        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers: {

                authorization:`Bearer ${userlogged.token}`,

            },
        }


    const {data} =  await axios.post('http://localhost:5000/api/foods/allfoods',{category:selectedCategory,serach:search},config);
       
    setFoods(data);

    setLoader(false);

    setLoading(false)


            
    }catch(error) {

        if(error.response.data.message == "No food items available") {

            setFoods('No food items available');
            setLoader(false);
            setLoading(false);
            
  

        }else{

            console.log(error);
             setLoader(false);
             setLoading(false);
             
    
        }
            
    }

}

useEffect(() => {

setTimeout(() => {

getFoods();

},1500);

},[selectedCategory,search]);


    useEffect(() => {

        UpdateCart();

    },[billcart]);

    useEffect(() => {

        Balance();

    },[cash,billcart])


    const reset = () => {

        setSelectedCategory('');

        setSearch('');
    }

    const inCart = (e,item) => {

if((e.target.className !== "add-discount") && (e.target.className !== "remove-discount")){

     if(!billcart.includes(item)) {

       const isItem =  billcart.find(c => c._id == item._id);

        if(!isItem) {

        setBillCart([...billcart,{...item,qty:1,tot:item.newprice,distot:item.discountammount,originaltotal:item.price}])



          
        }else {


        setBillCart(billcart.filter(cart => cart._id !== item._id)); 


        }     
    
    }

}

    
}

const Balance = () => {

    if(cash == 0) {

    setBalance(`0.00`);

    }else {

    const fullNetTot = billcart.reduce((acc,item) => {

        return acc + item.tot

    },0)

    const bal  =   cash - fullNetTot

    setBalance(bal);

    }

}

const UpdateCart = () => {

    
    setFullTot(billcart.reduce((acc,item) => {

        return acc + item.originaltotal

    },0));

     setFullDiscount(billcart.reduce((acc,item) => {

        return acc + item.distot

    },0));
     setFullNetTotal(billcart.reduce((acc,item) => {

        return acc + item.tot

    },0));

}

const paybill = async() => {

  try {

       const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                "Content-Type":"application/json",
                authorization:`Bearer ${userlogged.token}`,

            },
        }

        const today = new Date();

        const billDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`

    const {data} = await axios.post('http://localhost:5000/api/billing/newbill',{subtotal:fullTot,nettotal:fullNetTotal,discounttotal:fullDiscount,billdate:billDate,items:JSON.stringify(billcart)},config);

    console.log(data);

    history(`/bill/${data._id}`,{replace:true});

    setBill(billcart);

    setCashbill({cash:cash,balance:balance,subtot:fullTot,nettot:fullNetTotal,distot:fullDiscount})
  
  } catch (error) {


    console.log(error)
      
  }

}

    return ( 

       loader?<div className='loader'><Rings  color='orange'/></div>:
    <div className='container'>   
        <div className='side-bar'> 
        <div className='head-column'><i className="fa fa-list-alt cata-icon" aria-hidden="true"></i><h4 className='heading'>Categories</h4><p className='length'>({categories.length})</p>
        </div><div className='buttons'><i onClick={() => history('/home')}  className="fa-solid fa-angles-left foodsback-btn"></i><button onClick={reset} className='clear'>All</button></div><div className='drawer'>{categories.length !== 0 || categories !== 'No Categories Available'?categories?.map(cata => <Category item={cata}/>):<h3>No Categories Available</h3>}</div></div>

        <div className='main-content'>
        
            <div className='head-column-foods'><i  className="fa-solid fa-bowl-food cata-icon"></i><h4 className='heading-food'>Foods</h4><p className='length'>({foods !== 'No food items available'?foods.length:'0'})</p></div>
            <div className='search-div'><input type="text" className='search' placeholder='Search food...' value={search} onChange={(e) => setSearch(e.target.value)}/></div>
            {loading?<div className='tailspin'><TailSpin color='orange' /></div>:foods !== 'No food items available'?<div className='display-foods'>{foods?.map(food => <Card cart={(e) => inCart(e,food)} item={food} />)}</div>:<h3 className='no-food'>No food items available</h3>}
            </div>
        
        <div className='billing-div'>
            <div className='bill-header'>
                <h3>Billing Cart</h3>
            </div>
            <div className='bil-cart'>    
              {billcart?.map(cart => <CartItem item={cart}/>  )}
            </div>

            <div className='net-tot'>
           <div className='net-control'>
                <h6>Sub-Total : </h6><h6>{`LKR.${fullTot}`}</h6>
           </div> 
            <div className='net-control'>
                <h6>Total-Discount: </h6><h6>{`LKR.${fullDiscount}`}</h6>
           </div> 
            <div className='net-control'>
                <h6>Net-Total : </h6><h6>{`LKR.${fullNetTotal}`}</h6>
           </div> 
            <div className='last-control'>
                <h6>Cash-Paid (LKR)</h6><input disabled={fullNetTotal == 0} type="number" value={cash} onChange={(e) => setCash(e.target.value)} className='cash'  />
           </div> 
            <div className='last-control no-border'>
                <h6>Balance</h6><input value={balance} disabled type="text" className={balance == 0?'balance':balance < 0? 'balance balance-neg':'balance balance-pos'} />
           </div>
           <button onClick={paybill} disabled={billcart.length == 0 || balance < 0} className='pay'>Pay</button> 
        </div>
      </div>
    </div> 
    
    );
}
 
export default FoodandBilling;