var express = require('express');
var app = express();

app.use(express.static('public'));


app.listen(7778,()=>{
	console.log('To Open Url: http://localhost:7778');
});
