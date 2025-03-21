
const dialogflow = require('dialogflow');
const uuid = require('uuid');
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const port = 5000;
require('dotenv').config();


const sessionId = uuid.v4();

app.use(bodyparser.urlencoded({
  extended:false
}))

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

app.post('/send-msg',(req,res)=>{
  runSample(req.body.MSG).then(data=>{
    res.send({Reply:data})
  })
})


/**
 * Send a query to the dialogflow agent, and return the query resul
 * @param {string} projectId The project to be used
 */
async function runSample(msg,projectId = 'akf-chatbot-wman') {
  // A unique identifier for the given session
  // const sessionId = uuid.v4();

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  });
  
  
  const sessionPath = sessionClient.sessionPath(projectId,sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        text: msg,
        // The language used by the client (en-US)
        languageCode: 'en-US',
      },
    },
  };

  // Send request and log result
  const responses = await sessionClient.detectIntent(request);
  console.log('Detected intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log('  No intent matched.');
  }
  return result.fulfillmentText;
}

app.listen(port,()=>{
  console.log("running on port"+port)
})
