var util = require('util');
var mongoose = require('mongoose');
var config = require('config');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
module.exports = class MongooseConnection {

    constructor() {
        this.mongoip=config.Mongo.ip;
        this.mongoport=config.Mongo.port;
        this.mongodb=config.Mongo.dbname;
        this.mongouser=config.Mongo.user;
        this.mongopass = config.Mongo.password;
        this.mongoreplicaset= config.Mongo.replicaset;
        this.cloudatlas= false;

        if(config.Mongo.cloudAtlas){
            this.cloudatlas = config.Mongo.cloudAtlas;
        }

        let connectionstring = '';
        let _mongoip = this.mongoip.split(',');
        if(Array.isArray(_mongoip)){

            if(this.cloudatlas === true ||this.cloudatlas === 'true' ){
                connectionstring = util.format('mongodb+srv://%s:%s@%s',this.mongouser,this.mongopass,this.mongoip)
            }
            else if(_mongoip.length > 1){

                _mongoip.forEach(function(item){
                    connectionstring += util.format('%s:%d,',item,this.mongoport)
                });

                connectionstring = connectionstring.substring(0, connectionstring.length - 1);
                connectionstring = util.format('mongodb://%s:%s@%s/%s',this.mongouser,this.mongopass,connectionstring,this.mongodb);

                if(this.mongoreplicaset){
                    connectionstring = util.format('%s?replicaSet=%s',connectionstring,this.mongoreplicaset) ;
                }


            }
            else{

                connectionstring = util.format('mongodb://%s:%s@%s:%d/%s',this.mongouser,this.mongopass,_mongoip[0],this.mongoport,this.mongodb)
            }

        }else{

            connectionstring = util.format('mongodb://%s:%s@%s:%d/%s',this.mongouser,this.mongopass,this.mongoip,this.mongoport,this.mongodb)
        }


        mongoose.connect(connectionstring,{useNewUrlParser: true,autoReconnect :true});

    }

}



mongoose.connection.on('error', function (err) {
    console.error( new Error(err));
    mongoose.disconnect();

});

mongoose.connection.on('opening', function() {
    console.log("reconnecting... %d", mongoose.connection.readyState);
});


mongoose.connection.on('disconnected', function() {
    console.error( new Error('Could not connect to database'));
    //mongoose.connect(connectionstring,{server:{auto_reconnect:true}});
});

mongoose.connection.once('open', function() {
    console.log("Connected to db");

});


mongoose.connection.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});


process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});







