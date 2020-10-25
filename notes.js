//async and await

router.post('/users',function(req,res){ 
    const userData = new user.User(req.body)
    userData.save().then(function(){ 
        res.send(userData) 
    }).catch(function(e){
        res.status(400)
        res.send(e)
    })
})

//if u write a function async , it will always return the result in a promise.
// when u chain in a function, suppose the result of one promise need to be used in other, so it will become long code.
//Just to make it short, we use await.That is it will run when the promise was fullfiled.If not it will throw error.
// we can use try and catch to see the error thrown in a better way.

router.post('/users',async function(req,res){ 
    const userData = new user.User(req.body)
    try {
        await userData.save() //no need to write then and all
        res.send(userData) 
    } catch (e) {
        res.status(400)
        res.send(e)
    }
    return userData
     //will run when the promise was fullfilled.
})
//await can be used only in async function
// the return of the function is sent in promise. so it will be
// if const siddharth = async function(req,res)
//siddharth().then(function(){

//}).catch(function(){

//})

//await variable is the value of then or catch we get.This is simple to use as on chaining prpblem will come