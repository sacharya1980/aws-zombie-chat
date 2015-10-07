console.log('Loading function');
var aws = require('aws-sdk');
var ddb = new aws.DynamoDB(
    {region: "us-west-2",
     params: {TableName: "messages"}});
     
var theContext;

function dynamoCallback(err, response) {
  if (err)
  { 
      console.log('error' + err, err.stack); // an error occurred
      theContext.fail(err);
  }
  else
  {
     console.log('result: ' + JSON.stringify(response))        // successful response
     
     var messageData = {
        messages: []
     };
    
    for (var i = response.Items.length - 1; i >=  0; i--) 
  {
        ii = response.Items[i];
        var message = {};
        message['name'] = ii.name['S'];
        message['message'] = ii.message['S'];
        message['channel'] = ii.channel['S'];
        message['timestamp'] = Number(ii.timestamp['N']);
        messageData.messages.push(message);
    }
    theContext.succeed(messageData);
  }
}

exports.handler = function(event, context)
{
    theContext = context;
  var params = {
                "KeyConditions": {
                    "channel": {
                        "AttributeValueList": [{
                            "S": "default"
                        }],
                        "ComparisonOperator": "EQ"
                    }

                },
                "Limit": 20,
                "ScanIndexForward":false
            }
            console.log("Querying DynamoDB");
     var response = ddb.query(params, dynamoCallback);
}