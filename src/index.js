const express = require('express');
require('./db/mongoose.js') //it wont return anything but we need the mongodb server to start from this file

const userRouter = require('./routers/user.js')
const taskRouter = require('./routers/task.js')

const app = express();
const port = process.env.PORT || 3000


app.use(express.json()) //this will parse the incoming response from server(In post man we write in JSON for our convinence)
//Note: In postman body we are sending some data back from server to express on request
//this can be accessed in req.body
app.use(userRouter.router) //using from routers
app.use(taskRouter.router) //we are just exporting routers from here

app.listen(port, function(){ // the begining listens to the host and specific port
    console.log("server is running with port"+ port)
})
