//console.log(23232323);
var fs = require('fs');
const chalk = require('chalk');
var zsm = [];

fs.readFile("staedte.json",	function(err,data)	{	
    var inhalt=JSON.parse(data);
    fs.readFile("mehr_staedte.json", function(err,data2)	{	
        var inhalt2=JSON.parse(data2);
        zsm = inhalt.cities.concat(inhalt2.cities);

   
    for(var i=0;i<zsm.length;i++){
        console.log();
        console.log("Name:"+chalk.blue(zsm[i].name+","));
        console.log("Land:"+chalk.green(zsm[i].country+","));
        console.log("Population:"+chalk.red(zsm[i].population.toLocaleString("de-DE")));
}

    });
});