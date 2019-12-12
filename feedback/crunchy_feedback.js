const express = require('express');
const Sequelize = require('sequelize');
const Nodemailer = require('nodemailer')
const router = express.Router();



//connecting to the database
const sequelize = new Sequelize('feedback', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

//testing a model
sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });


//defining a model
const User = sequelize.define('User', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  message: Sequelize.STRING
}, {
  tableName: 'crunchy_cake',
  timestamps: false
}
);

//synchronizing the schema

sequelize
   .sync({force : true})
   .then(()=>{ 
     User.create({ name : 'crunchy host',  email : 'crunchy@gmail.com', message : 'This site looks great.'});
              })
   .then((result)=> console.log(result))
   .catch((err)=> console.log('Problem occured:', err));



const get = (req, res, next) => {
    User.findAll()
    .then(result=> res.send(result))
    .catch(err=> {throw err;});
  }
  

const post = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  const password = req.body.password;
  const transporter = Nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers:'SSLv3'
     },
    auth: {
      user: email,
      pass: password
    }
    });
 const mailOptions = {
  from: email,
  to: 'littlepig1012@outlook.com, devt1021@gmail.com, skylang121@outlook.com',
  subject: 'Feedback on crunchy_cake microsite',
  text: message
  };

  User.create({name, email, message})
  .then( result => res.send('Feedback inserted successfully!'))
  .catch( err => {throw err;} );

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      console.log(error);
    } else {
      console.log('Email sent: '+ info.response);
    }
  })

}

router.get('/', get);
router.post('/', post);



module.exports = router;