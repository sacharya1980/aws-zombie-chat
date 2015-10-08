console.log('Loading function');
var aws = require('aws-sdk');
var ddb = new aws.DynamoDB(
    {region: "us-west-2",
     params: {TableName: "talkers"}});

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

    if(event.message == null ||
       event.name == null)
    {
        context.fail("message and name cannot be null");
        return;
    }

    if(event.user == null)
    {
        event.user = 'default';
    }
    if(event.timestamp == null)
    {
        event.timestamp = "" + new Date().getTime();
    }
  var params =
      {
            "Item":
            {
                "name":{"S":event.user},
                "is_typing":{"BOOL": true}
            }
        }
    console.log("Putting item DynamoDB " + params);
     ddb.putItem(params, dynamoCallback);
}
