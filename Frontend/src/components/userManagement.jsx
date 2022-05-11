import React from 'react';
import axios from 'axios';
import { useState,useEffect } from 'react';
import {useData} from './context';
import {useNavigate} from 'react-router-dom';
import '../styles/reports.css';
import BarChart from './chart';


const UserManagement = () => {

    const [error,setError] = useState();

    const [fullsub,setFullSub] = useState();

    const [fulldis,setFullDis] = useState();

    const [fullnet,setFullNet] = useState();

    const [selectedMode,setSelectedMod] = useState();

    const {bills,setBills,state,dispatch} = useData();

    const history = useNavigate();

    useEffect(() => {


        getAllBills();

    },[history])


    const getAllBills  = async() => {

        try {

        const userlogged = JSON.parse(localStorage.getItem("user"));

        const config = {

            headers:{

                authorization:`Bearer ${userlogged.token}`
            },
        }

            const {data} = await axios.get('http://localhost:5000/api/billing/allbills',config);

            setBills(data);

            if(data.length !== 0){

                setFullSub(data.reduce((a,i) => {

                    return a + i.subtotal
                },0));

                setFullNet(data.reduce((a,i) => {

                    return a + i.nettotal
                },0));

                setFullDis(data.reduce((a,i) => {

                    return a + i.discounttotal
                },0));

            }
            
        } catch (error) {

            if(error.response.data.message === 'No bills'){

                setError('No Bills Available');

            }else{

                console.log(error)
            }
            
        }
    }

    console.log(bills.reduce((a,i) => {

        return a + i.subtotal

    },0))

    return ( 

    <div className='sales'>
    <div className='sales-filter'>
        <button className='daily' onClick={() => dispatch({type:'DAILY'})}>Daily Sales</button>
        <button className='monthly' onClick={() => dispatch({type:"MONTHLY"})}>Monthly Sales</button>
        <button onClick={() => history('/home')}><i className="fa-solid fa-angles-left back-btn"></i></button>
    </div> 

{state.length !== 0? <div className='display-sales'>
    <div  className="chart">
        <h3>Daily Sales</h3>
     <BarChart chartData={state}/>
     </div>
    </div>:<div className="allsales">
        <h3>Daily Reports</h3>
        <table>
<tr>
<th className='header-table'>Bill ID</th>
<th className='header-table'>Items</th>
<th className='header-table'>Sub-Total</th>
<th className='header-table'>Total Discounts</th>
<th className='header-table'>Net-Total</th>
</tr>
        {bills?.map(b => {
        return <tr key={b._id}>
               <td>{b._id}</td>
               <td>{b.items.map(i => {
             return <div className='item-con'>
                       <div key={i._id}>{i.discountpersantage > 0?`(${i.discountpersantage}%)`: null} {i.name} : {i.newprice} x {i.qty}</div>
                   </div>
               })}</td> 
               <td>LKR.{b.subtotal}</td>
               <td>LKR.{b.discounttotal}</td>
               <td>LKR.{b.nettotal}</td>
           </tr>
        })}
      <tr>
        <td></td>
        <td></td>
        <td className='tot' >LKR.{fullsub}</td>
        <td className='tot'>LKR.{fulldis}</td>
        <td className='tot'>LKR.{fullnet}</td>
        </tr>
      </table>
    </div>
    }
    </div>
  );
}
 
export default UserManagement;