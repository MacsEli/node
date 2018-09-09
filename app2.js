const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
app.use('/push', router);


app.listen(port, () => console.log(`Listening on port ${port}`));


const url = require('url');



var admin = require('firebase-admin');

var serviceAccount = require('C:/Users/dell/nodeProject/BpartherCredencial.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




router.get('/buy', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var registrationToken = parameters.token;
  var price=parameters.price;
  var ref=parameters.ref;
  

  var message = {
  notification: {
    title: 'Se ha realizado una compra',
    body:"Cantidad: " + price + " pesos " + "Ref: "+ref
  },
  token: registrationToken
};
var response;
admin.messaging().send(message)
  .then((response) => {
	  
    console.log('Successfully sent message:', response);
	console.log('Key', registrationToken);
	console.log('price',price);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
	console.log('Successfully sent message:', registrationToken);
  });
});



router.get('/sell', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var registrationToken = parameters.token;
  var price=parameters.price;
  var ref=parameters.ref;

  var message = {
  notification: {
    title: 'Se ha aceptado una Venta',
    body: "Cantidad: "+ price + " pesos "+ "Ref: "+ref
  },
  token: registrationToken
};
var response;
admin.messaging().send(message)
  .then((response) => {
	  
    console.log('Successfully sent message:', response);
	console.log('Key', registrationToken);
	console.log('price',price);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
	console.log('Successfully sent message:', registrationToken);
  });
});




router.get('/sellAccept', (request, response) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var registrationToken = parameters.token;
  var price=parameters.price;
  var ref=parameters.ref;

  var message = {
  notification: {
    title: '¿Aceptas la transaccion?',
    body: "Cantidad: "+ price + " pesos "+ "Ref: "+ref
  },
  token: registrationToken
};
var response;
admin.messaging().send(message)
  .then((response) => {
	  
    console.log('Successfully sent message:', response);
	console.log('Key', registrationToken);
	console.log('price',price);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
	console.log('Successfully sent message:', registrationToken);
  });
});