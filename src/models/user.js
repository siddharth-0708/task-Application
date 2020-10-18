const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-API', { //same like mongod but this is a bit easy
  useNewUrlParser: true, //connecting to the data base and creating a table with name task-manager-API
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const User = mongoose.model('users',{ //this is name of the collection table and it always take the plural name
    name: {
        type: String    //name and age are objects and we can give validations in this object.Now we are giving type
    },
    email: {
        type: String,    //name and age are objects and we can give validations in this object.Now we are giving type
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('wrong Email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.includes('password')){
                throw new Error('cannot type password')
            } 
        }
    },
    age: {
        type: Number,
        required:true,
        validate(value) { //this is custom validation we can do whatever we want
            if(value<0){ //for complex validation we are downloading validator package
                throw new Error('Error should be a positive number')
            }
        }
    }
})

module.exports = {
    User: User
}