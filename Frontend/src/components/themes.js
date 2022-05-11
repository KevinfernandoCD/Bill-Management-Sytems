 import {createGlobalStyle} from 'styled-components';
 
 export const lightTheme = {

    body:'#fff',
    fontColor:"#000",
    mode:'light',
    boxShadow: '5px 10px 8px 10px #888888',
    border: '1px solid  #FFFFFF'

}

 export const DarkTheme = {

    body:'#1E1E1E',
    fontColor:"#fff",
    mode:'dark',
    boxShadow: '5px 10px 8px 10px #888888',
    border: '1px solid #FFFFFF'

}

export const GlobalStyles = createGlobalStyle`

body{

    background-color: ${(props) => props.theme.body};
    color:${(props) => props.theme.fontColor };
}

.box{

    background-color: ${(props) => props.theme.body};
    color:${(props) => props.theme.fontColor };
}

.admin-options{

    background-color: ${(props) => props.theme.body};
    color:${(props) => props.theme.fontColor };


}

.intro-box{

  background-color: ${(props) => props.theme.body};
  color:${(props) => props.theme.fontColor };

}

.admin-option1 {

    &:hover {

        box-shadow:${(props) =>  props.theme.mode === 'dark'? 'none': props.theme.boxShadow}
    }

}
.admin-option2 {

    &:hover {

        box-shadow:${(props) =>  props.theme.mode === 'dark'? 'none': props.theme.boxShadow}
    }

}
.admin-option3 {

    &:hover {

        box-shadow:${(props) =>  props.theme.mode === 'dark'? 'none': props.theme.boxShadow}
    }

}

.image-icon{

    color: ${(props) => props.theme.mode === 'dark'?'black':'black'}
}

.image-icon-errors{

    color: ${(props) => props.theme.mode === 'dark'?'black':'black'}
}


.img-div > img{


    box-shadow: ${(props) => props.theme.mode === 'dark'?'none':props.theme.boxShadow}
}

.food-card{

    &:hover{

        background-color: ${(props) => props.theme.mode == 'light'?"whitesmoke":''};
    }

}

.discount-card{

    &:hover{

        background-color: ${(props) => props.theme.mode == 'light'?"whitesmoke":''};
    }

}

.add-discount{


    color: ${(props) => props.theme.mode === 'light'?'black':'white'}
}
.remove-discount{


    color: ${(props) => props.theme.mode === 'light'?'black':'white'}
}


.drawer{

    box-shadow:${(props) =>  props.theme.mode === 'dark'? 'none': props.theme.boxShadow}

  
}
.sales-filter{

  box-shadow:${(props) =>  props.theme.mode === 'dark'? 'none': props.theme.boxShadow}
}

`


