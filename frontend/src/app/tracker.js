import { useEffect, useState } from "react"

export default function Tracker(props){
    const [data,setData]=useState([{time:"nullsdfgs",ip:"nulasdfal"}]);
    async function fetchData(url) {
        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Network response was not   
       ok: ${response.statusText}`);
          }
          const   
       data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error; // Re-throw the errorto handle it at a higher level
        }
      }
    useEffect(()=>{
      const dat=async ()=>{
        try{
        const data=await fetchData("http://localhost:80/server/data");
        setData(data)       
        }catch(err){
          
        }
    }
    dat()
    },[])
    useEffect(()=>{
        console.log(data)
    })
    return (
        <div>
          {data.map((item, index) => (
            <Element key={index} ip={item.ip} time={item.time}/>
          ))}
      </div>
      );
}

function Element(props){
    return <div style={{
        display:"flex",
        margin:10,
        fontSize:"16px"
    }}>
        <p>{props.ip}</p>
        <p>{props.time}</p>
    </div>
}