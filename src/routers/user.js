const express = require('express');
const user = require('../models/user.js')
const app = express();

const router = new express.Router() //routers also have same methods like app.get, patch etc. we call setting up routers for users and tasks like get, post etc

//app.post('/users',function(req,res){ //same like get, but we are using post since we are working with resource addition
    //if(req.query.address){ //req is the query statement
        //res.send('hello')
        //console.log(req.body)
    //}
    //wont be visible in browser.But if u use get, u can see.so, check in postman
    //this is response to the request.So server response is this with 200 status
//})
router.post('/users',async function(req,res){ 

    const userData = await new user.User(req.body)
    const token = await userData.getUserAuthentication();
    //await userData.save()
    res.send(userData)
})
// router.post('/users',function(req,res){ 

//     const userData = new user.User(req.body) //user info like validation is in model.Here on post we are creating a new instance and passing the values whatever we are giving in the body while making the request.It is just like the query address.Then the validation is done and we are sending the data back again in response
//     userData.save().then(function(data){ //this is a promise
//         res.send(data) //sending back the data after validations and all
//     }).catch(function(e){
//         res.status(400)
//         res.send(e)
//     })
// })
router.post('/users/login', async function(req,res) {
    try {
        const data = await user.User.getUserCredentials(req.body.email, req.body.password)
        const token = await data.getUserAuthentication(); //this is a user instance function and can be access in schema methods
        res.send({data, token})
    } catch(e) {
        console.log(e);
        res.status(400).send()
    }
})
// router.post('/users/login',function(req,res){ 
//     try {
//         const userData = user.User.getUserCredentials(req.body.email, req.body.password);
//         userData.then(function(data){
//             console.log("i am in data", data);
//             res.send(data);
//         }).catch(function(e){
//             console.log(e);
//         })
//     } catch (error) {
//         console.log(error);
//         res.send(error);
//     }
// })
router.get('/users',function(req,res){
    user.User.find({}).then(function(data){ //check mongoosse queries for these CRUD methods. If nothing is given in brackets it will search for all the elements in table.returns a promise
        res.send(data); //in find give the function name where model was created
    }).catch(function(e){
        res.send(e);
    })
})
// app.get('/users/:id',function(req,res){ //:id means it will take all the dynamic values made on request.It can be accessable with req/params 
//     console.log(req.params); //in web also same response will come.U are doing same in postman
// })
router.get('/users/:id',function(req,res){ 
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
router.patch('/users/:id', async function(req,res){
    const updates = Object.keys(req.body); // returns the key parts of the object like name and all
    const allowedUpdates = ["name","email","password","age"];

    const _id = req.params.id

//METHOD 1

//     console.log(_id);

//    const userData = user.User.findById(req.params.id);
//     console.log(userData)

//     updates.forEach(function(update){
//         userData[update] = req.body[update]
//     })
//    // await userData.save()
//     res.send(userData);

//METHOD 2 //TO MAKE USE OF SCHEMA
    user.User.findById(_id).then(function(data){
        if(!data){ //if u are using many then give like completed true and update something for all trues.
            res.status(404).send('user not found')
            return
        }
        updates.forEach(function(update){
            data[update] = req.body[update] //its like updating siddharth.name  = siddhant
        })
        data.save().then(function(data){ //saving the data
            res.send(data);
        })
    }).catch(function(e){
        res.send(e);
    })

    //METHOD 3 --> it will bypass scehema

    // user.User.findByIdAndUpdate(_id, req.body,{"new":true, "runValidators":true}).then(function(data){
    //     if(!data){ //if u are using many then give like completed true and update something for all trues.
    //         res.status(404).send('user not found')
    //         return
    //     }
    //     res.send(data);
    // }).catch(function(e){
    //     res.send(e);
    // })

})
router.delete('/users/:id', function(req,res){
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
module.exports = {
    router: router //exporting the router we created and it has all methods in it
}