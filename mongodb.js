const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient

//will create a new id by our convinent for records(see API). by the user(not needed).If we dont write it generates automatically anyway
 const ObjectID = mongodb.ObjectID
// const id = new ObjectID()
// console.log(id);
// console.log(id.getTimestamp()); //embedded inside id to see when it was created

const connectionURL = 'mongodb://127.0.0.1:27017'; //This is local host default ip address.When u give local host, it will look for files in its own computer.Sysytem ip is used to connect with other computers or servers and others woll know what ur address is
const databaseName = 'task-manager';

MongoClient.connect(connectionURL, { useNewUrlParser:true, useUnifiedTopology: true}, function(error,client){ //to parse user url correctly to connect and a call back function that will execute once we get the response
    if(error){
        console.log("error occoured");
        return;
    }
     const db = client.db(databaseName) //takes the name of db and gives back a database reference.store in variable.No need to create in robot, but will automatically connect
//1. Create records    
     // db.collection('user').insertOne({
    //     _id : id,
    //     name:'siddharth',
    //     age: 26
    // }, function(error,result) { //study collection API of mongodb
    //     if(error){
    //         console.log("unable to insert");
    //         return;
    //     }
    //     console.log(result.ops); //gives and array with data of the inserts// From API doc we come to know that results.ops will give the array
    // })

    // db.collection('users').insertMany([
    // {
    //     name:'siddharth',
    //     age: 26
    // },
    // {
    //     name:'cashew',
    //     age: 5
    // },
    // {
    //     name:'almond',
    //     age: 35
    // },
    //  ], function(error,result) { //study collection API of mongodb callback
    //     if(error){
    //         console.log("unable to insert records");
    //         return;
    //     }
    //     console.log(result.ops); //gives and array with data of the inserts// From API doc we come to know that results.ops will give the array
    // })
    db.collection('tasks').insertMany([
        {
            description:'Buy snacks',
            completed: true
        },
        {
            description:'Buy brush',
            completed: false
        },
        {
            description:'Buy fruits',
            completed: true
        },
         ]
        //  , function(error,result) { //study collection API of mongodb callback
        //     if(error){
        //         console.log("unable to insert task records");
        //         return;
        //     }
        //     console.log(result.ops); //gives and array with data of the inserts// From API doc we come to know that results.ops will give the array
        ).then(function(result){ //using promise by API it takes by default
            console.log(result.ops);
        }).catch(function(error){
            console.log(error);
        })
//2.fetch records
    // db.collection('users').findOne({_id:'5f81a3ac0e88892a78192af5'},function(error,user){ // if multiple names are there with the same name it will fetch always first one
    //     if(error){ //this will send null because the id is in binary and only for our understanding it is written like that
    //         console.log("error fectching")
    //         return
    //     }
    //     console.log(user);
    // })
    // db.collection('users').findOne({_id:new ObjectID("5f81a3ac0e88892a78192af5")},function(error,user){ // if multiple names are there with the same name it will fetch always first one
    //     if(error){ //this will send null because the id is in binary and only for our understanding it is written like that
    //         console.log("error fectching")
    //         return
    //     }
    //     console.log(user);
    // })
    // db.collection('users').find({age: 26}).toArray(function(error,user){
    //     console.log(user);
    // }) //find doesnt have call back.It has a cursor.From to array we can check for errors
    // db.collection('users').find({age: 26}).count(function(error,user){
    //     console.log(user);
    // })
//3. Update records    
    // db.collection('tasks').updateMany({ //returns a promise if no call back is passed inbuild check API
    //    completed: true //takes all with completed as true
    // },{                //update one means it will take the first record if multiple are there.Id can be given for one specific record
    //     $set:{
    //         completed: false
    //     }
    // }).then(function(result){
    //     console.log("success");
    // }).catch(function(error){
    //     console.log("error");
    // })
//4.delete records    
    // db.collection('tasks').deleteMany({
    //     description: true
    // }).then(function(result){
    //     console.log(result)
    // }).catch(function(){
    //     console.log(error)
    // })
}) 
