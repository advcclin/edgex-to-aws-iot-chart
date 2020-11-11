const express = require('express'),
    app = express(),
    cors = require('cors'),
    morgan = require('morgan'),
    path = require('path'),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server);

const aws_config = {
      keyPath: "certs/958b1bd157-private.pem.key",
      certPath: "certs/958b1bd157-certificate.pem.crt",
      caPath: "certs/root-CA.crt",
      clientId: "sdk-nodejs-20e55328-d2d9-42ec-8f61-05de9ec38ca6",
      region: "",
      baseReconnectTimeMs: 4000,
      keepalive: 300,
      protocol: "mqtts",
      port: 8883,
      host: "a1ftn7ca6fz35t-ats.iot.us-east-2.amazonaws.com",
      debug: false
};

io.on('connection', function (socket) {
    console.log("Web socket connected.")
    socket.emit('news', aws_config.host);
});

const deviceModule = require('aws-iot-device-sdk').device;

const device = deviceModule(aws_config);

//const TOPIC = "$aws/things/EdgeX/shadow/update/documents"
const TOPIC = "$aws/things/EdgeX/shadow/update"
console.log('subscribe topic: %s', TOPIC);
device.subscribe(TOPIC);

//
// Do a simple publish/subscribe demo based on the test-mode passed
// in the command line arguments.  If test-mode is 1, subscribe to
// 'topic_1' and publish to 'topic_2'; otherwise vice versa.  Publish
// a message every four seconds.
//
device
    .on('connect', function() {
       console.log('aws connected');
    });
device
    .on('close', function() {
       console.log('aws close');
    });
device
    .on('reconnect', function() {
       console.log('aws reconnect');
    });
device
    .on('offline', function() {
         console.log('aws offline');
      });
device
    .on('error', function(error) {
         console.log('aws error', error);
      });
device
    .on('message', function(topic, payload) {
         console.log('message', topic, payload.toString());
         io.emit('aws-edgex-shadow', payload.toString());
      });

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/html/aws-livechart.html'));
});

server.listen(3000, function () {
    console.log('App listening on port 3000!');
});
