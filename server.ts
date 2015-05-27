declare function require(name:string);

var Hapi = require('hapi');
var path = require('path');
var firebase = require('firebase');
var server = new Hapi.Server();

server.connection({
  port: 3000,
  host: "localhost"
});

server.views({
  engines: {
    html: require('handlebars')
  },
  path: path.join(__dirname, 'public')
  // helpersPath: path.join(__dirname, 'helpers')
});

server.route({
  path: '/{param*}',
  method: 'GET',
  handler: {
    directory: {
      path: "./public",
      index: true
    }
  }
});

server.register([
  {
    register: require('good'),
    options: {
      reporters: [{
        reporter: require('good-console'),
        events:{ response: '*' }
      }]
    }
  }
], function (err) {

  if (err) {
    throw err;
  }


  // Starting the server
  server.start(function(err) {
    if (err) {
      console.log("Something went wrong: "+ err);
    }
    console.log('Hapi Server is running on port 3000!');
  });


});
