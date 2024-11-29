import { Button } from "@mui/material";
import { useEffect, useState } from "react"

export default function Tracker(props){
    const [data,setData]=useState([{time:"nullsdfgs",ip:"nulasdfal"}]);
    const [localhost,setLocal]=useState("192.168.29.1")
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

        const data2=await fetchData("https://api6.ipify.org?format=json");
        setLocal(data2.ip)
        }catch(err){
          
        }
    }
    dat()
    },[])
    useEffect(()=>{
        console.log(data)
    })
    return (
        <div style={{
          paddingTop:"55px",
        }}>
          <p className="zen-dots-regular" style={{
      fontSize:"5em",
      // transform:"rotatez(-90deg)",
      // left:"-300px",
      color:"#222",
      bottom:"0px",
      // left:"100px",
      marginTop:"100px",
      marginLeft:"50px",
      position:"absolute"
    }}>
      VIEW EMAIL INSIGHTS
    </p>
          {data.map((item, index) => (
            <Element localhost={localhost} key={index} ip={item.ip} time={item.time}/>
          ))}
      </div>
      );
}

function Element(props){
    return <>
    <div style={{
      textAlign:"right",
        display:"flex",
        width:"90%",
        padding:"10px 10px 10px 0px",
        borderRadius:"0px 10px 10px 0px", 
        background:"linear-gradient(to right, rgba(0,191,152,.1) 0% 90% , transparent)",
        marginTop:"3px 0",
        fontSize:"16px",
        margin:"15px 0px",
        // borderTop:"1px solid #fff"
    }}>
        <p style={{
          marginLeft:"40px"
        }}>IP : <span style={{
          color:"lime",
          fontWeight:'bold'
        }}>{props.ip==="::1"?props.localhost:props.ip}</span></p>
        
        <p style={{marginLeft:"25px",fontStyle:"italic"}}>Date & Time : <span style={{color:"lime"}}>{props.time}</span></p>
        <Button onClick={()=>{
          window.open(`https://www.opentracker.net/feature/ip-tracker?ip=${props.ip==="::1"?props.localhost:props.ip}`)
        }} sx={{
          height:"20px",
          marginLeft:"25px",
          fontWeight:"bold",
          fontStyle:"italic"
        }}>Point Geolocation</Button>
    </div>
    {/* <div style={{width:"100%",height:"1px",background:"linear-gradient(to right, transparent,#333 20% 80%,transparent  100%)"}}></div> */}
    </>
}