const express = require('express');
require('./db/mongoose.js') //it wont return anything but we need the mongodb server to start from this file
const user = require('./models/user.js')
const task = require('./models/task.js')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json()) //this will parse the incoming response from server(In post man we write in JSON for our convinence)
//Note: In postman body we are sending some data back from server to express on request
//this can be accessed in req.body

//app.post('/users',function(req,res){ //same like get, but we are using post since we are working with resource addition
    //if(req.query.address){ //req is the query statement
        //res.send('hello')
        //console.log(req.body)
    //}
    //wont be visible in browser.But if u use get, u can see.so, check in postman
    //this is response to the request.So server response is this with 200 status
//})
app.post('/users',function(req,res){ 
    const userData = new user.User(req.body) //user info like validation is in model.Here on post we are creating a new instance and passing the values whatever we are giving in the body while making the request.It is just like the query address.Then the validation is done and we are sending the data back again in response
    userData.save().then(function(){ //this is a promise
        res.send(userData) //sending back the data after validations and all
    }).catch(function(e){
        res.status(400)
        res.send(e)
    })
})
app.get('/users',function(req,res){
    user.User.find({}).then(function(data){ //check mongoosse queries for these CRUD methods. If nothing is given in brackets it will search for all the elements in table.returns a promise
        res.send(data); //in find give the function name where model was created
    }).catch(function(e){
        res.send(e);
    })
})
// app.get('/users/:id',function(req,res){ //:id means it will take all the dynamic values made on request.It can be accessable with req/params 
//     console.log(req.params); //in web also same response will come.U are doing same in postman
// })
app.get('/users/:id',function(req,res){ 
    const _id = req.params.id //no need to convert to object id in mongoose like in mongodb.mongoose automatically does that
    user.User.findById(_id).then(function(data){ //we get the data
        if(!data){
            res.status(404).send('user not found')
            return
        }
        res.send(data)
    }).catch(function(e){
        res.send(e).status(505);
    })
})
app.patch('/users/:id', function(req,res){
    const _id = req.params.id
    user.User.findByIdAndUpdate(_id, req.body,{"new":true, "runValidators":true}).then(function(data){
        if(!data){ //if u are using many then give like completed true and update something for all trues.
            res.status(404).send('user not found')
            return
        }
        res.send(data);
    }).catch(function(e){
        res.send(e);
    })

})
app.delete('/users/:id', function(req,res){
    const _id = req.params.id
    user.User.findByIdAndDelete(_id).then(function(data){ //gets the one that will be deleted in data
        if(!data){ 
            res.status(404).send('user not found')
            return
        }
        res.send(data);
    }).catch(function(e){
        res.send(e);
    })

})
app.post('/tasks',function(req,res){ //post is to create
    const taskData = new task.task(req.body) //creating the table
    taskData.save().then(function(){ 
        res.send(taskData)
    }).catch(function(e){
        res.status(400)
        res.send(e)
    })
})


app.listen(port, function(){ // the begining listens to the host and specific port
    console.log("server is running with port"+ port)
})
