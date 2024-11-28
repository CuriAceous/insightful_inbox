import { useNavigate} from "react-router-dom"
import { Button } from "@mui/material";
export default function Header(props){
    const navigate=useNavigate();
    return <div
    style={{
        display:"flex",
        justifyContent:"space-evenly",
        height:70,
        background:"#000"
    }}> 
    <Button sx={{
        fontWeight:"bolder",
        fontSize:24
    }} onClick={()=>{
        navigate("/")
    }}>
        Compose
    </Button>
    <Button sx={{
        fontWeight:"bolder",
        fontSize:24
    }
    } onClick={()=>{
        navigate("tracker")
    }
    }>
        Tracker
    </Button>
    </div>
}

