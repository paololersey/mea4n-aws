var mongoose = require('mongoose')
mongoose.set('debug', true);

var connectionString='mongodb://localhost/nice';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
}
console.log(process.env.BITNAMI_ROOT)
//if(process.env.BITNAMI_ROOT){
  connectionString = 'mongodb://paolo.spadoni:kersey8D1@ec2-52-50-66-116.eu-west-1.compute.amazonaws.com:27017/machine';
//}

mongoose.connect(connectionString, function () {
    console.log('mongodb connected')
})
module.exports = mongoose
