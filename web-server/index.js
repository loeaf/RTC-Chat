var stream = require('getstream');
// Instantiate a new client (server side)
client = stream.connect('dhefjeuw9yg5', 'k8n2fjatk2ms5bqr69k4rp732hrtqm6kysw8trv5t8vdq7xd4mqcjb99pt7rbe5x', '1198856');
var token = client.createUserToken('vaiv');
console.log(token);
