import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from './context';
import {useNavigate} from 'react-router-dom';

const Card = ({item,cart}) => {

    const {billcart,setBillCart} = useData();

    const history = useNavigate();


    return ( <div onClick={cart} className={billcart.find(c => c._id == item._id)?'discount-container':item.discountpersantage > 0?'discount-card':'food-card'}>

       {item.discountpersantage > 0?<div className='discount-logo'>{item.discountpersantage}%</div>:null} 

        <img className='image-food' src={item.image} alt={item.name} />


        <div className='food-info'>
            <h4>{item.name}</h4>
            <div className='discount-display'><h5 className={item.discountammount > 0?'price-discount':'price'}>{`LKR.${item.price}`}</h5><h5 className='newprice'>{item.discountammount > 0?`LKR.${item.newprice}`:null}</h5></div>
            <div className='category-display'>Category : {item.category}</div>
            <div className='description' ><p className='para'>{item.desc}</p></div>
            {item.discountpersantage > 0? <button onClick={(e) => history({pathname:`/discount/${item._id}`,search:`?id=${item._id}`})} className='remove-discount'>Edid/Remove Discount</button>:
            <button onClick={() => history({pathname:`/discount/${item._id}`,search:`?id=${item._id}`})} className='add-discount'>Add Discount</button>}
        </div>


    </div> );
}
 
export default Card;