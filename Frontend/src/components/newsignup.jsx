
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Button, Collapse, IconButton } from '@mui/material';
import '../styles/welcome.css';
import { useState } from 'react';
import { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect } from 'react';
import{useNavigate} from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const New = () => {

   const history = useNavigate();


  useEffect(() => {
    
    const userLogged = JSON.parse(localStorage.getItem("user"));

    if(!userLogged){

      history('/');

    }


  },[history])
 

  const [name,setName] = useState('');
    const classes = useStyles();
  const [open, setOpen] = useState(true);
    return ( <Swiper  modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }}  spaceBetween={10}
      slidesPerView={1}
       className='welcome-div'> <SwiperSlide>
        <Alert  className='alert'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="large"
              onClick={() => {
                setOpen(false);
              }}
            >
            </IconButton>
          }
        >
          <h2>Signup Succenssful</h2>
          <p>{`Welcome ${name} to P&S community we hope you enjoy working with us
          `} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam odit minima reiciendis voluptate earum perferendis? Earum veritatis mollitia doloremque iusto dolore ratione eius eum, officiis aperiam recusandae, enim perferendis sit ipsum architecto, dolorum tempora rerum delectus sunt necessitatibus ut! Nisi incidunt enim rem iste magnam ea harum minima. Dolorum reiciendis minima ea quae soluta delectus, saepe reprehenderit odio, officia veniam facere esse? Velit doloremque labore sint quam numquam vitae non dolores! Nostrum aperiam voluptate reiciendis ad molestiae, accusantium nihil, vero, reprehenderit quos doloribus cumque similique? Quis dignissimos odit, illum velit saepe harum alias laudantium magni, quas soluta, unde est eligendi.</p>
          
        </Alert>
      </SwiperSlide>
      
      <SwiperSlide>
        <Alert className='alert'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
            </IconButton>
          }
        >
          <h2>Community Guidlines</h2>
          <ul className='list'>
            <li>All employees must wear white shirt and a black trousers</li>
            <li>Customer needs comes first</li>
            <li>Always provide clean food</li>
            <li>Keep your shop clean</li>
            <li>Deciplining yourself</li>
          </ul>
          <Link id='homelink'  to='/home'> <Button className variant="contained" color="primary" href="#contained-buttons">
  I Accept
</Button></Link>
        </Alert>
      </SwiperSlide>
      </Swiper> );
}
 
export default New ;