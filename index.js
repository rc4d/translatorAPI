const express = require('express');
const app = express();
const port=process.env.PORT||8000;
var unirest = require("unirest");
app.use(express.json());

app.get('/lang',(_req,_res)=>{
    var unirest = require("unirest");

var req = unirest("GET", "https://microsoft-translator-text.p.rapidapi.com/languages");
req.query({
	"api-version": "3.0"
});
req.headers({
	"x-rapidapi-key": "1b6de73372mshd17cc18a9ba0a57p111a69jsna9450f7ba090",
	"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
	"useQueryString": true
});
req.end(function (res) {
	if (res.error) throw new Error(res.error);
	console.log(res.body);
	_res.json(res.body);
});
})
app.post('/trans',(_req,_res)=>{	
var req = unirest("POST", "https://microsoft-translator-text.p.rapidapi.com/translate");
req.query({
	"to": _req.body.to,
	"api-version": "3.0",
	"profanityAction": "NoAction",
	"textType": "plain"
});
req.headers({
	"content-type": "application/json",
	"x-rapidapi-key": "1b6de73372mshd17cc18a9ba0a57p111a69jsna9450f7ba090",
	"x-rapidapi-host": "microsoft-translator-text.p.rapidapi.com",
	"useQueryString": true
});
req.type("json");
req.send([
	{
		"Text": _req.body.text
	}
]);
req.end(function (res) {
	if (res.error) throw new Error(res.error);

	console.log(res.body);
	_res.json(res.body[0].translations[0].text); 
});
	
})
app.listen(port,(err)=>{
    if(err){
        console.log(`Server is not running Error: ${err}`)
    }
    console.log(`Server is running on port: ${port}`);
})
