const express = require('express');
const Sequelize = require('sequelize');
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
  tableName: 'la_locca',
  timestamps: false
}
);

//synchronizing the schema

sequelize
   .sync({force : true})
   .then(()=>{ 
     User.create({ name : 'la_locca host',  email : 'locca@gmail.com', message : 'This site must attract great support'});
              })
   .then((result)=> console.log(result))
   .catch((err)=> console.log('Problem occured:', err));

const post = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;
  User.create({name, email, message})
  .then( result => {res.send('Feedback inserted succesfully!');
                    console.log(result);})
  .catch( err => {throw err;})
}


router.get('/', (req, res) => {
  res.send('really, really, big job...');
});

router.post('/', post);


module.exports = router;