var express = require('express');
var app = express();
var fs = require("fs");
var request = require('request');
var id = "", name = "", actualMenu, menu2;

var menu = {
    events: [

    ]
};

app.get('/events', function (req, res) {
    
    var i = Math.floor(Math.random()*100+Math.random()*100);

    fs.readFile("C:/WBA2(aktuell)/events.json", 'utf8', function(err, data){
        menu2 = JSON.parse(data);
        console.log(menu2.actualMenu.events[i].eventName);
        res.end(menu2.actualMenu.events[i].eventName);
    });
});

app.post('/events', function (req, res) {
    for (var i = 0; i < 1; i++) {
        request.get({
            url: "https://app.ticketmaster.com/discovery/v2/events?apikey=fydAVivjoqgcXZZvpRpiZNAc7bML0AfH&countryCode=DE&locale=de-de&size=200&city=Köln"
        }, function (error, response, body) {
            //if (!error & response.statusCode == 200) {
                actualMenu = menu;
                menu2 = JSON.parse(body);
                
                var i=0;
                for(i; i<200; i++){               
                var content = { 
                    eventName: menu2._embedded.events[i].name, 
                    eventDate: menu2._embedded.events[i].dates.start.localDate,
                    venueCity: menu2._embedded.events[i]._embedded.venues[0].city.name
                };
                var j = 1 ; 
                actualMenu.events.push(content);
                fs.writeFile("events.json", JSON.stringify({ actualMenu }), function (err) {
                console.log("Datensatz " + j +" wurde gespeichert!");
                j++;
                });
            }   
                
            //}
        });
    }
    res.send("post success");
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("REST listening at http://%s:%s", host, port)
})
