import { Routes, Route, Link, Router } from "react-router-dom";
import { createTheme, Paper, ThemeProvider } from "@mui/material";
import Header from "./header";
import Writer from "./write";
import Tracker from "./tracker";
// creating Theme
const appTheme = createTheme({
  palette: {
    mode: "dark",
    primary:{
      main:"#0ff"
    }
  },
});
export default function Routing(props) {
  return (
    <ThemeProvider theme={appTheme}>
      <Paper
        sx={{
          background: "#000",
        }}
      >
        <div style={{
            display:"grid",
            gridTemplateColumns:".7fr .3fr"
        }}>
          <div style={{background:"none",position:"relative"}}>
            <Header></Header>
            <Routes>
              <Route path="/" element={<Writer />} />
              <Route path="/tracker" element={<Tracker />} />
            </Routes>
          </div>
          <div style={{
            position:"relative"

          }}>
            <div className="zen-dots-regular" style={{
                background:"linear-gradient(to right top, #6d327c, #485DA6, #00a1ba, #00BF98, #36C486), linear-gradient(to right top,#000, red, red, red)",
                // boxShadow:"0px 0px 20px 0px #0ff",
                // WebkitMaskImage:"linear-gradient(to top, transparent 0% 1%, black  100%)",
                height:"90vh",
                width:"90%",
                padding:"50px",
                // fontSize:"3rem",
                wordWrap:"break-word",
                // wordBreak:"break-all",
                borderRadius:"0 0 30px   30px",
                display:"flex",
                flexDirection:"column",
                justifyContent:"space-between"
            }}>
              <p style={{
                marginBottom:"40px",
                fontSize:"1.9em",
                color:"rgba(34,34,34)"
              }}>Insightful Inbox</p>
              <p style={{
                fontSize:"1.9em",
                marginBottom:"30px"
              }}><span style={{
                color:"#000",
                textShadow:"0px 0px 10px #fff" 
              }}>Monitor</span> email opens, clicks, user geolocation, click rates.</p>
              <p style={{
                marginTop:"auto",
                marginBottom:"20px"
              }}>Designed and Build By : </p>
              <div style={{
                fontSize:"1em"
              }}>
                <div style={{display:"flex"}}>
                  <p style={{color:'lime', marginRight:"15px"}}>277</p>
                  <p>Anurag Vaibhav</p>
                </div>
                <div style={{display:"flex",marginTop:"5px"}}>
                  <p style={{color:'lime', marginRight:"15px"}}>285</p>
                  <p>Himanshu Patel</p>
                </div>
                <div style={{display:"flex",marginTop:"5px"}}>
                  <p style={{color:'lime', marginRight:"15px"}}>304</p>
                  <p>Prince Kumar Gupta</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </ThemeProvider>
  );
}
