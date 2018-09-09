const express = require('express');
const app = express();
const router = express.Router();
const port = 5123;
app.use('/push', router);


app.listen(port, () => console.log(`Listening on port ${port}`));


const url = require('url');


var admin = require('firebase-admin');

var serviceAccount = require('/home/ubuntu/node/BpartherCredencial.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});




router.get('/buy', (request, response1) => {
  var urlParts = url.parse(request.url, true);
  var parameters = urlParts.query;
  var registrationToken = parameters.token;
  var price=parameters.price;
  var ref=parameters.ref;
  

  var message = {
  notification: {
    title: 'El negocio acepto tu compra',
    body:"Cantidad: " + price + " pesos " + "Ref: "+ref
  },
  token: registrationToken
};

admin.messaging().send(message)
  .then((response) => {
	  
    console.log('Successfully sent message:', response);
	console.log('Key', registrationToken);
	console.log('price',price);
	response1.status(200).json({code: "200"}).end();
  })
  .catch((error) => {
    console.log('Error sending message:', error);
	console.log('UnSuccessfully sent message:', registrationToken);
	valida=0;
	response1.status(442).json({code: "442"}).end();
  });
  
  
});



router.get('/sell', (request, response1) => {
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
	response1.status(200).json({code: "200"}).end();
  })
  .catch((error) => {
    console.log('Error sending message:', error);
	console.log('UnSuccessfully sent message:', registrationToken);
	response1.status(442).json({code: "442"}).end();
  });
});




router.get('/sellAccept', (request, response1) => {
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
	response1.status(200).json({code: "200"}).end();
  })
  .catch((error) => {
    console.log('Error sending message:', error);
	console.log('UnSuccessfully sent message:', registrationToken);
	response1.status(442).json({code: "442"}).end();
  });


});