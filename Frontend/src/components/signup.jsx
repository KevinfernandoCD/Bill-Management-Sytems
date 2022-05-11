import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import logo from '../images/logo.jpg';
import '../styles/signup.css';
import {TailSpin} from 'react-loader-spinner';
import {Alert, Button, Paper, ThemeProvider} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';




const Signup = () => {


  const [image,setImage] = useState('https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');
  const [loading,setLoading] = useState(false);
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [age,setAge] = useState();
  const [nic,setNic] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [confirm,setConfirm] = useState('');
  const [isAdmin,setIsAdmin] = useState(false);
  const [loader,setLoader] = useState(false);
  const[text,setText] = useState(false);

  const [errors,setErrors] = useState([]);

  const toast = useToast();

  const history  = useNavigate();

      useEffect(() => {

       const user =  JSON.parse(localStorage.getItem("user"));

       if(user){

        history('/home');
        
       }


    },[history])



  const postImage = async (pic) => {
    
     if((pic.type === "image/jpeg") || (pic.type === "image/png")) {

  try {

    setLoading(true);

    const data = new FormData();
    data.append("file",pic);
    data.append("upload_preset","ClickLab")
    data.append("cloud_name",'wqfda-sdfsafafafaeadqwewqwe')

     fetch("https://api.cloudinary.com/v1_1/wqfda-sdfsafafafaeadqwewqwe/image/upload",{method:"post",body:data})

    .then(res => res.json())

     .then(data => {

      setLoading(false)

      setImage(data.url.toString());

      console.log(data.url);
      return

     });

    }catch(err) {

      console.log(err.message);

      setLoading(false);

    }

  }
    
}

  console.log(age)

  const registerUser = async (e) => {

  e.preventDefault();

  setLoader(true);


  if(password !== confirm) {

    if(!errors.includes("The password's does not match")){

      setErrors([...errors,"The password's does not match"]);

    }

    setLoader(false)

  }

  if((nic !== '') && (nic.length !== 10)) {

    if(!errors.includes("Please enter a valid NIC number")) {

      setErrors([...errors,"Please enter a valid NIC number"]);

    }

    setLoader(false)

  }


  if((parseInt(age) > 150)||(parseInt(age) < 0)) {

    console.log("yes")

    if(!errors.includes("Please enter a valid age")) {

      setErrors([...errors,"Please enter a valid age"]);

    }

    setLoader(false)

  }

    if(firstname == "" || lastname == "" || age=="" || password === "" || nic==""||username=="" || confirm == "") {

    if(!errors.includes("Please fill all the fields")) {

       setErrors([...errors,"Please fill all the fields"]);
    
    }

     setLoader(false)

  }

  if((firstname !== "" || lastname !== "" || age !=="" || password !== ""|| nic !==""||username !=="" || confirm !== "") && (password == confirm) && (nic.length == 10) && (0 < age < 150)){

  const {data} = await axios.post('http://localhost:5000/api/users/newuser',{firstname:firstname,lastname:lastname,age:age,nic:nic,username:username,password:password,isAdmin:isAdmin,image:image});

  setLoader(false);

  console.log(data);

  localStorage.setItem("user",JSON.stringify(data));

  history('/welcome',{ replace: true });

  }else{

    
    if((firstname !== "" || lastname !== "" || age !=="" || password !== ""|| nic !==""||username !=="" || confirm !== "") && (password == confirm) && (nic.length == 10) && (0 < parseInt(age)||(150 < parseInt(age)) )){

    setErrors([...errors,"Error:A user must be already signed in with that username or NIC number"]);

    setLoader(false)
    
  }


  }
  

 

}



/*console.log(`firstname ${firstname}`);
console.log(`lastname ${lastname}`)
console.log(`age ${age}`)
console.log(`nic ${nic}`)
console.log(`password ${password}`)
console.log(`confirm ${confirm}`)
console.log(`username ${username}`)
console.log(`image ${image}`)
console.log(`admin ${isAdmin}`)*/


    return ( 
   
    <Paper elevation={3} className='signup-box'>
        <h3>Create Account</h3>
        <p className='branddate'>Become a partner</p>
        <img src={logo} alt="logo" className='brandlogo' />
       <p className='back'>Already have an account</p>
<Link className='login' to='/'>Back to login</Link>

<div className='error-div'>{errors.length !== 0? errors.map(error => (<Alert severity="error">{error}</Alert>)):""}</div>
<form className='signup-form'>

  {loading?<div className="loader"><TailSpin  color='black' /></div>:<div className='userimg'>
    <img src={image} alt="userimage" />
  </div>}


   <div className='controldiv'>
        <label className='signup-tag-select' htmlFor='image'>Select an image</label>
        <input onChange={(e) => postImage(e.target.files[0])}  className='signup-files-input' type="file" id='image' />
    </div>


      

    <div className='controldiv'>
        <label className='signup-tag' htmlFor='firstname'>First Name</label>
        <input className='signup-input' onChange={(e) => setFirstname(e.target.value)} value={firstname} type="text" id='firstname' />
    </div>
      <div className='controldiv'>
        <label className='signup-tag' htmlFor='lastname'>Last Name</label>
        <input className='signup-input' onChange={(e) => setLastname(e.target.value)} value={lastname} type="text" id='lastname' />
    </div>
      <div className='controldiv'>
        <label className='signup-tag' htmlFor='age'>Age</label>
        <input className='signup-input' onChange={(e) => setAge(e.target.value)} value={age}  type="text" id='age' />
    </div>
      <div className='controldiv'>
        <label className='signup-tag' htmlFor='nic'>NIC</label>
        <input className='signup-input' onChange={(e) => setNic(e.target.value)} value={nic}   type="text" id='nic' />
    </div>
       <div className='controldiv'>
        <label className='signup-tag' htmlFor='username'>Username</label>
        <input className='signup-input' onChange={(e) => setUsername(e.target.value)} value={username} type="text" id='username' />
    </div>
      <div className='controldiv'>
        <label className='signup-tag' htmlFor='password'>Password</label>
        <input className='signup-input' onChange={(e) => setPassword(e.target.value)} value={password} type={text?"text":"password"} id='password' />
    </div>
      <div className='controldiv'>
        <label className='signup-tag' htmlFor='confirm'>Confirm password</label>
        <input className='signup-input' onChange={(e) => setConfirm(e.target.value)} value={confirm}   type={text?"text":"password"} id='confirm' />
    </div>
        <div className=' adminpriv'>
        <label className='signup-tag' htmlFor='confirm'>Admin</label>
        <input values={isAdmin} onChange={() => setIsAdmin(!isAdmin)} className='signup-input' type="checkbox" id='confirm' />
    </div>

    

{loader?<button type='submit' disabled onClick={registerUser} className='submit'>Create</button>:<button type='submit' onClick={registerUser} className='submit'>Create</button>}

{loader?<TailSpin color='black' width={25}/>:''}
</form>

{text?<i className="fas fa-eye-slash icon" onClick={() => setText(!text)}></i>:<i className="fa fa-eye icon" aria-hidden="true" onClick={() => setText(!text)}></i>}

    </Paper> 

    
    );
}

 
export default Signup;