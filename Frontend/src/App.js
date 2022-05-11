
import Login from './components/login';
import './App.css';
import {Route,Routes,Navigate} from 'react-router-dom';
import Signup from './components/signup';
import Home from './components/home';
import New from './components/newsignup';
import FoodandBilling from './components/foodandBilling';
import ManageFoods from './components/manageFoods';
import UserManagement from './components/userManagement';
import NewCategory from './components/newcategory';
import Discounts from './components/discounts';
import AddFood from './components/addfood';
import { ThemeProvider } from 'styled-components';
import {useState} from 'react';
import {lightTheme,DarkTheme,GlobalStyles} from './components/themes';
import Header from './components/header';
import { useData } from './components/context';
import DoneBill from './components/paymentsuccess';



function App() {

  const {theme} =  useData();

 // const [theme,setTheme] = useState('light');

  return (

   <ThemeProvider theme={theme == 'light'? lightTheme:DarkTheme}>
     <GlobalStyles/>
    <div className="App">
  <Routes>
      <Route exact path="/"  element={<Login/>} />
      <Route exact path="/signup"  element={<Signup/>} />
      <Route exact path="/home"  element={<Home/>} />
      <Route exact path="/welcome"  element={<New/>} />
      <Route exact path="/fnb"  element={<Header><FoodandBilling/></Header>} />
      <Route exact path="/mf"  element={<Header><ManageFoods/></Header>} />
      <Route exact path="/um"  element={<Header><UserManagement/></Header>} />
      <Route exact path="/addcategory"  element={<Header><NewCategory/></Header>} />
      <Route exact path="/addfood"  element={<Header><AddFood/></Header>} />
      <Route exact path="/discount/:id"  element={<Header><Discounts/></Header>} />
      <Route exact path="/bill/:id"  element={<Header><DoneBill/></Header>} />
  </Routes>
  </div>
  </ThemeProvider>

  );
}

export default App;
