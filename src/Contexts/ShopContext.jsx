import React, { createContext, useEffect, useState } from 'react';

export const ShopContext = createContext(null);

const backendURL = 'https://khareedoindia-backend.onrender.com';
// const backendURL = 'https://localhost:4000';

const getDefaultCart = ()=>{
    let cart = {};
    for(let index=0;index < 300+1;index++){
        cart[index]=0;
    }
    return cart;
}

const ShopContextProvider = (props) =>{
    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [all_product,setAll_Product] = useState([]);

    const fetchInfo = async()=>{
        await fetch(backendURL +'/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAll_Product(data)});

        if(localStorage.getItem('auth-token')){ // checks if they are logged in
            fetch(backendURL + '/getcart',{
                method : 'GET',
                headers : {
                    Accept : 'application/form-data',
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    "Content-Type" :  'application/json'
                },
            })
            .then((res)=>res.json())
            .then((data)=>{
                setCartItems(data);
            })
        }
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch(backendURL+'/addtocart',{
                method : 'POST',
                headers : {
                    Accept : 'application/form-data',
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    "Content-Type" :  'application/json'
                },
                body : JSON.stringify({'itemId' : itemId})
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
            })
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch(backendURL + '/removefromcart',{
                method : 'POST',
                headers : {
                    Accept : 'application/form-data',
                    'auth-token' : `${localStorage.getItem('auth-token')}`,
                    "Content-Type" :  'application/json'
                },
                body : JSON.stringify({'itemId' : itemId})
            })
            .then((res)=>res.json())
            .then((data)=>{
                console.log(data);
            })
        }
    }

    const getTotalCartAmount = ()=>{
        let totalAmount  = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_product.find((product)=>product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = ()=>{
        let totalItems = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                totalItems+=cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue = {all_product,cartItems,addToCart,removeFromCart,getTotalCartAmount,getTotalCartItems};

    return (
        <ShopContext.Provider value={contextValue}>
        {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
