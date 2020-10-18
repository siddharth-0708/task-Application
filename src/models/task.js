const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-API', { //same like mongod but this is a bit easy
  useNewUrlParser: true, //connecting to the data base and creating a table with name task-manager-API
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const task = mongoose.model('tasks',{ //this is name of the collection table and it always take the plural name
    item: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,    //name and age are objects and we can give validations in this object.Now we are giving type
        required: true,
    },
})

module.exports = {
    task: task
}