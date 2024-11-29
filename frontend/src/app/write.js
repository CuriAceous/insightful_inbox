import { useRef, useState } from "react";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import { CircularProgress ,Snackbar} from "@mui/material";
export default function Writer(props) {
  const toRef = useRef();
  const [sending, send] = useState(false);
  const [mailSend,setMailSend]=useState(false);
  const [failedMailSend,setFailedMail]=useState(false);
  const subjectRef = useRef();
  const bodyRef = useRef();
  function sendMail() {
    send(true)
    async function sendPostRequestWithHeaders(url, data, headers) {
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
          });
      
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
      
          const responseData = await response.json();
          console.log(responseData);   
      
        } catch (error) {
          console.error('Error sending POST request:', error);
        }
      }
      
    
    //   getting input field data
    const to=toRef.current.value;
    const subject=subjectRef.current.value;
    const body=bodyRef.current.value;
    const data=JSON.stringify({
        to:to,
        subject:subject,
        body:body
    })
    sendPostRequestWithHeaders("http://localhost:80/server/send","nodata",{mailData:data}).catch(()=>{
        setFailedMail(false);
        send(false)
    }).then(()=>{
        setMailSend(true)
        send(false)
        toRef.current.value=""
        subjectRef.current.value=""
        bodyRef.current.value=""
    })
  }
  return (
    <>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background:"transparent",
        paddingTop:"80px"
        // width:"100%"
      }}
    >
      <p className="zen-dots-regular" style={{
      fontSize:"5em",
      // transform:"rotatez(-90deg)",
      // left:"-300px",
      color:"#222",
      bottom:"0px",
      // left:"100px",
      marginTop:"100px",
      marginLeft:"135px",
      position:"absolute"
    }}>
      COMPOSE EMAIL
    </p>
      <div
        style={{
          width: "50vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* to */}
        <TextField
        autoFocus
          disabled={sending}
          label="To"
          inputRef={toRef}
          sx={{
            marginTop: "30px"
          }}
          variant="outlined"
        />
        {/* subject */}
        <TextField
          disabled={sending}
          sx={{
            marginTop: "30px",
          }}
          label="Subject"
          inputRef={subjectRef}
          variant="outlined"
        />
        {/* body */}
        <TextareaAutosize
          disabled={sending}
          // className="zen-dots-regular" 
          style={{
            minHeight: "50px",
            // letterSpacing:"2px",
            marginTop: "30px",
            padding: "15px",
            fontSize: "16px",
            background:"transparent",
            color:"#fff"
          }}
          ref={bodyRef}
        >
          Hello receiver, this email is being tracked!
        </TextareaAutosize>
        {/* send button */}
        <Button
          onClick={sendMail}
          disabled={sending}
          sx={{
            margin: "30px 0px",
            width: "100px",
          }}
          variant="contained"
        >
          <p style={{
            fontWeight:"bolder"
          }} className="zen-dots-regular" >Send</p>
        </Button>
        {sending ? <CircularProgress /> : <></>}
        <Snackbar
          open={mailSend}
          autoHideDuration={6000}
          onClose={()=>{setMailSend(false)}}
          message="Mail Send!"
        //   action={action}
        />
        <Snackbar
          open={failedMailSend}
          autoHideDuration={6000}
          onClose={()=>{setFailedMail(false)}}
          message="Failed to send Mail!"
        //   action={action}
        />
      </div>
    </div>
    
    </>
  );
}
