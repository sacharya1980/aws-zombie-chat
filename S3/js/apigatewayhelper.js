	function createCORSRequest(method, url) {
		  var xhr = new XMLHttpRequest();
		  if ("withCredentials" in xhr) {

		    // Check if the XMLHttpRequest object has a "withCredentials" property.
		    // "withCredentials" only exists on XMLHTTPRequest2 objects.
		    xhr.open(method, url, true);

		  } else if (typeof XDomainRequest != "undefined") {

		    // Otherwise, check if XDomainRequest.
		    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
		    xhr = new XDomainRequest();
		    xhr.open(method, url);

		  } else {

		    // Otherwise, CORS is not supported by the browser.
		    xhr = null;

		  }
		  return xhr;
	}
	
	function processChatResponse(responsetxt)
	{
		
		
		var html = "";
		var chats = JSON.parse(responsetxt);
		var i;
		for(i = 0; i < chats.messages.length; i++)
		{
			html += chats.messages[i].name + " (" + timeConverter(chats.messages[i].timestamp) + ") : " + chats.messages[i].message + "<br/>";
		}
		if(isChatting)
		{
			document.getElementById('chat-body').innerHTML = html;
			//we do it this way instead of setInterval, so we don't have overlapping requests.
			setTimeout(queryRequest, 1000);
		}
	}
		
	function queryRequest()
	{
		var xhr = createCORSRequest('GET', MESSAGES_ENDPOINT);
		if (!xhr) {
		  throw new Error('CORS not supported');
		}
		xhr.onload = function() {
				processChatResponse(xhr.responseText);
			};
			xhr.onerror = function() {
			  console.log('There was an error!');
			};
		xhr.send();
	}
	function postMessage(message)
	{
		var message = '{"channel":"default", "name":"' + document.getElementById('name-input').value +
						'", "message":"' +  message +
						'"}';
		var xhr = createCORSRequest('POST', MESSAGES_ENDPOINT);
		if (!xhr) {
		  throw new Error('CORS not supported');
		}
		xhr.onload = function() {
				postComplete();
			};
			xhr.onerror = function() {
			  console.log('There was an error!');
			};
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(message);
	}