var mongoose = require('mongoose')
//mongoose.set('debug', true);

var connectionString='mongodb://localhost/nice';
connectionString = 'mongodb://paolo.spadoni:kersey8D1@ec2-54-154-62-241.eu-west-1.compute.amazonaws.com:27017/machine';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}

mongoose.connect(connectionString, function () {
    console.log('mongodb connected')
})
module.exports = mongoose
