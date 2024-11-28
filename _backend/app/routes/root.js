const app = require("express").Router();
const nodemailer = require('nodemailer');
const Log=require("../utils/log.js");
const devlog = new Log("root", true);
const log = new Log("root");
const path = require('path')
const fs = require('fs');
class JsonFile {
    constructor(filePath) {
      this.filePath = filePath;
    }
  
    async read() {
      try {
        const data = await fs.promises.readFile(this.filePath, 'utf8');
        return JSON.parse(data);
      } catch (error) {
        console.error('Error reading file:', error);
        return null;
      }
    }
  
    async write(data) {
      try {
        await fs.promises.writeFile(this.filePath, JSON.stringify(data, null, 2));
      } catch (error) {
        console.error('Error writing file:', error);
      }
    }
  }
const dataFile=new JsonFile(path.join(__dirname,"data.json"));
// ================
// Create a transporter object
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'keon.schmitt83@ethereal.email',
        pass: 'BndED45uKZXzEhyeH3'   

    }
});
// ================
app.post("/send", (req, res, next) => {
    log.log("Request to Send a Email")
    // res.send(`<h1>${JSON.stringify(req.app.get("global_arguments"))}</h1>`)
    const mailData=JSON.parse(req.headers.maildata);
    console.log(mailData)
    // log.elog("this is error log test",true,{name:"anurag",title:"vaibhav"})
    // devlog.elog("this is a test dev log error")
    // Define the email options
const mailOptions = {
    from: 'Curiaceous <curiaceous@gmail.com>',
    to: mailData.to,
    subject: mailData.subject,
    html: `<p>${mailData.body}</p><img src="http://localhost:80/server/img"></img>`
};
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Email sent: ' + info.response);   

    }
});
    setTimeout(()=>{
    res.status(200).send({status:"ok"})

    },2000) 
});
app.get("/img",async (req,res,next)=>{
    let oldData=await dataFile.read();
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    // console.log(oldData) 
    oldData.push({
        time:new Date(),
        ip:clientIp
    })
    dataFile.write(oldData);
    log.log("Tracing Hidden Image Request !!!");
    res.status(200).sendFile(path.join(__dirname,"../../pixel_transparent.png"))
});
app.get("/data",(req,res,next)=>{
    // sends data of the traced ips
    dataFile.read().then(data=>{
        res.status(200).send(data);
    }).catch(()=>{
        res.status(500).send({data:"something went wrong"})
    })
});
app.get("/",(req,res,next)=>{
    res.send("Server Live")
})


// export the route
module.exports = app