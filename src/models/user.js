const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const user = require('../routers/user');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-API', { //same like mongod but this is a bit easy
  useNewUrlParser: true, //connecting to the data base and creating a table with name task-manager-API
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
//note: middleware helps us in doing something before an event is made.For example, save.Before saving the user data we have the luxuary to do some thing with middleware.Like changing the plain text format of the password.
//when we are passing the object in the entire model,mangoose in backend converts it to schema.To take advantage take advantage of the schema first.

const userSchema = new mongoose.Schema({ //to take advantage of middleware.before this was done anyway when we passed object directly
    name: {
        type: String    //name and age are objects and we can give validations in this object.Now we are giving type
    },
    email: {
        type: String,    //name and age are objects and we can give validations in this object.Now we are giving type
        required: true,
       // unique:true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})
//here we have 2 methods.Pre and post.Pre means before a event like validate or save the data or post that is after the event has occured.
//*Note for updating the user schema is bypassed.So we are doing changes in the layout for updating a user */
userSchema.pre('save', function(next){
    //here this will give accesss to the individual users being created or updated
    const userData = this;
    if(userData.isModified('password')){ //is modified is a method(return true/false) that will check if change is made in password field.It is during creation and updation both
        bcrypt.hash(userData.password, 8).then(function(data){
            userData.password = data;
            next();//called to continue the run else it will be stuck
        }).catch(function(e){
            console.log(e);
        })
    }
    //next(); dont write here because hash is asynchronus and before hashing is updated, next() is called.so not reflecting in database
}) 
userSchema.methods.getUserAuthentication = async function(){ //methods created for the instance of the user
    const data = this;

    const token = jwt.sign({id: data._id.toString()},'thisIsTheSecretMessage') //need to convert id to sting here
    data.tokens = data.tokens.concat({token})
    await data.save(); //saving the token to the database
    return token;
}
userSchema.statics.getUserCredentials = async function(email,password){ // userSchema.statics can be accessed through the exports user
    var data = await User.findOne({email})
        if(!data){
            throw new Error('user not found')
        }
       var data1 = await bcrypt.compare(password,data.password)
            if(!data1){
                throw new Error('Incorrect password')
            }
            return data;
}
const User = mongoose.model('users', userSchema) //this is name of the collection table and it always take the plural name

module.exports = {
    User: User
}