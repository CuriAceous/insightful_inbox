import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
export default function Header(props) {
  const navigate = useNavigate();
  return (
    <div
    
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        height: 70,
        width: "70vw",
        background: "#000",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          height: "1px",
          width: "100%",
          background: "#555",
          top: "50%",
        }}
      ></div>
      <Button
        sx={{
          fontWeight: "bolder",
          fontSize: 24,
          background: "#000",
          padding: "0px 50px",
        }}
        onClick={() => {
          navigate("/");
        }}
      >
        <p className="zen-dots-regular">Compose</p>
      </Button>
      <Button
        sx={{
          fontWeight: "bolder",
          fontSize: 24,
          background: "#000",
          padding: "0px 50px",
        }}
        onClick={() => {
          navigate("tracker");
        }}
      >
        <p className="zen-dots-regular">Tracker</p>
      </Button>
    </div>
  );
}
