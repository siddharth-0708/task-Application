const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-API', { //same like mongod but this is a bit easy
  useNewUrlParser: true, //connecting to the data base and creating a table with name task-manager-API
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

// const me = new User({ //creates entry in table too
//     name: "siddharth",
//     age: 27,
//     email: 'sidd@gmail.com',
//     password: "cashew"
// })
//to save in database and it is a promise
// me.save().then(function(){
//     console.log(me);
// }).catch(function(error){  
//     console.log(error)
// })
