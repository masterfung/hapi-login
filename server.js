var Hapi = require('hapi');
var path = require('path');
var Joi = require('Joi');
var firebase = require('./firebase');
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

server.route({
    path: '/login/{param*}',
    method: 'GET',
    handler: {
        directory: {
            path: path.join(__dirname, 'public/templates/login/'),
            index: true
        }
    }
});

server.route({
    path: '/login/{param*}',
    method: 'POST',
    config: {
      handler: function(req, res) {

      },
      validate: {
          payload: {
            email: Joi.string().email()
            password: Joi.string().alphanum(),.min(8)
          }
      }
    }
});

server.register([
    {
        register: require('good'),
        options: {
            reporters: [{
                    reporter: require('good-console'),
                    events: { response: '*' }
                }]
        }
    }
], function (err) {
    if (err) {
        throw err;
    }
    server.start(function (err) {
        if (err) {
            console.log("Something went wrong: " + err);
        }
        console.log('Hapi Server is running on port 3000!');
    });
});
