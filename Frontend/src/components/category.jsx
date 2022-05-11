import React from 'react';
import '../styles/foodbilling.css';
import { useData } from './context';






const Category = ({item}) => {

    const {setSelectedCategory,selectedCategory} = useData();
    return ( <div onClick={() => setSelectedCategory(item.categoryname)} className={selectedCategory == item.categoryname?'category-item-active':'category-item'}>
        {item.categoryname}
    </div> );
}
 
export default Category;