var mongoose = require('mongoose')
//mongoose.set('debug', true);

var connectionString = 'mongodb://localhost/nice';
//var connectionString = 'mongodb://localhost/machine'; //as the production db

// OPENSHIFT RED HAT connection string
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
  connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    process.env.OPENSHIFT_APP_NAME;
}

// HEROKU string
if (process.env.MONGODB_URI) {
    connectionString = process.env.MONGODB_URI;
    //connectionString= "mongodb+srv://mainUser:mainUser@cluster0.c11ys.mongodb.net/machine";
}

// AWS connection string




console.log('mongodb starting with string = ' + connectionString);

// Connect to mongodb
mongoose.connect(connectionString,  { useNewUrlParser: true } , function () {
  console.log('mongodb connected with string = ' + connectionString);
  
})


module.exports = mongoose
