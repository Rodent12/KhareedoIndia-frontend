import React from 'react'
import "./Popular.css"
import Item from '../Item/Item'
import { useEffect,useState } from 'react'

const Popular = () => {

  const [popular_in_women,setPopularInWomen] = useState([]);

  const fetchInfo = async()=>{
      await fetch('https://khareedoindia-backend.onrender.com/popularinwomen')
      .then((res)=>res.json())
      .then((data)=>{setPopularInWomen(data)});
  }

    useEffect(()=>{
        fetchInfo();
    },[])

  return (
    <div className='popular'>
        <h1>POPULAR IN WOMEN</h1>
        <hr/>
        <div className="popular-item">
            {popular_in_women.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default Popular