const express = require('express');
const app =  express();
const path = require('path');
const nodemailer = require("nodemailer");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

// css import
app.use(express.static(__dirname))

app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/success',(req,res)=>{
    res.redirect('/#contact')

    let msg,user_name,email;
    
    user_name = req.body.user
    email = req.body.email
    msg = req.body.message

    sendmail = (user, mail , msgs) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'pranjalnikum1@gmail.com',
                pass: 'aoiqgfjifslbjwbc'
            }
        });
        const mailoptions = {
            from: ` ${user}  <pranjalnikum1@gmail.com>`,
            to: `${user} pranjalnikum1@gmail.com`, 
            subject: 'New Contact',
            text: `Name: ${user}\nEmail: ${mail}\nMessage: ${msgs}`, 
        }
        transporter.sendMail(mailoptions, function(err,info){
            if(err){
                console.log(err);
            }
            else{
                console.log('Email Received !!');
            }
        });
        
    }
    sendmail(user_name,email,msg)
})

app.listen(500);
console.log('http://127.0.0.1:500/ \nor use this \nhttp://localhost:500/')

