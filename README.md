# Contact-Address-System


## Documentation
Documentation concerning the APIs for the project has been hosted on heroku and can be found <a href="https://demo-contacts-api-airiasia.herokuapp.com/api/v1.0/api-docs/#/">here</a> 

## Usage
Kindly authorize via 'Client-key' through the following steps:
1. Click <a href="https://demo-contacts-api-airiasia.herokuapp.com/api/v1.0/api-docs/#/">here</a>  to access and use the endpoints
2. On the Swagger page, kindly click the 'Authorize' button on the right upper section of the page
3. Enter the below key into the 'value' input box.
```javascript
4!R_45!4_T37K
```
4. LanguageId of '1' should be included in all header requests.   

## Setting up and running
1. Download the repository.
2. set the PORT (port for listening), API_VERSION (the version), MONGODB_URL (mongodb url), ENV (environment name), CLIENT_KEY (client key reference) and in you .env file locally
3. run npm install to get all dependencies
4. run nodemon to start the server and make it ready for requests 

### Running integration tests and local api testing
The .json postman file can be found in the root folder. This file can be imported into postman for testing. Kindly remember to set the environmental variables for postman.
Kindly use 'mocha' to run all the tests. The test can be located in the /test folder in the root folder.

## Extra features
### Language Message Constants
- This feature allows for translation in relation to response message constants. As stated above, LanguageId of '1' should be included in all header requests to represent english. With future developments in mind other language message constants can be added  
## Technology / tools
- Node.js
- Swagger
- Helmet
- Github
- Heroku
- VsCode
- MongoDB (Mongoose framework)
- Mlab
- Mocha (testing)
- Chai (testing)

## Perks and goodies
- Easy deployment
- Awesome Documentation


## Author
JOOJO DONTOH
