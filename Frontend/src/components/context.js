
import axios from 'axios';
import React from 'react';
import { createContext,useState,useContext,useReducer } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DataContext = createContext();

export const DataProvider = ({children}) => {

     const[theme,setTheme] = useState('light');

     const[selectedCategory,setSelectedCategory] = useState("");

     const[categories,setCategories] = useState([]);

     const [billcart,setBillCart] = useState([]);

     const [bill,setBill] = useState();

     const [cashbill,setCashbill] = useState();

     const [bills,setBills] = useState([]);

     const filter = (state,action) => {

      switch(action.type) {

      case "DAILY":

      const today = new Date();

      let currentDay = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`
      let fourthDay = `${today.getMonth() + 1}/${today.getDate() - 1}/${today.getFullYear()}`
      let thirdDay = `${today.getMonth() + 1}/${today.getDate() - 2}/${today.getFullYear()}`
      let secondDay = `${today.getMonth() + 1}/${today.getDate() - 3}/${today.getFullYear()}`
      let firstDay = `${today.getMonth() + 1}/${today.getDate() - 4}/${today.getFullYear()}`

     let currentDayValue = bills.filter(i => i.billdate == currentDay).reduce((a,i) => {

    return a + i.nettotal

    },0)

     let fourthDayValue = bills.filter(i => i.billdate == fourthDay).reduce((a,i) => {

    return a + i.nettotal

    },0)

     let thirdDayValue = bills.filter(i => i.billdate == thirdDay).reduce((a,i) => {

    return a + i.nettotal

    },0)

    let secondDayValue = bills.filter(i => i.billdate == secondDay).reduce((a,i) => {

    return a + i.nettotal

    },0)

    let firstDayValue = bills.filter(i => i.billdate == firstDay).reduce((a,i) => {

    return a + i.nettotal

    },0)

    if(today.getDate() < 5){

        return {
      labels:[secondDay,thirdDay,fourthDay,currentDay],
      datasets:[{ 
        label:"Sales",
        data:[secondDayValue,thirdDayValue,fourthDayValue,currentDayValue],
        backgroundColor:['orange','rgb(80, 47, 190)','rgba(200, 35, 76)'],
      
      }]

    }
    }else{

        return {
      labels:[firstDay,secondDay,thirdDay,fourthDay,currentDay],
      datasets:[{ 
        label:"Sales",
        data:[firstDayValue,secondDayValue,thirdDayValue,fourthDayValue,currentDayValue],
        backgroundColor:['orange','black'],
    
      }]
    }
    }

    case "MONTHLY":

      default:

        return state

      }

    }

    const[state,dispatch] = useReducer(filter,[]);

     const history = useNavigate();

   

     useEffect(()=>{

      getAllCategories();

     },[history]);

  
     const getAllCategories = async() => {

      try {

        const userlogged = JSON.parse(localStorage.getItem("user"));

         const config = {

            headers:{

                authorization:`Bearer ${userlogged.token}`,

            },
        }

          const {data} = await axios.get('http://localhost:5000/api/categories/allcategories',config);

          console.log(data)

          setCategories(data);
        
      } catch (error) {

        if(error.response.data.message == "No categories"){

          setCategories("No Categories Available")

        }else{

          console.log(error);


        }
        
      }

    }

     
  const toggleTheme = () => {

    theme == 'light'?setTheme('dark'):setTheme('light');

  }

    return (

        <DataContext.Provider value={{theme,setTheme,toggleTheme,selectedCategory,setSelectedCategory,categories,setCategories,billcart,setBillCart,bill,setBill,cashbill,setCashbill,state,dispatch,bills,setBills}}>
            {children}
        </DataContext.Provider>
    );

}

export const useData = () => {

   return useContext(DataContext);

}


