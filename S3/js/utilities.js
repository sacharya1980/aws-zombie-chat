function timeConverter(UNIX_timestamp)
{
	//check to make sure it's a UNIX timetamp and not already down to the MS level:
	//this let's us handle the difference between timestamp of:
  	// "timestamp": 1442409897742 versus: timestamp": 1442276339
	if(UNIX_timestamp < 9999999999)
	   {
		  UNIX_timestamp = UNIX_timestamp * 1000
	   }
	var a = new Date(UNIX_timestamp);
	var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	var year = a.getFullYear();
	var month = months[a.getMonth()];
	var date = a.getDate();
	var hour = a.getHours();
	var min = a.getMinutes();
	var sec = a.getSeconds();
	var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
	return time;
}