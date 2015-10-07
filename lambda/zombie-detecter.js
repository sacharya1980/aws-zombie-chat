console.log('Loading function');
var aws = require('aws-sdk');
var ddb = new aws.DynamoDB(
    {region: "us-west-2",
     params: {TableName: "messages"}});

var theContext;

function dynamoCallback(err, response) {
  if (err) console.log('error' + err, err.stack); // an error occurred
  else
  {
      theContext.succeed(response);
  }
}

exports.handler = function(event, context)
{
    theContext = context;
    
    if(event.channel == null)
    {
        event.channel = 'default';
    }
    if(event.timestamp == null)
    {
        event.timestamp = "" + new Date().getTime();
    }
  var params = 
      {
            "Item": 
            {
                "channel":{"S":event.channel},
                "message":{"S":"zombie detected!!"},
                "timestamp":{"N":event.timestamp},
                "name":{"S":"zombie-detector"}
            }
        }
    console.log("Putting item DynamoDB " + params);
     ddb.putItem(params, dynamoCallback);
}
