import { Alert, AlertTitle, Button } from '@mui/material';
import React from 'react';
import '../styles/payment.css';
import { useData } from './context';
import { useNavigate } from 'react-router-dom';
import {useToasts} from 'react-toast-notifications';


const DoneBill = () => {

    const {bill,cashbill,setCashbill,setBill,setBillCart} = useData();

    const history = useNavigate();

    const {addToast} = useToasts();

    

    const restore = () => {

        setBillCart([]);

        setCashbill();

        setBill();

        history('/fnb',{ replace:true});

        addToast(`Payment Complete`,{autoDismiss:true,appearance: 'success'})

    }

    return ( 
    <div className='success-div'>

         <Alert severity="success">
  <AlertTitle>Payment Success</AlertTitle>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem laborum odio quae vitae rerum magni expedita repellat exercitationem deserunt sapiente, rem cumque qui. Velit numquam beatae mollitia commodi voluptate temporibus possimus magni molestias eum repellendus dolorem totam veritatis quibusdam, sapiente fugit delectus ipsum fugiat dicta sit ratione corporis quidem atque!
     <div className='bill'>
         <h3>Thank You</h3>
         <small>Payment Reciept</small>

         <div className='items'>

             {bill.map((b,i) => (

                <div className={i == bill.length - 1?'item-last':'item'}><p>{b.name}</p> <p className='dash'>:</p> <p>{b.price}</p> <p className='x'>x</p> {b.qty} = {b.originaltotal}</div>
             ))}

           <div className='cals'>Sub-Total <p className='col'>:</p> {cashbill.subtot}</div>



           <div className='discounts-items'>
               <p className='head-dis'>Discounts</p>

               <div className='dis-items'>
               {cashbill.distot !== 0? bill.map((b,i) => (

                   b.discountpersantage > 0? <div className={i == bill.length - 1?'item-dis last':'item-dis'}><p>{b.name}</p>({b.discountpersantage}%) <p className='col-dis'>:</p> <p>{b.discountammount}</p> <p className='x'>x</p> <p>{b.qty}</p>  = <p className='distot'>{b.distot}</p></div>:null 

               )):<p>No added discounts</p>}
               
               </div>
              <div className='fulldiscount'> <p>Total Discount Ammount</p> <p className='new-col'>:</p> <p>- {cashbill.distot}</p></div>
              <div className='fulldiscount'> <p>Net-Total</p> <p className='new-col'>:</p> <p>LKR.{cashbill.nettot}.00</p></div>
              <div className='fulldiscount last'> <p>Cash</p> <p className='new-col'>:</p> <p>LKR.{cashbill.cash}</p></div>
              <div className='fulldiscount doubleline'> <p>Balance</p> <p className='new-col'>:</p> <p>LKR.{cashbill.balance}.00</p></div>
           </div>

<div className='end'>---------------------End-Of-Bill-------------------</div>
          


         </div>



    </div>
<div className='buttons-div'>
    <Button className='btn'>Print Bill</Button>
<Button className='btn' onClick={restore}>Done</Button>
</div>
</Alert>





    </div>
   

  );
}
 
export default DoneBill;