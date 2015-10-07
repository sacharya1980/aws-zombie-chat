var isChatting = false;
var startingChatMessage;
function processScreenName(item, event)
{
	if(isChatting)
	{
		document.getElementById('name-input').disabled = false;
		document.getElementById('chat-message-input').disabled = true;
		document.getElementById('chat-message-input').placeholder="Enter Screenname above to start chatting";
		document.getElementById('chat-toggle').value = "Start Chatting";
		document.getElementById('chat-body').innerHTML = startingChatMessage;
	}
	else
	{
		document.getElementById('name-input').disabled = true;
		document.getElementById('chat-message-input').disabled = false;
		document.getElementById('chat-message-input').placeholder="ZOOOOOMMMBIE Message";
		document.getElementById('chat-toggle').value = "Stop Chatting";
		startingChatMessage = document.getElementById('chat-body').innerHTML;
		document.getElementById('chat-body').innerHTML = '<h1>Loading Chats...</h1>';
		
	    queryRequest();
	}
	isChatting = !isChatting;
}

function zombieChatKeyPressed(event)
{
    // look for window.event in case event isn't passed in
    event = event || window.event;
    
    //13 is the enter key
    if (event.keyCode == 13)
    {
    	var message = document.getElementById('chat-message-input').value;
    	document.getElementById('chat-message-input').disabled = true;
    	document.getElementById('chat-message-input').value = '...Posting Message...';
    	//let's post the message...
    	postMessage(message);
    }
    return true;
}

function postComplete()
{
	document.getElementById('chat-message-input').value = null;
    document.getElementById('chat-message-input').disabled = false;
}