import React from 'react';
import { useState } from 'react';
import { useData } from './context';

const CartItem = ({item}) => {

   const [quantity,setQuantity] = useState(1);

   const {billcart,setBillCart} = useData();

   console.log(billcart,quantity)

   const updateData =  (e,item) =>{

      setQuantity(e.target.value);

      const index = billcart.findIndex(c => c._id == item._id);

     setBillCart(billcart.map(c => {

         if(c._id == item._id){

           return {...c,qty:e.target.value,tot:c.newprice*e.target.value,originaltotal:c.price*e.target.value,distot:c.distot*e.target.value}

         }

         return c

      }))

  
   }

    return ( 

         <div className='food-item'>

                   <input type="number" className="qty" value={quantity}  onChange={(e) => updateData(e,item)}/>
                    <div className='item-control'><h6 className='item-key'>Item name {item.discountpersantage > 0? `(${item.discountpersantage}%)`:null}</h6><h6 className='value'>{item.name}</h6></div>
                    <div className='item-control'><h6 className='item-key'>Price</h6><h6 className='value'>{`LKR.${item.price}`}</h6></div>
                    <div className='item-control'><h6 className='item-key'>Discount </h6><h6 className='value'>{`LKR.${item.discountammount}`}</h6></div>
                    <div className='item-control'><h6 className='item-key'>Total</h6><h6 className='value'>{`LKR.${item.newprice*quantity}`}</h6></div>   
              
            </div>
     );
}
 
export default CartItem;