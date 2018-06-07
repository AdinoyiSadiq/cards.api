Cards.api
=========

This is the api-server for Cards.

## Getting Started

0. Install mongodb: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

1. Run mongodb:
```sh
mongod
```

2. Clone and setup this project
In a new terminal run the following: 
```sh
git clone https://github.com/AdinoyiSadiq/cards.api.git

cd cards.api

npm install
```


3. Create a facebook application and copy the app ID and app Secret: http://developers.facebook.com/

4. Create a file in the root directory called config.js and add the following:
```
module.exports = {
	facebookClientID: '',
	facebookClientSecret: '',
	secret: 'lanGWds3Hbcvdcjhhh838HD24GJ65575as6922817GDHFhg9s38xi3csvcsvcshbs'
};
```

5. Add the facebook application ID and secret to the config file.

6. Start the application with: 
```sh
npm run dev
```
